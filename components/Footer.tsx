import { createClient } from "@/prismicio";
import Link from "next/link";

export default async function Footer() {
  const client = createClient();
  const menu = await client.getSingle("menu_site").catch(() => null);

  return (
    <footer className="bg-gray border-t border-fog">
      <div className="container mx-auto px-6 py-10">
        {/* Brand - centrato su mobile, sinistra su desktop */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-heading font-semibold">
            {menu?.data?.site_title || "Snuggl"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {menu?.data?.meta_description || "Adopt, don't shop."}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-8 md:px40 lg:px-80 md:text-center">
          {/* Esplora */}
          <div className="">
            <h4 className="font-heading font-medium mb-4">Esplora</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/arca"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Arca per i rifugi
                </Link>
              </li>
              <li>
                <Link
                  href="/#team"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Chi siamo
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-right md:text-center">
            <h4 className="font-heading font-medium mb-4">Seguici</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/snuggl.app"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-fog text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            {menu?.data?.site_title || "Snuggl.app"}. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
