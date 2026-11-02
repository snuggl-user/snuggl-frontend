import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { articleJsonLd, getArticleSeo } from "@/components/blog";
import { JsonLd } from "@/components/JsonLd";
import { openGraphDefaults } from "@/lib/site";

type Props = {
  params: Promise<{ uid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const article = await client.getByUID("article", uid).catch(() => notFound());
  const seo = getArticleSeo(article);
  const images = seo.image ? [seo.image] : undefined;

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.url },
    openGraph: {
      ...openGraphDefaults,
      type: "article",
      url: seo.url,
      title: seo.headline,
      description: seo.description,
      publishedTime: seo.datePublished,
      modifiedTime: seo.dateModified,
      authors: seo.author ? [seo.author] : undefined,
      section: seo.category,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.headline,
      description: seo.description,
      images,
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const articles = await client.getAllByType("article");
  return articles.map((article) => ({ uid: article.uid }));
}

export default async function ArticlePage({ params }: Props) {
  const { uid } = await params;
  const client = createClient();
  const article = await client.getByUID("article", uid).catch(() => notFound());

  // Il layout del blog ha già il <main>
  return (
    <article>
      <JsonLd data={articleJsonLd(getArticleSeo(article))} />
      <SliceZone slices={article.data.slices} components={components} />
    </article>
  );
}
