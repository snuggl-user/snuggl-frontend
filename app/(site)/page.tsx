import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { ArcaAnnouncement, ArcaPromo } from "@/components/arca";
import { LatestArticles } from "@/components/blog";
import { NewsletterBar } from "@/components/site/NewsletterBar";
import { JsonLd } from "@/components/JsonLd";
import { openGraphDefaults, organizationJsonLd } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  try {
    const menu = await client.getSingle("menu_site");

    return {
      title: menu.data.site_title || "Snuggl",
      description: menu.data.meta_description || "Adopt, don't shop.",
      alternates: { canonical: "/" },
      openGraph: {
        ...openGraphDefaults,
        url: "/",
        images: menu.data.logo?.url ? [{ url: menu.data.logo.url }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Snuggl",
      description: "Adopt, don't shop.",
      alternates: { canonical: "/" },
    };
  }
}

export default async function HomePage() {
  const client = createClient();

  // Gli ultimi articoli servono a più sezioni: le foto dell'hero, i widget di
  // "Cosa facciamo" e la sezione "Dal blog".
  const [menu, page, articles] = await Promise.all([
    client.getSingle("menu_site").catch(() => null),
    client.getSingle("homepage").catch(() => null),
    client
      .getByType("article", {
        orderings: [
          { field: "document.first_publication_date", direction: "desc" },
        ],
        pageSize: 12,
      })
      .then((res) => res.results)
      .catch(() => []),
  ]);

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-heading font-semibold mb-4">
          Benvenuto su Snuggl 🐾
        </h1>
        <p className="text-muted-foreground">Adopt, don{"'"}t shop.</p>
      </div>
    );
  }

  // Gli ultimi articoli e la sezione di Arca vanno subito dopo lo slice
  // solution_steps ("Cosa facciamo"): se lo slice non c'è, finiscono in fondo.
  const slices = page.data.slices;
  const solutionIndex = slices.findIndex(
    (slice) => slice.slice_type === "solution_steps"
  );
  const splitAt = solutionIndex === -1 ? slices.length : solutionIndex + 1;

  return (
    <>
      <JsonLd data={organizationJsonLd(menu?.data.logo?.url)} />
      <SliceZone
        slices={slices.slice(0, splitAt)}
        components={components}
        context={{ badge: <ArcaAnnouncement />, articles }}
      />
      <LatestArticles articles={articles.slice(0, 3)} />
      <ArcaPromo />
      <SliceZone slices={slices.slice(splitAt)} components={components} />
      <NewsletterBar />
    </>
  );
}
