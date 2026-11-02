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

const months = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
];

/**
 * La data di pubblicazione dell'header è testo libero ("25 Marzo 2026"):
 * la converte in "2026-03-25" per `<time>` e i dati strutturati.
 */
export function parsePublishedAt(publishedAt: string | null | undefined) {
  const match = publishedAt
    ?.trim()
    .toLowerCase()
    .match(/^(\d{1,2})\s+(\p{L}+)\s+(\d{4})$/u);
  const month = match ? months.indexOf(match[2]) + 1 : 0;
  if (!match || month === 0) return undefined;

  return `${match[3]}-${String(month).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}
