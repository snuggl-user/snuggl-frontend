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

    const listId = Number(process.env.ARCA_LIST_ID);

    if (!listId) {
      console.error("ARCA_LIST_ID non è configurata");
      return NextResponse.json({ error: "Errore interno" }, { status: 500 });
    }

    // Salva la richiesta come contatto nella lista Arca. Se l'email esiste
    // già (es. iscritto alla newsletter) aggiorna gli attributi e aggiunge
    // la lista senza toccare le altre.
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        attributes: {
          NOME: data.name,
          TELEFONO: data.phone,
          RIFUGIO: data.shelter,
          CITTA: data.city,
          RUOLO: data.role,
          MESSAGGIO: data.message,
        },
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    // 201 = contatto creato, 204 = contatto esistente aggiornato
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
