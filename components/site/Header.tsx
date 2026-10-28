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
    <header className="w-full bg-white border-b border-gray-100 px-6 lg:px-40 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
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
          <nav className="hidden md:flex items-center gap-10">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-black hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2.5 font-bold"
            >
              <Link href="/#newsletter">Snuggl an invite</Link>
            </Button>
          </nav>

          {/* Mobile */}
          <MobileMenu links={navigationLinks} />
        </div>
      </div>
    </header>
  );
}
