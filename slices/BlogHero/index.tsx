import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

type BlogContext = {
  featuredArticle: any | null;
};

/**
 * Props for `BlogHero`.
 */
export type BlogHeroProps = SliceComponentProps<
  Content.BlogHeroSlice,
  BlogContext
>;

/**
 * Component for "BlogHero" Slices.
 */
const BlogHero: FC<BlogHeroProps> = ({ slice, context }) => {
  const { featuredArticle } = context;

  // Estrai dati dell'articolo dalla prima slice article_header
  const headerSlice = featuredArticle?.data?.slices?.find(
    (s: any) => s.slice_type === "article_header"
  );
  const header = headerSlice?.primary;

  const contentSlice = featuredArticle?.data?.slices?.find(
    (s: any) => s.slice_type === "article_content"
  );
  const firstParagraph = contentSlice?.primary?.content?.find(
    (block: any) => block.type === "paragraph"
  )?.text;

  const description =
    header.subtitle ||
    featuredArticle.data.meta_description ||
    firstParagraph ||
    null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pb-12"
    >
      <div className="container max-w-6xl mx-auto">
        {/* Hero text */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-4">
            {slice.primary.title}
          </h1>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>

        {/* Featured Article Card */}
        {featuredArticle && header && (
          <Link
            href={featuredArticle.url || `/blog/${featuredArticle.uid}`}
            className="group block"
          >
            <article className="bg-white rounded-3xl overflow-hidden border border-fog hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Immagine */}
                {header.hero_image?.url && (
                  <div className="md:aspect-auto overflow-hidden max-h-[320px]">
                    <PrismicNextImage
                      field={header.hero_image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Contenuto */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                      In Evidenza
                    </span>
                    {header.category && (
                      <span className="bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                        {header.category}
                      </span>
                    )}
                  </div>

                  <div className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-3 [&_p]:m-0">
                    <PrismicRichText field={header.title} />
                  </div>

                  {description && (
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {description}
                    </p>
                  )}

                  {/* CTA + read time — come nel design */}
                  <div className="flex flex-col items-start gap-4">
                    {header.read_time && (
                      <span className="text-sm text-muted-foreground">
                        {header.read_time} min di lettura
                      </span>
                    )}
                    <span className="bg-primary text-white rounded-full px-6 py-2.5 text-sm font-semibold inline-flex items-center gap-2">
                      Leggi l'articolo
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )}
      </div>
    </section>
  );
};

export default BlogHero;
