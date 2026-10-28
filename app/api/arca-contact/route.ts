import { NextResponse } from "next/server";
import { contactLimits, contactRoles } from "@/lib/arca-contact";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  shelter?: string;
  city?: string;
  role?: string;
  message?: string;
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

// Per i campi a riga singola: niente a capo, che finirebbero nell'oggetto.
const oneLine = (value: unknown, max: number) =>
  clean(value, max).replace(/\s+/g, " ");

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // Campo esca compilato: è un bot. Rispondiamo ok senza inviare nulla.
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const data = {
      name: oneLine(body.name, contactLimits.name),
      email: clean(body.email, contactLimits.email).toLowerCase(),
      phone: oneLine(body.phone, contactLimits.phone),
      shelter: oneLine(body.shelter, contactLimits.shelter),
      city: oneLine(body.city, contactLimits.city),
      role: oneLine(body.role, 100),
      message: clean(body.message, contactLimits.message),
    };

    if (!data.name || !data.shelter || !data.city) {
      return NextResponse.json(
        { error: "Compila tutti i campi obbligatori." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(data.email)) {
      return NextResponse.json(
        { error: "L'indirizzo email non sembra valido." },
        { status: 400 }
      );
    }

    if (!(contactRoles as readonly string[]).includes(data.role)) {
      return NextResponse.json(
        { error: "Dicci chi sei scegliendo un'opzione." },
        { status: 400 }
      );
    }

    const to = process.env.ARCA_CONTACT_EMAIL;
    const sender = process.env.BREVO_SENDER_EMAIL || to;

    if (!to || !sender) {
      console.error("ARCA_CONTACT_EMAIL non è configurata");
      return NextResponse.json({ error: "Errore interno" }, { status: 500 });
    }

    const rows: [string, string][] = [
      ["Nome", data.name],
      ["Email", data.email],
      ["Telefono", data.phone || "—"],
      ["Rifugio", data.shelter],
      ["Città", data.city],
      ["Chi è", data.role],
      ["Messaggio", data.message || "—"],
    ];

    const htmlContent = `
      <h2>Nuova richiesta per Arca</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="vertical-align:top"><strong>${label}</strong></td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
          )
          .join("")}
      </table>
    `;

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: sender, name: "Snuggl Arca" },
        to: [{ email: to }],
        replyTo: { email: data.email, name: data.name },
        subject: `Arca · richiesta da ${data.shelter} (${data.city})`,
        htmlContent,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Errore Brevo", res.status, text);
      return NextResponse.json({ error: "Errore Brevo" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
