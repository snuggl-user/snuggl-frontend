import { ReactNode } from "react";
import Link from "next/link";
import { Content, asText } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ArrowRight, BookOpen, HeartHandshake, LucideIcon } from "lucide-react";
import { AppPreview } from "@/components/arca";
import { getArticleHeader } from "@/components/blog";
import { cn } from "@/lib/utils";

/**
 * Dati passati dalla pagina tramite `<SliceZone context>`.
 */
export type HeroContext = {
  /** Pillola mostrata sopra il titolo (es. l'annuncio di Arca). */
  badge?: ReactNode;
  /** Ultimi articoli del blog: il più recente fa da foto alla card del blog. */
  articles?: Content.ArticleDocument[];
};

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice, HeroContext>;

/**
 * Component for "Hero" Slices: titolo centrato e sotto i due pilastri di
 * Snuggl, la divulgazione (il blog) e Arca. Le due card fanno da call to
 * action, per questo i pulsanti dello slice non vengono mostrati.
 */
export default function Hero({ slice, context }: HeroProps) {
  const title2 = slice.primary.title_2;
  const lastSpace = title2?.lastIndexOf(" ") ?? -1;
  // Senza articoli con copertina si usa l'immagine dello slice.
  const latest = (context?.articles ?? [])
    .map((article) => getArticleHeader(article))
    .find((header) => header?.hero_image.url);
  const photo = latest?.hero_image ?? slice.primary.hero_image;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // Sale sotto l'header sospeso (alto 4.75rem), così lo sfondo parte dal
      // bordo della pagina invece di interrompersi sotto la pillola.
      className="relative isolate -mt-[4.75rem] px-4 pt-[calc(4.75rem+3rem)] pb-12 sm:pt-[calc(4.75rem+4rem)] lg:pt-[calc(4.75rem+5rem)] lg:pb-20"
    >
      {/* Luce menta dall'alto che sfuma nel bianco della pagina */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[42rem] -z-10 bg-[radial-gradient(70%_70%_at_50%_0%,var(--color-mint-green)_0%,var(--color-azure)_45%,transparent_100%)]"
      />

      <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-7">
        {context?.badge && (
          <div className="motion-safe:animate-blur-in">{context.badge}</div>
        )}

        <h1
          className="text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.95] tracking-tight motion-safe:animate-blur-in"
          style={{ animationDelay: "80ms" }}
        >
          {slice.primary.title_1 && (
            <span className="block">{slice.primary.title_1}</span>
          )}
          {title2 && (
            <span className="block text-deep-teal">
              {title2.slice(0, lastSpace + 1)}
              {/* Sottolineata solo l'ultima parola, così resta giusta
                  anche quando il titolo va a capo su mobile */}
              <span className="relative inline-block pb-3">
                {title2.slice(lastSpace + 1)}
                <Squiggle className="absolute left-0 bottom-0 w-full h-4 text-primary" />
              </span>
            </span>
          )}
        </h1>

        {slice.primary.paragraph && (
          <p
            className="text-lg md:text-xl text-green max-w-2xl motion-safe:animate-blur-in"
            style={{ animationDelay: "160ms" }}
          >
            {slice.primary.paragraph}
          </p>
        )}
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2 lg:mt-16 lg:gap-6">
        {/* Divulgazione */}
        <Link
          href="/blog"
          className="group flex min-h-[25rem] flex-col overflow-hidden rounded-[2.5rem] bg-lavender motion-safe:animate-blur-in lg:min-h-[32rem]"
          style={{ animationDelay: "260ms" }}
        >
          <PillarText
            icon={BookOpen}
            label="Divulgazione"
            title="Storie e consigli contro l'abbandono"
            cta="Leggi il blog"
          />
          {/* L'ultimo articolo spunta dal fondo come l'app nella card di
              Arca, inclinato dall'altra parte */}
          <div aria-hidden className="relative min-h-52 flex-1">
            <div className="absolute inset-x-0 top-2 flex justify-center px-6 transition-transform duration-500 group-hover:-translate-y-3 sm:px-10">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 rotate-3 rounded-[32px] bg-white/60" />
                {/* Stessa struttura dell'anteprima di Arca: intestazione
                    con titolo e pillola, contenuto sotto */}
                <div className="relative -rotate-2 rounded-[32px] bg-white p-5 text-left text-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-[rotate] duration-500 group-hover:rotate-0 sm:p-6">
                  {latest && (
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-green">
                          Ultimo articolo
                        </p>
                        <p className="font-heading text-xl font-semibold leading-tight line-clamp-2">
                          {asText(latest.title)}
                        </p>
                      </div>
                      {latest.category && (
                        <span className="shrink-0 rounded-full bg-lavender px-3 py-1 text-sm font-bold text-deep-teal">
                          {latest.category}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-azure">
                    <PrismicNextImage
                      field={photo}
                      alt=""
                      sizes="28rem"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Arca */}
        <Link
          href="/arca"
          className="group flex min-h-[25rem] flex-col overflow-hidden rounded-[2.5rem] bg-deep-teal text-white motion-safe:animate-blur-in lg:min-h-[32rem]"
          style={{ animationDelay: "340ms" }}
        >
          <PillarText
            icon={HeartHandshake}
            label="Arca · per i rifugi"
            title="Il gestionale gratuito per rifugi e canili"
            cta="Scopri Arca"
            dark
          />
          {/* L'app spunta dal fondo della card e sale al passaggio del mouse */}
          <div aria-hidden className="relative min-h-52 flex-1">
            <div className="absolute inset-x-0 top-2 flex justify-center px-6 transition-transform duration-500 group-hover:-translate-y-3 sm:px-10">
              <AppPreview className="rotate-2 transition-[rotate] duration-500 group-hover:rotate-0" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function PillarText({
  icon: Icon,
  label,
  title,
  cta,
  dark = false,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-4 p-7 sm:p-9 lg:p-10">
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
          dark ? "bg-white/10 text-mint-green" : "bg-white/70 text-deep-teal"
        )}
      >
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <h2 className="max-w-sm text-3xl font-semibold leading-[1.1] tracking-tight">
        {title}
      </h2>
      <span
        className={cn(
          "inline-flex items-center gap-2 font-bold",
          dark ? "text-primary" : "text-deep-teal"
        )}
      >
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  );
}

function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      fill="none"
      className={className}
    >
      <path
        d="M3 10C40 3 75 14 112 8s72-6 110 1 50 2 75-3"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
