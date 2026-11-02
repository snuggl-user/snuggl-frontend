"use client";

import { FormEvent, useState } from "react";

export type NewsletterStatus = "idle" | "loading" | "success" | "error";

/**
 * Iscrizione alla newsletter tramite /api/newsletter. La usano sia la sezione
 * della homepage sia la fascetta in basso.
 */
export function useNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          consent: true, // se aggiungi checkbox, metti qui il valore reale
        }),
      });

      if (!res.ok) {
        setStatus("error");
        setMessage("Ops, qualcosa è andato storto. Riprova tra poco.");
        return;
      }

      setStatus("success");
      setMessage(
        "Controlla la tua email: ti abbiamo inviato un link di conferma 🐾"
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Errore di rete. Controlla la connessione e riprova.");
    }
  };

  return {
    email,
    setEmail,
    status,
    message,
    isSubmitting: status === "loading",
    handleSubmit,
  };
}
