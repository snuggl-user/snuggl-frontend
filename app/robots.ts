import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Pagine tecniche o di solo redirect: niente da indicizzare.
const disallow = [
  "/api/",
  "/slice-simulator",
  "/sondaggio",
  "/newsletter-confirmed",
];

// Nominati per esteso: vogliamo che il blog finisca nelle risposte di
// ChatGPT, Claude, Perplexity, Gemini e Apple Intelligence.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
