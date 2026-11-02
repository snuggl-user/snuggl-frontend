import { createClient } from "@/prismicio";
import { getArticleSeo } from "@/components/blog/articleSeo";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

/** Indice del sito per i modelli AI, nel formato di https://llmstxt.org. */
export async function GET() {
  const client = createClient();
  const articles = await client.getAllByType("article", {
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  const lines = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    "## Pagine",
    "",
    `- [Arca, il gestionale gratuito per rifugi e canili](${siteUrl}/arca): task del giorno, schede degli animali, volontari e gestori in un unico posto.`,
    `- [Blog](${siteUrl}/blog): storie, guide e notizie su adozione consapevole, randagismo e benessere animale.`,
    "",
    "## Articoli",
    "",
    ...articles.map((article) => {
      const seo = getArticleSeo(article);
      const description = seo.description ? `: ${seo.description}` : "";
      return `- [${seo.headline}](${seo.url})${description}`;
    }),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
