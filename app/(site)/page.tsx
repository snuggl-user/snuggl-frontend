import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { ArcaAnnouncement, ArcaPromo } from "@/components/arca";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  try {
    const menu = await client.getSingle("menu_site");

    return {
      title: menu.data.site_title || "Snuggl",
      description: menu.data.meta_description || "Adopt, don't shop.",
      openGraph: {
        images: menu.data.logo?.url ? [{ url: menu.data.logo.url }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Snuggl",
      description: "Adopt, don't shop.",
    };
  }
}

export default async function HomePage() {
  const client = createClient();

  const page = await client.getSingle("homepage").catch(() => null);

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

  // La sezione di Arca va subito dopo "La nostra soluzione": se lo slice non
  // c'è, finisce in fondo.
  const slices = page.data.slices;
  const solutionIndex = slices.findIndex(
    (slice) => slice.slice_type === "solution_steps"
  );
  const splitAt = solutionIndex === -1 ? slices.length : solutionIndex + 1;

  return (
    <>
      <ArcaAnnouncement />
      <SliceZone slices={slices.slice(0, splitAt)} components={components} />
      <ArcaPromo />
      <SliceZone slices={slices.slice(splitAt)} components={components} />
    </>
  );
}
