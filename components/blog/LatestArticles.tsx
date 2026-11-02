import Link from "next/link";
import type { Content } from "@prismicio/client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "./ArticleCard";

type LatestArticlesProps = {
  articles: Content.ArticleDocument[];
};

/**
 * Ultimi articoli del blog in homepage: la divulgazione contro l'abbandono è
 * uno dei due pilastri di Snuggl, insieme ad Arca.
 */
export function LatestArticles({ articles }: LatestArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="px-4 py-12 lg:py-20" id="blog">
      <div className="reveal rounded-[2.5rem] bg-gray px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-14">
            <div className="flex flex-col gap-4 max-w-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight">
                Dal blog
              </h2>
              <p className="text-lg text-green">
                Consigli, storie e approfondimenti per un&apos;adozione
                consapevole e contro l&apos;abbandono.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="w-fit h-12 px-6 font-bold rounded-full bg-white text-black border border-black/10 hover:bg-white/70"
            >
              <Link href="/blog">
                Tutti gli articoli
                <ArrowRight />
              </Link>
            </Button>
          </div>

          {/* Su mobile le card scorrono in orizzontale */}
          <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-6 -mx-6 px-6 pb-2 md:mx-0 md:px-0 md:pb-0 md:overflow-visible">
            {articles.map((article) => (
              <div
                key={article.id}
                className="min-w-[80vw] sm:min-w-[60vw] md:min-w-0 snap-start"
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
