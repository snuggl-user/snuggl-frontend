import { CSSProperties, FC, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Content, ImageField, asText } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ArrowRight, Check } from "lucide-react";
import { getArticleHeader } from "@/components/blog";
import { cn } from "@/lib/utils";

/**
 * Dati passati dalla pagina tramite `<SliceZone context>`.
 */
export type SolutionStepsContext = {
  /** Ultimi articoli del blog, mostrati nei widget accanto alle foto. */
  articles?: Content.ArticleDocument[];
};

export type SolutionStepsProps = SliceComponentProps<
  Content.SolutionStepsSlice,
  SolutionStepsContext
>;

// Un colore del design system per ogni passo, a rotazione. L'ultimo è
// deep-teal come la sezione di Arca, di cui parla.
const tones = [
  {
    card: "bg-azure",
    number: "text-deep-teal/25",
    body: "text-black/70",
    surface: "bg-white/60",
    cta: "text-deep-teal",
  },
  {
    card: "bg-lavender",
    number: "text-secondary",
    body: "text-black/70",
    surface: "bg-white/60",
    cta: "text-deep-teal",
  },
  {
    card: "bg-deep-teal text-white",
    number: "text-primary",
    body: "text-white/80",
    surface: "bg-white/10",
    cta: "text-primary",
  },
];

// Dove porta ogni passo, nello stesso ordine dei contenuti accanto (lo slice
// su Prismic non ha un campo link).
const stepLinks = [
  { label: "Leggi i consigli", href: "/blog" },
  { label: "Leggi le storie", href: "/blog" },
  { label: "Scopri Arca", href: "/arca" },
];

const SolutionSteps: FC<SolutionStepsProps> = ({ slice, context }) => {
  const articles = context?.articles ?? [];
  const count = slice.items.length;
  // Nomi delle timeline dei marcatori, dal secondo passo in poi.
  const stackScope =
    slice.items
      .slice(1)
      .map((_, index) => `--step-${index + 1}`)
      .join(", ") || "none";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 py-16 lg:py-28"
      id="solution"
    >
      <div className="max-w-6xl mx-auto">
        <div className="reveal mx-auto max-w-2xl flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight">
            {slice.primary.title}
          </h2>
          {slice.primary.subtitle && (
            <p className="text-lg md:text-xl text-green">
              {slice.primary.subtitle}
            </p>
          )}
        </div>

        {/* Le card restano attaccate in alto e si impilano mentre si scorre */}
        <div
          className="stack mt-12 lg:mt-16"
          style={{ "--stack-scope": stackScope } as CSSProperties}
        >
          {slice.items.map((item, index) => {
            const tone = tones[index % tones.length];
            // Ogni card si rimpicciolisce quando arriva la successiva. L'ultima
            // usa il proprio marcatore e si rimpicciolisce mentre arriva: a
            // mazzo chiuso le card hanno tutte la stessa misura.
            const shrinkWith = index === count - 1 ? index : index + 1;

            return (
              <Fragment key={index}>
                {index > 0 && (
                  <div
                    aria-hidden
                    className="stack-marker h-px"
                    style={
                      { "--stack-marker": `--step-${index}` } as CSSProperties
                    }
                  />
                )}
                <article
                  className={cn("sticky", index > 0 && "mt-6 lg:mt-10")}
                  style={{ top: `calc(6rem + ${index} * 1.5rem)` }}
                >
                  <div
                    className={cn(
                      "grid lg:grid-cols-2 gap-8 lg:gap-12 rounded-[2.5rem] p-3 pb-8 sm:p-5 sm:pb-10 lg:p-6 lg:pl-14 shadow-[0_-24px_48px_-32px_rgba(31,95,92,0.45)]",
                      // Con un solo passo non c'è nessun marcatore.
                      shrinkWith > 0 && "stack-shrink",
                      tone.card
                    )}
                    style={
                      {
                        "--stack-next": `--step-${shrinkWith}`,
                      } as CSSProperties
                    }
                  >
                    {/* Su desktop il testo occupa tutta l'altezza della card:
                        numero in alto, testo e link in basso */}
                    <div className="order-2 lg:order-1 flex flex-col gap-4 lg:justify-between lg:gap-8 px-3 pt-4 sm:px-5 lg:px-0 lg:py-4">
                      <span
                        className={cn(
                          "font-heading font-semibold text-5xl lg:text-6xl leading-none",
                          tone.number
                        )}
                      >
                        {String(item.step_number ?? index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col items-start gap-4">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.1] tracking-tight text-balance">
                          {item.step_title}
                        </h3>
                        <div className={cn("text-lg max-w-md", tone.body)}>
                          <PrismicRichText field={item.step_description} />
                        </div>
                        {stepLinks[index] && (
                          <Link
                            href={stepLinks[index].href}
                            className={cn(
                              "group/cta mt-2 inline-flex items-center gap-2 font-bold",
                              tone.cta
                            )}
                          >
                            {stepLinks[index].label}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="group order-1 lg:order-2 relative aspect-square sm:aspect-[4/3]">
                      <StepVisual
                        index={index}
                        image={item.image}
                        articles={articles}
                        surface={tone.surface}
                      />
                    </div>
                  </div>
                </article>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/**
 * Al posto delle foto stock, contenuti veri di Snuggl. Segue l'ordine dei
 * passi su Prismic: i consigli del blog, le storie di Good News in Bad
 * Times, la giornata di un rifugio su Arca. Se mancano gli articoli resta
 * l'immagine dello slice.
 */
function StepVisual({
  index,
  image,
  articles,
  surface,
}: {
  index: number;
  image: ImageField;
  articles: Content.ArticleDocument[];
  surface: string;
}) {
  // Articoli della categoria con copertina. Alcuni condividono la stessa
  // foto: si tiene solo il primo, per non mostrarla due volte.
  const inCategory = (category: string) => {
    const seen = new Set<string>();
    return articles.filter((article) => {
      const header = getArticleHeader(article);
      const url = header?.hero_image.url;
      if (header?.category !== category || !url || seen.has(url)) return false;
      seen.add(url);
      return true;
    });
  };

  if (index === 0) {
    const tips = inCategory("Consigli").slice(0, 3);
    if (tips.length) return <ArticleFan articles={tips} surface={surface} />;
  }
  if (index === 1) {
    const stories = inCategory("Storie");
    // Prima le storie di Good News in Bad Times, di cui parla il passo.
    const goodNews = stories.filter((article) =>
      /^good news/i.test(titleOf(article))
    );
    const picked = (goodNews.length >= 3 ? goodNews : stories).slice(0, 3);
    if (picked.length) return <StoryMosaic articles={picked} />;
  }
  if (index === 2) return <ArcaDay surface={surface} />;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-white/40">
      <PrismicNextImage
        field={image}
        alt=""
        sizes="(min-width: 1024px) 34rem, 90vw"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

function titleOf(article: Content.ArticleDocument) {
  return asText(getArticleHeader(article)?.title) ?? "";
}

function articleHref(article: Content.ArticleDocument) {
  return article.url || `/blog/${article.uid}`;
}

// Le card dietro si aprono a ventaglio al passaggio del mouse.
const fanPositions = [
  "-rotate-6 -translate-x-[16%] group-hover:-rotate-10 group-hover:-translate-x-[26%]",
  "rotate-6 translate-x-[16%] group-hover:rotate-10 group-hover:translate-x-[26%]",
];

/** Gli ultimi consigli del blog, uno sopra l'altro come un mazzo di card. */
function ArticleFan({
  articles,
  surface,
}: {
  articles: Content.ArticleDocument[];
  surface: string;
}) {
  const [front, ...back] = articles;

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-[2rem]",
        surface
      )}
    >
      <div className="relative w-[62%]">
        {back.map((article, index) => (
          <div
            key={article.id}
            aria-hidden
            className={cn(
              "absolute inset-0 transition-[rotate,translate] duration-500",
              fanPositions[index]
            )}
          >
            <MiniArticle article={article} />
          </div>
        ))}
        <Link
          href={articleHref(front)}
          className="relative block -rotate-1 transition-[rotate] duration-500 group-hover:rotate-0"
        >
          <MiniArticle article={front} />
        </Link>
      </div>
    </div>
  );
}

function MiniArticle({ article }: { article: Content.ArticleDocument }) {
  const header = getArticleHeader(article);

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden rounded-[1.5rem] bg-white p-3 text-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-2xl bg-azure">
        <PrismicNextImage
          field={header?.hero_image}
          alt=""
          sizes="20rem"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 px-1 pb-1">
        <p className="text-[11px] font-bold uppercase tracking-wide text-green">
          {header?.category}
        </p>
        <p className="font-heading text-lg font-semibold leading-tight line-clamp-2">
          {titleOf(article)}
        </p>
      </div>
    </div>
  );
}

/** Le persone e i rifugi raccontati nelle storie, in un mosaico di foto. */
function StoryMosaic({ articles }: { articles: Content.ArticleDocument[] }) {
  return (
    <div className="absolute inset-0 grid grid-cols-[1.3fr_1fr] grid-rows-2 gap-3">
      {articles.map((article, index) => {
        // "Good news in bad times: La storia di Totò" → "La storia di Totò"
        const name = titleOf(article).split(":").pop()?.trim();

        return (
          <Link
            key={article.id}
            href={articleHref(article)}
            className={cn(
              "group/tile relative overflow-hidden rounded-[1.5rem] bg-white/40",
              (index === 0 || articles.length < 3) && "row-span-2",
              articles.length === 1 && "col-span-2"
            )}
          >
            <PrismicNextImage
              field={getArticleHeader(article)?.hero_image}
              alt=""
              sizes={index === 0 ? "20rem" : "14rem"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/tile:scale-105"
            />
            <span className="absolute inset-x-3 bottom-3 flex">
              <span className="truncate rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black shadow-lg sm:text-sm">
                {name}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

// Le stesse task dell'anteprima nella pagina di Arca.
const arcaTasks = [
  { title: "Pulizia box 3", done: true },
  { title: "Colazione settore A", done: true },
  { title: "Passeggiata con Luna", done: false },
  { title: "Terapia di Briciola", done: false },
];

/** La giornata di un rifugio su Arca, con la mascotte che spunta. */
function ArcaDay({ surface }: { surface: string }) {
  return (
    <Link
      href="/arca"
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-[2rem] p-6",
        surface
      )}
    >
      <div className="relative w-full max-w-[20rem] rotate-2 rounded-[2rem] bg-white p-6 text-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-[rotate] duration-500 group-hover:rotate-0">
        <Image
          src="/arca/doggo-excited.png"
          alt=""
          width={720}
          height={720}
          className="absolute -right-6 -top-14 h-24 w-24 object-contain"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-green">
            Oggi al rifugio
          </p>
          <span className="rounded-full bg-azure px-2.5 py-0.5 text-xs font-bold text-deep-teal">
            Arca
          </span>
        </div>
        <p className="mt-2 font-heading text-4xl font-semibold leading-none text-deep-teal">
          9<span className="text-xl text-green">/12</span>
        </p>
        <p className="mt-1 text-sm text-green">attività completate</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-fog">
          <div className="h-full w-3/4 rounded-full bg-primary" />
        </div>
        <ul className="mt-5 flex flex-col gap-3">
          {arcaTasks.map((task, index) => (
            <li
              key={task.title}
              // Su mobile la card è più bassa: l'ultima task si nasconde.
              className={cn(
                "flex items-center gap-2.5 text-sm",
                index === arcaTasks.length - 1 && "hidden sm:flex"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  task.done ? "bg-primary text-white" : "border-2 border-fog"
                )}
              >
                {task.done && <Check className="h-3 w-3" strokeWidth={3.5} />}
              </span>
              <span
                className={
                  task.done ? "text-black/40 line-through" : "font-bold"
                }
              >
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export default SolutionSteps;
