'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
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

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full overflow-x-hidden bg-white dark:bg-black"
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
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
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
          <header className="absolute top-0 left-0 right-0 z-20 pt-8 md:pt-10 pb-6 md:pb-8 px-8 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <a href="#" className="flex items-center gap-2 group">
                <span className="text-xl md:text-2xl font-light tracking-tight text-white drop-shadow-lg">
                  OrthoLuxe
                </span>
              </a>
              <nav className="flex items-center gap-6 md:gap-10">
                <a
                  href="#services"
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors drop-shadow-md"
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors drop-shadow-md"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors drop-shadow-md"
                >
                  Contact
                </a>
                <button className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-sm font-medium border border-white/30 transition-all">
                  Book a visit
                </button>
              </nav>
            </div>
            {/* Glass bar so the tooth shows through subtly */}
            <div
              className="absolute inset-0 -z-10 bg-linear-to-b from-black/30 via-black/10 to-transparent backdrop-blur-[6px]"
              aria-hidden
            />
          </header>
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
          <div className="text-center">
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
      <div className="relative z-20">
        {/* Section 1: Precision */}
        <div className="relative w-full min-h-screen flex items-center justify-center bg-linear-to-b from-white to-blue-50 dark:from-black dark:to-slate-950">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 right-10 w-80 h-80 bg-gradient-radial from-cyan-300 to-transparent rounded-full blur-3xl opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
            />
          </div>

          <StorySection
            index={0}
            title="Precision"
            description="Every detail matters. Our advanced diagnostic technology detects issues down to the micrometer, ensuring treatments are perfectly calibrated to your unique dental anatomy. Experience diagnostics that don't miss a single detail."
            alignment="left"
          />
        </div>

        {/* Section 2: Technology */}
        <div className="relative w-full min-h-screen flex items-center justify-center bg-linear-to-b from-blue-50 to-slate-50 dark:from-slate-950 dark:to-slate-900">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-radial from-blue-300 to-transparent rounded-full blur-3xl opacity-15"
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
              }}
            />
          </div>

          <StorySection
            index={1}
            title="Technology"
            description="State-of-the-art equipment powered by AI-assisted treatment planning. Our clinic utilizes the latest innovations in digital dentistry, offering procedures that are faster, safer, and more predictable than ever before."
            alignment="right"
          />
        </div>

        {/* Section 3: Confidence */}
        <div className="relative w-full min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-black">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-cyan-200 to-transparent rounded-full blur-3xl opacity-20"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
              }}
            />
          </div>

          <StorySection
            index={2}
            title="Confidence"
            description="Walk out with a smile you're proud to show. Our aesthetic specialists blend science with artistry, creating natural-looking results that enhance your features. Your confidence is our greatest achievement."
            alignment="center"
          />
        </div>

        {/* Section 4: Transformation */}
        <div className="relative w-full min-h-screen flex items-center justify-center bg-linear-to-b from-white to-blue-50 dark:from-black dark:to-slate-950 pb-32">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute bottom-0 right-20 w-96 h-96 bg-linear-to-tl from-blue-400 to-transparent rounded-full blur-3xl opacity-25"
              animate={{
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
              }}
            />
          </div>

          <div className="relative z-10 text-center px-8 md:px-16 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-light tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
                Your smile transformation <span className="text-cyan-600 dark:text-cyan-400">starts here</span>
              </h2>

              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
                Join thousands of patients who've discovered the difference that world-class dental care can make. Your journey to a confident smile awaits.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <button className="px-8 py-4 bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white font-medium rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Book Your Consultation
                </button>
                <button className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300">
                  View Our Work
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative w-full bg-slate-950 dark:bg-black text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-light mb-4 text-white">OrthoLuxe</h3>
              <p className="text-slate-400 leading-relaxed">
                Premium dental care designed for the modern smile.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Cosmetic Dentistry
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Implants
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Orthodontics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Preventative Care
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Meet Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Contact</h4>
              <p className="text-slate-400 mb-2">hello@ortholuxe.com</p>
              <p className="text-slate-400 mb-4">(555) SMILE-01</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-600 flex items-center justify-center transition">
                  f
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-600 flex items-center justify-center transition">
                  𝕏
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-600 flex items-center justify-center transition">
                  📷
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2025 OrthoLuxe Dental. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
