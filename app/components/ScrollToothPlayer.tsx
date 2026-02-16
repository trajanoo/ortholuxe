'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const TOTAL_FRAMES = 111;
const FRAME_PATH = '/tooth3d/frame_';

function getFramePath(frameNum: number): string {
  const padded = String(frameNum + 1).padStart(4, '0');
  return `${FRAME_PATH}${padded}.webp`;
}

// Lerp factor per frame: higher = snappier, lower = smoother (0.12–0.2 is a good range)
const PROGRESS_LERP = 0.18;

export default function ScrollToothPlayer({
  scrollProgress = 0,
}: {
  scrollProgress?: number;
}) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef(0);

  targetRef.current = Math.min(1, Math.max(0, scrollProgress));

  const exactFrame = displayProgress * (TOTAL_FRAMES - 1);
  const frameIndex = Math.min(Math.floor(exactFrame), TOTAL_FRAMES - 1);
  const nextFrameIndex = Math.min(frameIndex + 1, TOTAL_FRAMES - 1);
  const blend = exactFrame - frameIndex;

  // Smooth progress toward target with rAF so animation isn't tied to scroll event rate
  useEffect(() => {
    const tick = () => {
      const target = targetRef.current;
      setDisplayProgress((prev) => {
        const next = prev + (target - prev) * PROGRESS_LERP;
        const done = Math.abs(next - target) < 0.0005;
        return done ? target : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Preload next few frames to avoid hitches when advancing
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    const from = Math.max(0, frameIndex);
    const to = Math.min(TOTAL_FRAMES, frameIndex + 4);
    for (let i = from; i < to; i++) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getFramePath(i);
      document.head.appendChild(link);
      links.push(link);
    }
    return () => links.forEach((link) => link.remove());
  }, [frameIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-transparent flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full">
        {/* Current frame (underneath when blending) */}
        <Image
          src={getFramePath(frameIndex)}
          alt=""
          fill
          className="object-cover select-none pointer-events-none"
          sizes="100vw"
          priority={frameIndex < 10}
          onLoad={() => {
            if (frameIndex === 0) setIsLoading(false);
          }}
          style={{ opacity: 1 - blend }}
        />
        {/* Next frame: crossfade when between frames to avoid hard cuts */}
        {blend > 0.001 && (
          <Image
            src={getFramePath(nextFrameIndex)}
            alt=""
            fill
            className="object-cover select-none pointer-events-none"
            sizes="100vw"
            priority={nextFrameIndex < 10}
            style={{ opacity: blend }}
          />
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-white/60 text-sm">Loading animation...</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 text-xs text-white/40 bg-black/30 px-3 py-2 rounded-full font-mono">
        Frame: {frameIndex + 1} / {TOTAL_FRAMES}
      </div>
    </div>
  );
}
