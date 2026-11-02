import type { Content } from "@prismicio/client";

/**
 * Titolo, copertina e categoria di un articolo non stanno nei campi del
 * documento ma nello slice article_header.
 */
export function getArticleHeader(article: Content.ArticleDocument) {
  const slice = article.data.slices.find(
    (slice) => slice.slice_type === "article_header"
  );
  return slice?.slice_type === "article_header" ? slice.primary : undefined;
}
