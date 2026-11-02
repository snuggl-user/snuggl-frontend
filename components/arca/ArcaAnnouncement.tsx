import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/**
 * Pillola sopra il titolo dell'hero in homepage che annuncia Arca.
 */
export function ArcaAnnouncement() {
  return (
    <Link
      href="/arca"
      className="group relative inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-black/5 py-1.5 pl-1.5 pr-4 text-sm shadow-sm hover:bg-white transition-colors"
    >
      {/* Mascotte in piedi sulla pillola: le zampe cadono al 68% dell'immagine */}
      <Image
        src="/arca/doggo-excited.png"
        alt=""
        width={720}
        height={720}
        className="pointer-events-none absolute right-6 -top-10 h-16 w-16 object-contain transition-transform motion-safe:group-hover:-translate-y-1"
      />
      <span className="bg-deep-teal text-white text-xs font-bold uppercase rounded-full px-2.5 py-1">
        Novità
      </span>
      <span>Arca, il gestionale gratuito per rifugi</span>
      <ArrowRight className="w-4 h-4 shrink-0 text-deep-teal transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
