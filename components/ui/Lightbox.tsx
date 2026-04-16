"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  path: string;
  label: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const current = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.label}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-surface-2 border border-border text-text-muted hover:text-text-primary hover:border-accent-from/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 p-3 rounded-full bg-surface-2 border border-border text-text-muted hover:text-text-primary hover:border-accent-from/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from"
          aria-label="Previous image"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 p-3 rounded-full bg-surface-2 border border-border text-text-muted hover:text-text-primary hover:border-accent-from/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from"
          aria-label="Next image"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-5xl w-[90vw] max-h-[80vh] flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full rounded-lg overflow-hidden border border-border shadow-2xl"
          style={{ height: "min(70vh, 600px)" }}
        >
          <Image
            key={current.path}
            src={current.path}
            alt={current.label}
            fill
            className="object-contain bg-surface"
            sizes="90vw"
            priority
          />
        </div>

        {/* Label + counter */}
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-sm text-text-muted">{current.label}</span>
          <span className="font-mono text-xs text-text-dim">
            {index + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
