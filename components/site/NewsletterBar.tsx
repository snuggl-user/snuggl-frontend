"use client";

import { useEffect, useState } from "react";
import { Mail, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNewsletterSignup } from "./useNewsletterSignup";

const DISMISSED_KEY = "snuggl-newsletter-bar-dismissed";

function remember() {
  try {
    sessionStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    // Storage non disponibile (es. navigazione privata): pazienza.
  }
}

/**
 * Fascetta in basso per iscriversi alla newsletter. Compare dopo l'inizio
 * della pagina e sparisce quando arriva la sezione #newsletter, che fa la
 * stessa cosa. Chi la chiude, o si iscrive, non la rivede per la visita.
 */
export function NewsletterBar() {
  const { email, setEmail, status, message, isSubmitting, handleSubmit } =
    useNewsletterSignup();
  const [inRange, setInRange] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISSED_KEY) === "1");
    } catch {
      // Senza storage la fascetta si vede a ogni caricamento.
    }
  }, []);

  useEffect(() => {
    const update = () => {
      const section = document.getElementById("newsletter");
      // Nascosta anche dopo la sezione, non solo mentre è sullo schermo.
      const reached = section
        ? section.getBoundingClientRect().top < window.innerHeight
        : false;
      setInRange(window.scrollY > window.innerHeight * 0.6 && !reached);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (status === "success") remember();
  }, [status]);

  const dismiss = () => {
    setDismissed(true);
    remember();
  };

  const visible = inRange && !dismissed;

  return (
    <aside
      aria-label="Iscrizione alla newsletter"
      inert={!visible}
      className={cn(
        "fixed inset-x-3 bottom-3 z-30 mx-auto max-w-3xl transition-[translate,opacity] duration-500 sm:inset-x-4 sm:bottom-4",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[150%] opacity-0"
      )}
    >
      <div className="flex items-center gap-3 rounded-full bg-deep-teal p-2 text-white shadow-[0_24px_48px_-16px_rgba(31,95,92,0.6)]">
        <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-mint-green sm:flex">
          <Mail className="h-5 w-5" />
        </span>

        {status === "success" ? (
          <p className="flex-1 pl-3 text-sm font-bold sm:pl-0">{message}</p>
        ) : (
          <>
            <p className="min-w-0 flex-1 pl-3 leading-tight sm:flex-none sm:pl-0">
              <span className="block font-heading font-semibold">
                Resta aggiornato
              </span>
              <span className="block truncate text-sm text-white/70">
                {status === "error" ? message : "Storie e novità da Snuggl"}
              </span>
            </p>

            {/* Su mobile scrivere nella fascetta è scomodo: porta alla sezione */}
            <a
              href="#newsletter"
              className="inline-flex h-11 shrink-0 items-center rounded-full bg-primary px-5 font-bold text-deep-teal sm:hidden"
            >
              Iscriviti
            </a>

            <form
              onSubmit={handleSubmit}
              className="hidden min-w-0 flex-1 items-center gap-1 rounded-full bg-white p-1 sm:flex"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email"
                aria-label="La tua email"
                className="h-9 flex-1 rounded-full border-0 bg-transparent px-4 text-sm text-black shadow-none md:text-sm focus-visible:ring-0"
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-9 rounded-full bg-primary px-5 font-bold text-deep-teal hover:bg-primary/90"
              >
                {isSubmitting ? "Invio..." : "Iscriviti"}
              </Button>
            </form>
          </>
        )}

        <button
          type="button"
          onClick={dismiss}
          aria-label="Chiudi"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
