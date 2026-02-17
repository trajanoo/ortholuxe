'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import ScrollToothPlayer from './components/ScrollToothPlayer';
import {
  ScrollSection,
  HeroSection,
  StorySection,
  GradientBackground,
} from './components/ScrollAnimations';

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track overall scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / maxScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero tooth scale and opacity
  const heroScale = useTransform(scrollY, (value) => {
    if (typeof window === 'undefined') return 1;
    const progress = value / (window.innerHeight * 0.8);
    return 1 - progress * 0.3;
  });

  const heroOpacity = useTransform(scrollY, (value) => {
    if (typeof window === 'undefined') return 1;
    const progress = value / (window.innerHeight * 1.2);
    return Math.max(0, 1 - progress);
  });

  // Metrics scroll-controlled animations
  const slideDistance =
    typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.7, 560) : 300;

  const totalRange = typeof window !== 'undefined' ? window.innerHeight * 0.9 : 500;

  const makeMetricRaw = (startFrac: number, durationFrac: number) =>
    useTransform(scrollY, (v) => {
      if (typeof window === 'undefined') return 0;
      const global = v / totalRange;
      const t = (global - startFrac) / durationFrac;
      const c = Math.min(Math.max(t, 0), 1);
      // smoother ease-out
      const ease = 1 - Math.pow(1 - c, 4);
      return ease * slideDistance;
    });

  // Tighter sequencing: start times closer and shorter durations for quicker succession
  const metricX0Raw = makeMetricRaw(0.02, 0.18);
  const metricX1Raw = makeMetricRaw(0.12, 0.18);
  const metricX2Raw = makeMetricRaw(0.22, 0.18);

  const metricX0 = useSpring(metricX0Raw, { stiffness: 100, damping: 16 });
  const metricX1 = useSpring(metricX1Raw, { stiffness: 100, damping: 16 });
  const metricX2 = useSpring(metricX2Raw, { stiffness: 100, damping: 16 });

  const metricO0 = useTransform(metricX0, (x) => 1 - Math.min(Math.abs(x) / slideDistance, 1));
  const metricO1 = useTransform(metricX1, (x) => 1 - Math.min(Math.abs(x) / slideDistance, 1));
  const metricO2 = useTransform(metricX2, (x) => 1 - Math.min(Math.abs(x) / slideDistance, 1));

  // Left headline (EVERY SMILE MATTERS) slide/fade - similar sequencing but to left
  const leftSlideDistance = typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.45, 420) : 300;

  const makeLeftRaw = (startFrac: number, durationFrac: number) =>
    useTransform(scrollY, (v) => {
      if (typeof window === 'undefined') return 0;
      const global = v / totalRange;
      const t = (global - startFrac) / durationFrac;
      const c = Math.min(Math.max(t, 0), 1);
      const ease = 1 - Math.pow(1 - c, 4);
      return -ease * leftSlideDistance; // negative to slide left
    });

  const leftX0Raw = makeLeftRaw(0.0, 0.16);
  const leftX1Raw = makeLeftRaw(0.08, 0.16);
  const leftX2Raw = makeLeftRaw(0.16, 0.16);

  const leftX0 = useSpring(leftX0Raw, { stiffness: 100, damping: 16 });
  const leftX1 = useSpring(leftX1Raw, { stiffness: 100, damping: 16 });
  const leftX2 = useSpring(leftX2Raw, { stiffness: 100, damping: 16 });

  const leftO0 = useTransform(leftX0, (x) => 1 - Math.min(Math.abs(x) / leftSlideDistance, 1));
  const leftO1 = useTransform(leftX1, (x) => 1 - Math.min(Math.abs(x) / leftSlideDistance, 1));
  const leftO2 = useTransform(leftX2, (x) => 1 - Math.min(Math.abs(x) / leftSlideDistance, 1));

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full overflow-x-hidden bg-white"
    >
      <GradientBackground scrollProgress={scrollProgress} />

      {/* Hero Section with 3D Tooth */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-cyan-100 to-cyan-600">
        {/* Background gradient layers */}
        <div className="absolute inset-0 bg-linear-to-b " />

        {/* Subtle animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-200 to-transparent rounded-full blur-3xl opacity-40"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-cyan-200 to-transparent rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Content container */}
        <div className="relative z-10 w-full h-full flex">
          {/* Full-screen Tooth Animation Background - behind everything */}
          <div className="absolute inset-0 w-full h-full">
            <motion.div
              style={{
                scale: heroScale,
                opacity: heroOpacity,
              }}
              className="relative w-full h-full"
            >
              <ScrollToothPlayer scrollProgress={scrollProgress / 100} />
            </motion.div>
          </div>

          {/* Header superimposed on the animation */}
          <header className=" w-screen h-20 flex justify-center md:pt-10 pb-6 md:pb-8 px-8 md:px-16 lg:px-24 z-10">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-80">
              <a href="#" className="flex items-center gap-2 group">
                <span className="text-xl md:text-2xl font-light tracking-tight text-cyan-500 drop-shadow-lg">
                  Ortho<span className='text-black'>Luxe</span>
                </span>
              </a>
              <nav className="flex items-center gap-6 md:gap-10">
                <a
                  href="#services"
                  className="text-sm font-medium text-black transition-colors hover:text-[#FE4900] cursor-pointer"
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium text-black transition-colors hover:text-[#FE4900] cursor-pointer"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-sm font-medium text-black transition-colors hover:text-[#FE4900] cursor-pointer"
                >
                  Contact
                </a>
                <button className="h-10 w-32 rounded-full bg-[#FE4900] hover:bg-[#FE4900]/80 cursor-pointer transition backdrop-blur-md text-white text-sm font-medium border border-white/30">
                  Book a visit
                </button>
              </nav>
            </div>
            {/* Glass bar so the tooth shows through subtly */}

          </header>

          {/* Hero metrics: placed to the right of the animation, centered vertically */}
          <div className="absolute md:right-12 lg:right-48 top-1/2 -translate-y-1/2 z-20">
            <div className="flex flex-col items-end gap-6 text-right">
              <motion.div style={{ x: metricX0, opacity: metricO0 }} className="transform-gpu">
                <div className="text-3xl md:text-4xl font-extrabold text-[#FE4900]">150+</div>
                <div className="text-sm text-slate-700">Expert Dentists</div>
              </motion.div>

              <motion.div style={{ x: metricX1, opacity: metricO1 }} className="transform-gpu">
                <div className="text-3xl md:text-4xl font-extrabold text-[#FE4900]">20+</div>
                <div className="text-sm text-slate-700">Dental Clinics across UK</div>
              </motion.div>

              <motion.div style={{ x: metricX2, opacity: metricO2 }} className="transform-gpu">
                <div className="text-3xl md:text-4xl font-extrabold text-[#FE4900]">03+</div>
                <div className="text-sm text-slate-700">Countries presence</div>
              </motion.div>
            </div>
          </div> 

          <div className="absolute md:left-12 lg:left-36 2xl:left-52 top-1/2 -translate-y-1/2 -z-30">
            <div className='flex flex-col font-extrabold md:text-7xl 2xl:text-8xl'>
              <motion.span style={{ x: leftX0, opacity: leftO0 }} className="block">EVERY</motion.span>
              <motion.span style={{ x: leftX1, opacity: leftO1 }} className="block text-cyan-700">SMILE</motion.span>
              <motion.span style={{ x: leftX2, opacity: leftO2 }} className="block">MATTERS</motion.span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="text-center flex flex-col items-center gap-2">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">
              Scroll to explore
            </p>
            <svg
              className="w-5 h-5 mx-auto text-slate-400 dark:text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Story Sections */}


      {/* Footer */}
      <footer className="relative h-screen w-full  text-white py-16 border-t border-slate-800">

      </footer>
    </div>
  );
}
