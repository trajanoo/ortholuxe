'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Image from 'next/image';

const TOTAL_FRAMES = 111;
const FRAME_PATH = '/tooth3d/frame_';

export default function ScrollToothPlayer({
  scrollProgress = 0,
}: {
  scrollProgress?: number;
}) {
  const { scrollY } = useScroll();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update frame based on scroll position
  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (typeof window === 'undefined') return;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY.get() / maxScroll, 1);

      // Bloqueia o scroll enquanto os frames estão sendo exibidos
      if (progress < 1) {
        event.preventDefault();
        const frameIndex = Math.min(
          Math.floor(progress * TOTAL_FRAMES),
          TOTAL_FRAMES - 1
        );
        setCurrentFrame(frameIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  // Format frame number with leading zeros
  const getFramePath = (frameNum: number) => {
    const padded = String(frameNum + 1).padStart(4, '0');
    return `${FRAME_PATH}${padded}.png`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-transparent flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full">
        <Image
          src={getFramePath(currentFrame)}
          alt={`Tooth animation frame ${currentFrame + 1}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority={currentFrame < 10}
          onLoad={() => {
            if (currentFrame === 0) setIsLoading(false);
          }}
        />
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-white/60 text-sm">Loading animation...</p>
          </div>
        </div>
      )}

      {/* Frame counter (optional - remove for production) */}
      <div className="absolute bottom-4 right-4 text-xs text-white/40 bg-black/30 px-3 py-2 rounded-full font-mono">
        Frame: {currentFrame + 1} / {TOTAL_FRAMES}
      </div>
    </div>
  );
}
