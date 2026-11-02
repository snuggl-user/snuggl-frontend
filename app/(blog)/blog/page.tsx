import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { openGraphDefaults } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("blog_homepage");

  return {
    title: page.data.meta_title || "Blog — Snuggl",
    description: page.data.meta_description,
    alternates: { canonical: "/blog" },
    openGraph: {
      ...openGraphDefaults,
      url: "/blog",
      images: page.data.meta_image?.url
        ? [{ url: page.data.meta_image.url }]
        : undefined,
    },
  };
}

export default async function BlogHomePage() {
  const client = createClient();
  const page = await client.getSingle("blog_homepage");

  // Fetch articolo in evidenza (dati completi per la card)
  let featuredArticle = null;
  if (isFilled.contentRelationship(page.data.featured_article)) {
    featuredArticle = await client
      .getByID(page.data.featured_article.id)
      .catch(() => null);
  }

  // Fetch articoli per la griglia (prima pagina)
  const articles = await client.getByType("article", {
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
    pageSize: 12,
  });

  return (
    <div className="bg-gray px-6 py-12 lg:px-40 lg:py-24">
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{
          featuredArticle,
          articles: articles.results,
          totalPages: articles.total_pages,
        }}
      />
    </div>
  );
}
