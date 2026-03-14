"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

export interface PortfolioGalleryProps {
  images: string[];
}

export default function PortfolioGallery({ images }: PortfolioGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const open = (i: number) => {
    setIndex(i);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => open(i)}
            className="relative aspect-video overflow-hidden rounded-xl bg-blue-xl/30 transition hover:ring-2 hover:ring-gold"
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={index}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setIndex((i) => (i - 1 + images.length) % images.length)}
          onNext={() => setIndex((i) => (i + 1) % images.length)}
        />
      )}
    </>
  );
}
