"use client";

/**
 * Hero — image de fond, particules dorées CSS, H1, sous-titre, 2 CTAs, scroll indicator.
 * CDC v1.4 — next/image, particules GPU-composited.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

const DEVIS_URL =
  process.env.NEXT_PUBLIC_DEVIS_URL || "/devis";

const PARTICLE_COUNT = 40;

function HeroParticles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          className="hero-particle absolute h-2 w-2 rounded-full bg-gold"
          style={{
            left: `${(i * 7 + 3) % 100}%`,
            top: `${(i * 11 + 5) % 100}%`,
            animation: `particle-float ${8 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-[70px] pb-12 sm:pb-16"
      aria-labelledby="hero-title"
    >
      <Image
        src={IMAGES.accueil.heroBg}
        alt=""
        fill
        priority
        quality={90}
        className="object-cover object-center -z-20"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: "rgba(13, 46, 140, 0.82)" }}
        aria-hidden
      />
      <HeroParticles />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          id="hero-title"
          className="font-syne text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Des idées lumineuses, des solutions encore plus brillantes.
        </motion.h1>
        <motion.p
          className="mt-4 sm:mt-6 text-base text-white sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          Agence de branding, création web & impression — Parakou, Bénin
        </motion.p>
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        >
          <Button asChild variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto">
            <Link href="#services">Découvrir nos services</Link>
          </Button>
          <Button asChild variant="outline" className="min-h-[44px] w-full sm:w-auto">
            <a
              href={DEVIS_URL}
              target={DEVIS_URL.startsWith("http") ? "_blank" : undefined}
              rel={DEVIS_URL.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              Demander un devis
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#pourquoi"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 transition hover:text-gold"
        aria-label="Défiler vers le bas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </motion.a>
    </section>
  );
}
