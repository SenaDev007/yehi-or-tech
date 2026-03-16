"use client";

/**
 * Hero avec image de fond + overlay + contenu.
 * Utilise next/image — jamais <img>.
 * Intégration images v1.2
 */

import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt?: string;
  overlayOpacity?: number; // 0 à 100, défaut 70
  height?: string; // className de hauteur Tailwind, défaut "h-80"
  children: React.ReactNode;
  priority?: boolean;
}

export function HeroImage({
  src,
  alt = "",
  overlayOpacity = 70,
  height = "h-80",
  children,
  priority = false,
}: HeroImageProps) {
  return (
    <div className={`relative ${height} overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={85}
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-navy"
        style={{ opacity: overlayOpacity / 100 }}
      />
      <div className="relative z-10 flex h-full items-center">{children}</div>
    </div>
  );
}
