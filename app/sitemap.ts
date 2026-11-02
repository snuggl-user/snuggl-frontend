import type { MetadataRoute } from "next";
import { createClient } from "@/prismicio";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  const articles = await client.getAllByType("article");

  // Il blog cambia ogni volta che cambia un articolo
  const blogLastModified = articles
    .map((article) => new Date(article.last_publication_date))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  return [
    { url: siteUrl },
    { url: `${siteUrl}/arca` },
    { url: `${siteUrl}/blog`, lastModified: blogLastModified },
    ...articles.map((article) => ({
      url: `${siteUrl}/blog/${article.uid}`,
      lastModified: new Date(article.last_publication_date),
    })),
  ];
}
