/** URL pubblico del sito: base di canonical, sitemap e dati strutturati. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snuggl.app";

export const siteName = "Snuggl";

export const siteDescription =
  "Snuggl è un'iniziativa italiana contro l'abbandono degli animali: storie e guide sull'adozione consapevole e Arca, il gestionale gratuito per rifugi e canili.";

export const instagramUrl = "https://www.instagram.com/snuggl.app";

/** Le pagine che definiscono `openGraph` sostituiscono quello del layout: lo ripetono. */
export const openGraphDefaults = {
  siteName,
  locale: "it_IT",
} as const;

const organizationId = `${siteUrl}/#organization`;

/** Snuggl come editore: chi pubblica gli articoli. */
export const publisher = {
  "@type": "Organization",
  "@id": organizationId,
  name: siteName,
  url: siteUrl,
};

/** Organization e WebSite per la homepage. */
export function organizationJsonLd(logoUrl?: string | null) {
  return [
    {
      "@context": "https://schema.org",
      ...publisher,
      description: siteDescription,
      logo: logoUrl || undefined,
      sameAs: [instagramUrl],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      inLanguage: "it-IT",
      publisher: { "@id": organizationId },
    },
  ];
}
