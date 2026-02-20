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
import TreatmentsSlider from './components/TreatmentsSlider';

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track overall scroll progress (remover apos usar o scrollY)

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
      <GradientBackground scrollProgress={scrollYProgress.get()} />

      {/* Hero Section with 3D Tooth */}
      <section
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-cyan-100 to-cyan-600"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Background gradient layers */}
        <div className="absolute inset-0 bg-linear-to-b pointer-events-none" />

        {/* Subtle animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-200 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"
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
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-cyan-200 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"
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
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.div
              style={{
                scale: heroScale,
                opacity: heroOpacity,
              }}
              className="relative w-full h-full"
            >
              <ScrollToothPlayer scrollProgress={scrollYProgress} />
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
            <p className="text-xs text-slate-200 dark:text-slate-300 mb-2 uppercase tracking-widest">
              Scroll to explore
            </p>
            <svg
              className="w-5 h-5 mx-auto text-slate-200 dark:text-slate-300"
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


      {/* Services */}
      <section id='services' className="relative h-screen w-full flex justify-center items-center text-white mt-10 ">
        <div className='min-h-screen w-[85vw] flex flex-col 2xl:gap-16'>
          <div className='flex text-black justify-between h-52 items-center'>
            <div className='flex flex-col text-4xl 2xl:text-5xl font-extralight'>
              <span className='text-gray-500'>Available</span>
              <span className='text-black'>Treatments</span>
            </div>

            <div className='w-125 2xl:text-lg mt-8'>
              <p className='text-[#FE4900] text-xl uppercase tracking-widest'>Our services</p>
              <p className='mt-3'>At OrthoLuxe, we offer a wide range of treatments, from routine cleaning and fillings to advanced procedures like implants and cosmetic dentistry. Our goal is to provide personalized care for all your dental needs.</p>
            </div>
          </div>

          <TreatmentsSlider />
        </div>
      </section>

      <section className=" w-full mt-40 2xl:mt-15">
        <div className="relative h-[40vh] w-full bg-gradient-to-r from-white to-[#C0EDFF] overflow-visible flex items-center justify-center">
          <div className='mr-[600px] flex flex-col gap-5'>
            <p className='text-5xl 2xl:text-6xl font-extrabold text-[#04B5FF]'><span className='text-black mr-2 font-light'>Book</span> Free Consultation</p>
            <button className="h-16 w-44 rounded-full bg-[#FE4900] hover:bg-[#FE4900]/80 cursor-pointer transition backdrop-blur-md text-white text-sm font-light border border-white/30 uppercase tracking-widest ">
              Book now
            </button>
          </div>

          <img src="/tooth.png" alt="Tooth" className="absolute right-1 bottom-[-40px] w-[600px] 2xl:w-[860px]" />

        </div>
      </section>

      <section id='about' className='relative min-h-screen w-full flex justify-center text-white mt-10 '>
        <div className="h-full w-[85vw] flex flex-col ">
          <div className='flex text-black justify-between h-52 items-center'>
            <div className='flex flex-col text-4xl 2xl:text-5xl font-extralight'>
              <span className='text-gray-500'>About</span>
              <span className='text-black'><span className='text-cyan-600'>Ortho</span>Luxe</span>
            </div>

            <div className='w-125 2xl:text-lg mt-8'>
              <p className='text-[#FE4900] text-xl uppercase tracking-widest'>Our Vision</p>
              <p className='mt-3'>At OrthoLuxe, our vision is to blend advanced technology with compassionate care to create a welcoming space. We aim to inspire confident, healthy smiles through innovation and personalized treatment.</p>
            </div>
          </div>

          <div className='grid grid-cols-12  h-full w-full gap-x-5 gap-y-5 grid-rows-3 2xl:mt-24'>

            <div className="bg-gray-500 min-h-[180px] 2xl:min-h-[200px] col-span-6 2xl:col-span-5 2xl:col-start-2 row-span-2 rounded-3xl bg-center bg-cover shadow-xl" style={{ backgroundImage: `url('/dentalcare.png')` }}></div>

            <div className="bg-gray-500 min-h-[180px] row-span-3 col-span-3 rounded-3xl bg-center bg-cover shadow-xl"
              style={{ backgroundImage: `url('/dentureswoman.png')` }}></div>

            <div className="bg-gray-500 min-h-[180px] col-start-4 col-span-3  row-span-2 rounded-3xl bg-center bg-cover shadow-xl"
              style={{ backgroundImage: `url('/dentaltreatments.png')` }}></div>

            <div className="bg-gray-500 min-h-[200px] col-start-7 col-span-6 2xl:col-span-5 rounded-3xl bg-center bg-cover shadow-xl"
              style={{ backgroundImage: `url('/teethalignment.png')` }}
            > </div>
          </div>

        </div>
      </section>

      <section id='contact' className='relative min-h-screen flex justify-center items-center'>
        <div className='h-[90vh] w-[95vw] flex  bg-gradient-to-r from-[#E6E6E6] to-white  rounded-3xl overflow-hidden'>
          <div className="flex h-full w-full mx-36">
            <div className='w-1/2 h-full flex flex-col justify-center items-start gap-3 2xl:gap-5 text-sm 2xl:text-base'>
              <h1 className='text-black text-5xl 2xl:text-5xl font-bold  tracking-tight'><span className='text-gray-500 font-light'>Book</span> Appointment</h1>

              <div className='flex gap-5 mt-6 2xl:mt-10'>
                <input type="text" placeholder='YOUR NAME' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
                <input type="text" placeholder='CONTACT NO.' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
                <input type="text" />
              </div>

              <div className='flex gap-5'>
                <input type="text" placeholder='EMAIL ID' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
                <input type="text" placeholder='YOUR AGE' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
                <input type="text" />
              </div>

              <div className='flex flex-col gap-5'>
                <input type="text" placeholder='SELECT SERVICES' className='uppercase tracking-wide bg-white p-4 2xl:p-5  rounded-full text-gray-800 w-130' />
                <input type="text" placeholder='SELECT CLINIC' className='uppercase tracking-wide bg-white p-4 2xl:p-5  rounded-full text-gray-800 w-130' />
              </div>

              <div className='flex gap-5'>
                <input type="date" placeholder='SELECT DATE' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
                <input type="time" placeholder='SELECT TIME' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
              </div>
              <button className="2xl:h-16 h-14 2xl:w-72 w-52 rounded-full mt-4 bg-[#FE4900] hover:bg-[#FE4900]/80 cursor-pointer transition backdrop-blur-md text-white text-sm font-light border border-white/30 uppercase tracking-widest ">
                Book Appointment
              </button>
            </div>

            <div className='w-1/2 h-full flex justify-center items-center'>
              <img src="mao.png" alt="Mao" className="max-w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex flex-col items-center overflow-hidden">

        <div className="w-full overflow-hidden">
          <div className="flex animate-marquee min-w-max justify-center items-center">
            <h1 className="text-[7rem] 2xl:text-[10rem] text-[#55CFFE] font-black scale-y-[1.2] tracking-tight px-10 whitespace-nowrap">
              ORTHOLUXE HEALTH VENTURES
            </h1>

            <h1 className="text-[8rem] 2xl:text-[10rem] text-[#55cefec7] font-black scale-y-[1.2] tracking-tight px-10 whitespace-nowrap">
              ORTHOLUXE HEALTH VENTURES
            </h1>
          </div>
        </div>

        {/* CARD */}
        <div className="
    w-[90vw] md:w-[90vw]
    2xl:h-[70vh] h-[66vh]
    bg-gradient-to-r
    from-[#C0EDFF]
    to-white
    rounded-2xl
  " />

      </section>




    </div>
  );
}
