import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Striscia in cima alla homepage che annuncia Arca.
 */
export function ArcaAnnouncement() {
  return (
    <Link
      href="/arca"
      className="group block bg-deep-teal text-white text-sm px-6 py-3 text-center hover:bg-deep-teal/95 transition-colors"
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="bg-primary text-black text-xs font-bold uppercase rounded-full px-2.5 py-0.5">
          Novità
        </span>
        <span>Arca, il gestionale gratuito per rifugi e canili.</span>
        <span className="inline-flex items-center gap-1 font-bold text-primary group-hover:underline underline-offset-4">
          Scopri di più
          <ArrowRight className="w-4 h-4" />
        </span>
      </span>
    </Link>
  );
}
