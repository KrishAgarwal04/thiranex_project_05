import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Users, Briefcase, Sparkles, Building, Play } from 'lucide-react';

interface StatCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, suffix = '', duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <div ref={elementRef} className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 sm:text-4xl">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors pb-16">
      {/* Hero Banner header */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-sky-400 via-indigo-500 to-amber-400 py-20 text-white text-center">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-3xs" />
        <div className="relative mx-auto max-w-4xl px-4 flex flex-col items-center gap-4 animate-fadeUp">
          <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-3xs font-extrabold tracking-widest uppercase text-white shadow-3xs">
            ShopWave Co.
          </span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white">
            We are redefining virtual premium commerce
          </h1>
          <p className="max-w-xl text-xs sm:text-sm text-indigo-50 font-medium leading-relaxed">
            From handpicked curation to flawless transitions, study the creative standards that guide the digital engineering of the ShopWave Experience.
          </p>
        </div>
      </section>

      {/* Stats Board Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="rounded-2xl border border-gray-150/80 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-lg p-6 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col gap-2">
              <StatCounter end={10000} suffix="+" />
              <span className="text-3xs uppercase tracking-widest text-[#6B7280] dark:text-[#9CA3AF] font-bold">Products Curated</span>
            </div>
            <div className="flex flex-col gap-2">
              <StatCounter end={500000} suffix="+" />
              <span className="text-3xs uppercase tracking-widest text-[#6B7280] dark:text-[#9CA3AF] font-bold">Happy Shoppers</span>
            </div>
            <div className="flex flex-col gap-2">
              <StatCounter end={50} suffix="+" />
              <span className="text-3xs uppercase tracking-widest text-[#6B7280] dark:text-[#9CA3AF] font-bold">Elite Brands</span>
            </div>
            <div className="flex flex-col gap-2">
              <StatCounter end={4.8} suffix="★" />
              <span className="text-3xs uppercase tracking-widest text-[#6B7280] dark:text-[#9CA3AF] font-bold">Review Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5 animate-slideInLeft">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <Award className="h-5.5 w-5.5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-snug">
              Every curated detail is meticulously engineered for the absolute value of form.
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              Founded in 2024, our ultimate objective is to bypass cluttered screens and deliver structured, high-contrast, visually calming buyer routes. By prioritizing high-grade typography, organic spacing, and swift response engines, we recreate the tactile delight of elite boutique browsing online.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              We reject clunky frameworks and aggressive cookie traps. We build on logical layout coordinates, offering users durable client-side records, instant comparison panels, and safe, fluid checkout stages that just work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-white">Authenticity Assured</h4>
                  <p className="text-3xs text-gray-400 dark:text-gray-500 mt-0.5 leading-normal">Direct partnerships with approved brand factories only.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Users className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-white">Customer-Centric Support</h4>
                  <p className="text-3xs text-gray-400 dark:text-gray-500 mt-0.5 leading-normal">Bespoke 24/7 client relations assistance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphical side panel / Seed image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-4/3 border border-gray-150 dark:border-gray-800 animate-slideInRight">
            <img 
              src="https://picsum.photos/seed/shopwavehq/800/600" 
              alt="Design hq studio" 
              className="w-full h-full object-cover transition-transform hover:scale-103 duration-500"
            />
            {/* Ambient Overlay card */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl glass-card bg-white/90 dark:bg-black/60 p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </div>
                <div>
                  <h5 className="text-2xs font-bold text-gray-900 dark:text-white">Inside Our Studios</h5>
                  <p className="text-3xs text-gray-400">See how custom components are rendered (2:14)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styled Mission Clause Blockquote */}
      <section className="bg-gray-100/50 dark:bg-[#1a1a1a]/40 border-y border-gray-150/70 dark:border-gray-900 py-16 mt-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <blockquote className="font-sans text-lg sm:text-xl font-medium tracking-tight text-gray-800 dark:text-gray-200 italic leading-relaxed">
            "We believe elegant design is not an luxury add-on, but the primary baseline of structural respect for our customers' time and consciousness."
          </blockquote>
          <div className="mt-4 text-3xs uppercase tracking-widest font-extrabold text-indigo-500">
            — ShopWave Design Thesis
          </div>
        </div>
      </section>

      {/* Teammates section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-3xs font-extrabold text-indigo-500 uppercase tracking-widest block mb-1">Our Leadership</span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Meet the architects</h2>
          <p className="text-xs text-gray-400 mt-1.5 leading-normal">
            Top-tier executives with combined centuries of engineering and digital product experience.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Kushal Dev', role: 'Chief UI/UX Architect', seed: 'architect' },
            { name: 'Sameer Sen', role: 'VP Digital Engineering', seed: 'engineering' },
            { name: 'Neha Deshmukh', role: 'Director Brand Relations', seed: 'brandrep' },
            { name: 'Arjun Mehta', role: 'Head of Global Logistics', seed: 'logistics' },
          ].map((member, id) => (
            <div 
              key={id} 
              className="rounded-xl border border-gray-100 dark:border-gray-800/60 bg-white dark:bg-[#1a1a1a] p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="mx-auto h-20 w-20 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800 mb-3 bg-gray-50">
                <img 
                  src={`https://picsum.photos/seed/${member.seed}/200/200`} 
                  alt={member.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{member.name}</h4>
              <p className="text-3xs text-gray-400 dark:text-gray-500 mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Career block */}
      <section className="mx-auto max-w-4xl px-4 mt-20">
        <div className="rounded-2xl bg-indigo-900/10 dark:bg-indigo-950/20 border border-indigo-400/25 p-8 text-center flex flex-col items-center gap-4">
          <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-indigo-500 text-white">
            <Briefcase className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-indigo-200">
            Do you share our passion for premium digital products?
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md leading-normal">
            We are always scouting for meticulous software developers, graphics craftsmen, and logistics managers. Join our high-contrast remote workplace today.
          </p>
          <button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-2xs font-semibold shadow-md active:scale-98 transition-all cursor-pointer">
            Explore Open Careers
          </button>
        </div>
      </section>
    </div>
  );
};
