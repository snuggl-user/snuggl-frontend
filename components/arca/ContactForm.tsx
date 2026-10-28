"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { contactLimits, contactRoles } from "@/lib/arca-contact";

type Status = "idle" | "loading" | "success" | "error";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  shelter: "",
  city: "",
  role: "",
  message: "",
  // Campo esca per i bot: nascosto alle persone, se arriva pieno è spam.
  website: "",
};

const fieldClass =
  "bg-white border-0 rounded-full h-12 px-5 text-base md:text-base shadow-sm";

export function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const isSubmitting = status === "loading";

  const update =
    (field: keyof typeof emptyForm) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/arca-contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setStatus("error");
        // Gli errori di validazione (400) parlano a chi compila, gli altri no.
        setMessage(
          res.status === 400 && data?.error
            ? data.error
            : "Ops, qualcosa è andato storto. Riprova tra poco."
        );
        return;
      }

      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
      setMessage("Errore di rete. Controlla la connessione e riprova.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-6">
        <Image
          src="/arca/doggo-excited.png"
          alt=""
          width={720}
          height={720}
          className="w-40 h-40 object-contain"
        />
        <h3 className="text-3xl">Richiesta inviata!</h3>
        <p className="text-lg text-green max-w-md">
          Grazie per averci scritto. Ti ricontattiamo noi all{"'"}indirizzo che
          ci hai lasciato per conoscere il tuo rifugio 🐾
        </p>
      </div>
    );
  }

  // L'introduzione sta qui e non nella pagina, così dopo l'invio resta
  // visibile solo il messaggio di conferma.
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <Image
        src="/arca/doggo-curious.png"
        alt=""
        width={720}
        height={720}
        className="w-28 h-28 object-contain"
      />

      <h2 className="text-4xl font-bold">Porta Arca nel tuo rifugio</h2>

      <p className="text-lg text-green max-w-2xl">
        Raccontaci chi siete e come vi organizzate: ti ricontattiamo noi per
        conoscerci e mostrarti Arca. Se fai volontariato e vorresti proporla al
        tuo rifugio, scrivici anche tu.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 w-full max-w-3xl mt-4 text-left"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="arca-name">Nome e cognome *</Label>
          <Input
            id="arca-name"
            value={form.name}
            onChange={update("name")}
            autoComplete="name"
            maxLength={contactLimits.name}
            className={fieldClass}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="arca-email">Email *</Label>
          <Input
            id="arca-email"
            type="email"
            value={form.email}
            onChange={update("email")}
            autoComplete="email"
            maxLength={contactLimits.email}
            className={fieldClass}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="arca-shelter">
            Nome del rifugio o associazione *
          </Label>
          <Input
            id="arca-shelter"
            value={form.shelter}
            onChange={update("shelter")}
            autoComplete="organization"
            maxLength={contactLimits.shelter}
            className={fieldClass}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="arca-city">Città *</Label>
          <Input
            id="arca-city"
            value={form.city}
            onChange={update("city")}
            autoComplete="address-level2"
            maxLength={contactLimits.city}
            className={fieldClass}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="arca-role">Chi sei *</Label>
          <div className="relative">
            <select
              id="arca-role"
              value={form.role}
              onChange={update("role")}
              className={`${fieldClass} w-full appearance-none pr-12 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 ${
                form.role ? "text-foreground" : "text-muted-foreground"
              }`}
              required
              disabled={isSubmitting}
            >
              <option value="" disabled>
                Scegli un{"'"}opzione
              </option>
              {contactRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="arca-phone">Telefono</Label>
          <Input
            id="arca-phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            autoComplete="tel"
            maxLength={contactLimits.phone}
            className={fieldClass}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="arca-message">Raccontaci del tuo rifugio</Label>
          <Textarea
            id="arca-message"
            value={form.message}
            onChange={update("message")}
            maxLength={contactLimits.message}
            placeholder="Quanti animali ospitate, quanti volontari siete, come vi organizzate oggi…"
            className="bg-white border-0 rounded-3xl min-h-32 px-5 py-4 text-base md:text-base shadow-sm"
            disabled={isSubmitting}
          />
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="arca-website">Sito web</label>
          <input
            id="arca-website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update("website")}
          />
        </div>

        <div className="sm:col-span-2 flex flex-col items-center gap-4 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-bold shadow-xl w-full sm:w-auto"
          >
            {isSubmitting ? "Invio..." : "Invia la richiesta"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Campi obbligatori. Useremo questi dati solo per risponderti.
          </p>

          {status === "error" && (
            <p className="text-sm text-red-600 text-center">{message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
