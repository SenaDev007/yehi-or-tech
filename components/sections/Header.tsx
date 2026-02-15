"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/entreprise", label: "Entreprise" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/it", label: "Informatique & IT" },
      { href: "/services/developpement", label: "Développement" },
      { href: "/services/cloud", label: "Cloud & Hébergement" },
      { href: "/services/design", label: "Design & Impression" },
      { href: "/services/ia", label: "Intelligence Artificielle" },
    ],
  },
  { href: "/solutions", label: "Solutions" },
  { href: "/innovation", label: "Innovation" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80">
      <div className="container mx-auto flex h-14 min-h-[3.5rem] max-w-6xl items-center justify-between gap-3 px-4 sm:px-5 md:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="YEHI OR Tech - Accueil"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/logo-yehi-or-tech.png`}
            alt=""
            width={140}
            height={44}
            className="h-8 w-auto object-contain sm:h-9"
            priority
          />
          <span className="sr-only">YEHI OR Tech</span>
        </Link>

        <nav className="hidden flex-wrap items-center justify-end gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-gray-light transition-colors hover:text-neutral-white",
                    pathname.startsWith(item.href) && "text-neutral-white"
                  )}
                >
                  {item.label}
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-1"
                    >
                      <div className="min-w-[220px] rounded-lg border border-white/10 bg-primary-light py-2 shadow-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-4 py-2 text-sm text-neutral-gray-light transition-colors hover:bg-white/5 hover:text-neutral-white",
                              pathname === child.href && "text-accent-electric"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-neutral-gray-light transition-colors hover:text-neutral-white",
                  pathname === item.href && "text-neutral-white"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button asChild size="sm">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>

        <button
          type="button"
          className="min-h-[2.75rem] min-w-[2.75rem] rounded-lg p-2 text-neutral-gray-light hover:bg-white/5 hover:text-neutral-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[85vh] overflow-y-auto border-t border-white/10 bg-primary-light lg:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-1 px-4 py-4 pb-6">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.href}>
                    <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-gray">
                      {item.label}
                    </span>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm text-neutral-gray-light hover:bg-white/5 hover:text-neutral-white",
                          pathname === child.href && "text-accent-electric"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium text-neutral-gray-light hover:bg-white/5 hover:text-neutral-white",
                      pathname === item.href && "text-neutral-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="mt-4 pt-4 border-t border-white/10">
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
