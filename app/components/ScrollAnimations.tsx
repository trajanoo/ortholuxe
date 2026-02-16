'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  totalSections: number;
  onProgress?: (progress: number) => void;
}

export function ScrollSection({
  children,
  className = '',
  index,
  totalSections,
}: ScrollSectionProps) {
  const { scrollY } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={className}>{children}</div>;

  // Calculate opacity and position based on scroll
  const opacity = useTransform(scrollY, (value) => {
    if (typeof window === 'undefined') return 0;
    if (!ref.current) return 0;
    const sectionStart = window.innerHeight * index;
    const sectionEnd = sectionStart + window.innerHeight;

    if (value < sectionStart - window.innerHeight) return 0;
    if (value > sectionEnd) return 0;

    const progress =
      (value - (sectionStart - window.innerHeight)) /
      (window.innerHeight * 2);

    return Math.min(Math.max(progress, 0), 1);
  });

  const y = useTransform(scrollY, (value) => {
    if (typeof window === 'undefined') return 0;
    const sectionStart = window.innerHeight * index;
    const offset = (value - sectionStart) * 0.5;
    return offset;
  });

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
      }}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface HeroSectionProps {
  scrollProgress: number;
  totalScroll: number;
}

export function HeroSection({
  scrollProgress,
  totalScroll,
  children,
}: HeroSectionProps & { children: React.ReactNode }) {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, (value) => {
    return Math.max(0, 1 - value / (window.innerHeight * 0.8));
  });

  const y = useTransform(scrollY, (value) => {
    return value * 0.5;
  });

  const scale = useTransform(scrollY, (value) => {
    return 1 + value * 0.0005;
  });

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
      }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-blue-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-black" />
      {children}
    </motion.div>
  );
}

export function StorySection({
  title,
  description,
  index,
  alignment = 'left',
}: {
  title: string;
  description: string;
  index: number;
  alignment?: 'left' | 'right' | 'center';
}) {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const opacity = useTransform(scrollY, (value) => {
    if (typeof window === 'undefined') return 0;
    const sectionStart = window.innerHeight * (1 + index);
    const triggerPoint = sectionStart - window.innerHeight * 0.3;

    if (value < triggerPoint) return 0;
    if (value > sectionStart + window.innerHeight * 0.5) return 1;

    const progress = (value - triggerPoint) / (window.innerHeight * 0.8);
    return Math.min(Math.max(progress, 0), 1);
  });

  const x = useTransform(scrollY, (value) => {
    if (typeof window === 'undefined') return alignment === 'left' ? -100 : 100;
    const sectionStart = window.innerHeight * (1 + index);
    const triggerPoint = sectionStart - window.innerHeight * 0.3;

    if (value < triggerPoint) return alignment === 'left' ? -100 : 100;
    if (value > sectionStart + window.innerHeight * 0.5) return 0;

    const progress = (value - triggerPoint) / (window.innerHeight * 0.8);
    const startOffset = alignment === 'left' ? -100 : 100;
    return startOffset + progress * Math.abs(startOffset);
  });

  if (!mounted) return null;

  const alignmentClass = {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  }[alignment];

  return (
    <motion.div
      style={{
        opacity,
        x,
      }}
      className={`relative w-full px-8 md:px-16 py-24 ${alignmentClass}`}
    >
      <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-slate-900 dark:text-white">
        {title}
      </h2>
      <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export function GradientBackground({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bgColor = useTransform(scrollY, (value) => {
    if (typeof window === 'undefined') return 'rgb(240, 249, 255)';
    
    // Calculate which section we're in
    const section = Math.min(
      4,
      Math.floor(value / (window.innerHeight * 0.5))
    );

    const colors = [
      'rgb(240, 249, 255)', // light blue
      'rgb(219, 234, 254)', // softer blue
      'rgb(240, 249, 255)', // back to light blue
      'rgb(255, 255, 255)', // white
      'rgb(248, 250, 252)', // slate white
    ];

    return colors[section] || colors[0];
  });

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        backgroundColor: bgColor,
      }}
      className="fixed inset-0 -z-10 transition-colors duration-300"
    />
  );
}
