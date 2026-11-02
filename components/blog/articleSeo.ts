import { asImageSrc, asText, type Content } from "@prismicio/client";
import { publisher, siteName, siteUrl } from "@/lib/site";
import { getArticleHeader, parsePublishedAt } from "./articleHeader";

export type ArticleSeo = ReturnType<typeof getArticleSeo>;

/**
 * Titolo, descrizione, immagine e date di un articolo per metadati, sitemap e
 * dati strutturati. I campi "SEO & Metadata" del documento hanno la
 * precedenza; quelli dell'header fanno da riserva.
 */
export function getArticleSeo(article: Content.ArticleDocument) {
  const header = getArticleHeader(article);
  const headline =
    (header && asText(header.title)) || article.data.meta_title || siteName;
  const image = article.data.meta_image?.url
    ? article.data.meta_image
    : header?.hero_image;
  const imageUrl = image && asImageSrc(image, { width: 1200, height: 630, fit: "crop" });

  return {
    url: `${siteUrl}/blog/${article.uid}`,
    headline,
    title: article.data.meta_title || headline,
    description:
      article.data.meta_description || header?.subtitle || undefined,
    // 1200×630 è il formato delle anteprime social
    image: imageUrl
      ? { url: imageUrl, width: 1200, height: 630, alt: image.alt || headline }
      : undefined,
    datePublished:
      parsePublishedAt(header?.published_at) ??
      new Date(article.first_publication_date).toISOString(),
    dateModified: new Date(article.last_publication_date).toISOString(),
    author: header?.author_name || undefined,
    category: header?.category || undefined,
  };
}

/** BlogPosting e BreadcrumbList di un articolo. */
export function articleJsonLd(seo: ArticleSeo) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: seo.headline,
      description: seo.description,
      image: seo.image?.url,
      datePublished: seo.datePublished,
      dateModified: seo.dateModified,
      author: seo.author ? { "@type": "Person", name: seo.author } : publisher,
      publisher,
      mainEntityOfPage: seo.url,
      articleSection: seo.category,
      inLanguage: "it-IT",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: seo.headline, item: seo.url },
      ],
    },
  ];
}
