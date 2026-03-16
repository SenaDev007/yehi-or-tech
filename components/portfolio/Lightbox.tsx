"use client";

/**
 * Lightbox galerie — overlay plein écran, navigation, fermeture ESC.
 * CDC v1.4 — next/image.
 */

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const src = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      role="dialog"
      aria-label="Galerie image"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 text-white hover:bg-white/10"
        aria-label="Fermer"
      >
        <X className="h-8 w-8" />
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white hover:bg-white/10"
          aria-label="Image précédente"
        >
          <ChevronLeft className="h-10 w-10" />
        </button>
      )}

      {src && (
        <div className="relative h-[90vh] w-[90vw] max-w-4xl">
          <Image
            src={src}
            alt=""
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white hover:bg-white/10"
          aria-label="Image suivante"
        >
          <ChevronRight className="h-10 w-10" />
        </button>
      )}

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
}
