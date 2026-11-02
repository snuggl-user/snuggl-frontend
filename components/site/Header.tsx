// components/site/Header.tsx
import { createClient } from "@/prismicio";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/ui/MobileMenu";

// Le ancore partono da "/": l'header c'è anche su /arca, dove #team non esiste.
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/arca", label: "Arca" },
  { href: "/blog", label: "Blog" },
  { href: "/#team", label: "Team" },
];

export default async function Header() {
  const client = createClient();
  const menu = await client.getSingle("menu_site").catch(() => null);

  return (
    <header className="sticky top-0 z-30 px-4 pt-3">
      {/* Barra a pillola sospesa: il contenuto scorre sotto, sfocato */}
      <div className="mx-auto max-w-6xl flex items-center justify-between h-16 pl-6 pr-2 rounded-full bg-white/85 backdrop-blur-md border border-black/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {menu?.data?.logo?.url ? (
            <Image
              src={menu.data.logo.url}
              alt={menu.data.logo.alt || "Snuggl"}
              width={100}
              height={100}
              priority
            />
          ) : (
            <span className="text-2xl font-heading font-semibold text-primary">
              Snuggl
            </span>
          )}
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-black rounded-full px-4 py-2 hover:bg-azure hover:text-deep-teal transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="ml-3 h-12 bg-deep-teal hover:bg-deep-teal/90 text-white rounded-full px-6 font-bold"
          >
            <Link href="/#newsletter">Resta aggiornato</Link>
          </Button>
        </nav>

        {/* Mobile */}
        <MobileMenu links={navigationLinks} />
      </div>
    </header>
  );
}
