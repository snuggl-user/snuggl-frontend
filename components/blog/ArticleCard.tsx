import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { getArticleHeader } from "./articleHeader";

type ArticleCardProps = {
  article: any;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const header = getArticleHeader(article);

  if (!header) return null;

  return (
    <Link
      href={article.url || `/blog/${article.uid}`}
      className="group block h-full"
    >
      <article className="bg-white rounded-2xl overflow-hidden border border-fog hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Immagine */}
        {header.hero_image?.url && (
          <div className="aspect-[16/10] overflow-hidden">
            <PrismicNextImage
              field={header.hero_image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Contenuto */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            {header.category && (
              <span className="font-semibold uppercase tracking-wider text-primary">
                {header.category}
              </span>
            )}
            {header.published_at && <span>{header.published_at}</span>}
            {header.read_time && <span>· {header.read_time} min</span>}
          </div>

          <div className="text-lg font-heading font-semibold text-foreground mb-2 line-clamp-2 [&_p]:m-0">
            <PrismicRichText field={header.title} />
          </div>

          {header.subtitle && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
              {header.subtitle}
            </p>
          )}

          <span className="mt-auto text-sm font-semibold text-primary group-hover:underline">
            Leggi l'articolo →
          </span>
        </div>
      </article>
    </Link>
  );
}
