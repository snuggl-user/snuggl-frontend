import Link from "next/link";
import { ArrowRight, Gift, ListChecks, PawPrint, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppPreview } from "./AppPreview";

const highlights = [
  { icon: ListChecks, text: "Le task del giorno, sempre aggiornate" },
  { icon: PawPrint, text: "La scheda e la storia di ogni animale" },
  { icon: Users, text: "Volontari e gestori, ognuno col suo ruolo" },
  { icon: Gift, text: "Gratis, per sempre" },
];

/**
 * Sezione della homepage che presenta Arca e rimanda a /arca.
 */
export function ArcaPromo() {
  return (
    <section className="px-6 py-12 lg:px-40 lg:py-24" id="arca">
      <div className="container max-w-6xl mx-auto bg-deep-teal text-white rounded-4xl p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden">
        <div className="flex flex-col gap-6">
          <p className="w-fit text-sm uppercase bg-white/10 text-mint-green rounded-full px-4 py-1.5">
            Novità · Per rifugi e canili
          </p>

          <h2 className="text-4xl md:text-5xl leading-tight">
            Ti presentiamo <span className="text-primary">Arca</span>
          </h2>

          <p className="text-lg text-mint-green max-w-lg">
            Il gestionale gratuito che abbiamo costruito insieme ai rifugi:
            animali, volontari e attività di ogni giorno in un unico posto, dal
            computer o dal telefono.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span className="w-9 h-9 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </span>
                <span className="text-sm">{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="font-bold bg-white text-deep-teal hover:bg-white/90 rounded-full"
            >
              <Link href="/arca">
                Scopri Arca
                <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="font-bold border border-white/40 text-white hover:bg-white/10 hover:text-white rounded-full"
            >
              <Link href="/arca#contatti">Porta Arca nel tuo rifugio</Link>
            </Button>
          </div>
        </div>

        <div className="hidden sm:flex justify-center pb-6">
          <AppPreview className="rotate-2" />
        </div>
      </div>
    </section>
  );
}
