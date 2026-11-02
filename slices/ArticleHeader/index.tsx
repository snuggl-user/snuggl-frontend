import { FC } from "react";
import { Content, asText } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { parsePublishedAt } from "@/components/blog/articleHeader";

/**
 * Props for `ArticleHeader`.
 */
export type ArticleHeaderProps =
  SliceComponentProps<Content.ArticleHeaderSlice>;

/**
 * Component for "ArticleHeader" Slices.
 */
const ArticleHeader: FC<ArticleHeaderProps> = ({ slice }) => {
  const {
    title,
    subtitle,
    hero_image,
    author_name,
    author_avatar,
    published_at,
    read_time,
    category,
  } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white pt-10 pb-0"
    >
      {/* Testo centrato in colonna stretta */}
      <div className="max-w-3xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          {category && (
            <>
              <span>›</span>
              <span className="text-foreground">{category}</span>
            </>
          )}
        </nav>

        {/* Categoria */}
        {category && (
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            {category}
          </span>
        )}

        {/* Titolo: sempre H1, anche se in Prismic è scritto come paragrafo */}
        <h1 className="text-4xl md:text-5xl font-heading font-semibold leading-tight text-foreground mb-4">
          {asText(title)}
        </h1>

        {/* Sottotitolo */}
        {subtitle && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {subtitle}
          </p>
        )}

        {/* Autore + meta */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-10">
          {author_avatar?.url && (
            <PrismicNextImage
              field={author_avatar}
              alt=""
              className="w-9 h-9 rounded-full object-cover shrink-0 object-top"
            />
          )}
          {author_name && (
            <span className="font-medium text-foreground">{author_name}</span>
          )}
          {published_at && (
            <>
              <span className="w-1 h-1 bg-current rounded-full inline-block"></span>
              <time dateTime={parsePublishedAt(published_at)}>
                {published_at}
              </time>
            </>
          )}
          {read_time && (
            <>
              <span className="w-1 h-1 bg-current rounded-full inline-block"></span>
              <span>{read_time} min di lettura</span>
            </>
          )}
        </div>
      </div>

      {/* Hero image — più larga del testo
      {hero_image?.url && (
        <div className="max-w-5xl mx-auto px-6">
          <PrismicNextImage
            field={hero_image}
            className="w-full rounded-3xl object-cover max-h-[480px]"
          />
        </div>
      )}*/}
    </section>
  );
};

export default ArticleHeader;
