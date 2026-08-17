"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IllustrationProps {
  src?: string;
  alt: string;
  fallbackEmoji: string;
  className?: string;
}

export function Illustration({
  src,
  alt,
  fallbackEmoji,
  className,
}: IllustrationProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-3xl w-full h-full text-[120px] select-none",
          className
        )}
      >
        {fallbackEmoji}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-gray-50", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-3xl" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 500px"
        className={cn(
          "object-contain transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
      />
    </div>
  );
}
