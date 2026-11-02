import { createClient } from "@/prismicio";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/arca", label: "Arca per i rifugi" },
  { href: "/blog", label: "Blog" },
  { href: "/#team", label: "Chi siamo" },
];

export default async function Footer() {
  const client = createClient();
  const menu = await client.getSingle("menu_site").catch(() => null);
  const siteTitle = menu?.data?.site_title || "Snuggl";

  return (
    <footer className="px-4 pb-4">
      {/* Stessa larghezza della pillola dell'header */}
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-deep-teal text-white px-6 py-10 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-4">
            <p className="font-heading font-semibold text-2xl sm:text-3xl leading-tight max-w-sm">
              {menu?.data?.meta_description || "Adopt, don't shop."}
            </p>
            <Button
              asChild
              className="h-12 bg-primary hover:bg-primary/90 text-deep-teal rounded-full px-6 font-bold"
            >
              <Link href="/#newsletter">
                Resta aggiornato
                <ArrowRight />
              </Link>
            </Button>
          </div>

          {/* Esplora */}
          <div>
            <h4 className="font-heading text-mint-green mb-3">Esplora</h4>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-mint-green mb-3">Seguici</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/snuggl.app"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright + logo */}
        <div className="mt-10 pt-5 border-t border-white/10 flex items-center justify-between gap-4 text-sm text-white/60">
          <span>
            © {new Date().getFullYear()} {siteTitle}. Tutti i diritti riservati.
          </span>
          {menu?.data?.logo?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={menu.data.logo.url}
              alt=""
              aria-hidden
              className="h-6 w-auto opacity-60"
            />
          ) : null}
        </div>
      </div>
    </footer>
  );
}
