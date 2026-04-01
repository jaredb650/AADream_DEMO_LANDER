"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const BASE = process.env.NODE_ENV === "production" ? "/AADream_DEMO_LANDER" : "";

/* ─── Shared Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Enhanced Animation Variants ─── */
const blurFadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const widerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function SectionWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Floating Decorative Orb ─── */
function FloatingOrb({
  className,
  delay = 0,
  duration = 6,
  size = 200,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  size?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -20, 0, 15, 0],
        x: [0, 10, 0, -8, 0],
        scale: [1, 1.05, 1, 0.97, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── Section Heading with blur-to-sharp reveal ─── */
function SectionHeading({
  tag,
  title,
  description,
  light = false,
}: {
  tag: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <motion.div variants={blurFadeUp} className="text-center mb-14">
      <span
        className={`inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase mb-3 ${
          light ? "text-bright-turquoise" : "text-deep-teal"
        }`}
      >
        {tag}
      </span>
      <h2
        className={`font-sora font-semibold text-[28px] md:text-[42px] leading-[1.2] tracking-[-0.01em] ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`font-inter text-base md:text-lg max-w-3xl mx-auto mt-4 leading-relaxed ${
            light ? "text-white/70" : "text-dark-gray"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* ─── 1. Preloader ─── */
function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 1600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy"
      exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <Image
          src={`${BASE}/images/logos/logo-white.png`}
          alt="Asian American Dream"
          width={220}
          height={80}
          className="mx-auto mb-4"
          priority
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-0.5 bg-bright-turquoise mt-4 mx-auto rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── 2. Navigation ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], [0, 0.92]);
  const navBlur = useTransform(scrollY, [0, 80], [0, 20]);
  const navShadow = useTransform(scrollY, [0, 80], [0, 0.06]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Team", href: "#team" },
    { label: "Events", href: "#community" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled
          ? `rgba(255,255,255,${navBg.get()})`
          : "transparent",
        backdropFilter: scrolled ? `blur(${navBlur.get()}px)` : "none",
        boxShadow: scrolled
          ? `0 1px 12px rgba(0,0,0,${navShadow.get()})`
          : "none",
        transition: "background-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px] px-5 md:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src={scrolled ? `${BASE}/images/logos/logo-black.png` : `${BASE}/images/logos/logo-white.png`}
            alt="Asian American Dream"
            width={140}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              className={`font-inter font-medium text-[15px] transition-colors relative group ${
                scrolled
                  ? "text-dark-gray hover:text-deep-teal"
                  : "text-white/90 hover:text-white"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-bright-turquoise transition-all duration-300 group-hover:w-full rounded-full" />
            </motion.a>
          ))}
          <motion.a
            href="https://givebutter.com/asianamericandream"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter font-semibold text-sm bg-warm-gold text-navy px-6 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Donate
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? "bg-navy" : "bg-white"
            } ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? "bg-navy" : "bg-white"
            } ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? "bg-navy" : "bg-white"
            } ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-light-gray overflow-hidden"
          >
            <div className="px-5 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-inter font-medium text-dark-gray text-lg"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://givebutter.com/asianamericandream"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="font-inter font-semibold text-sm bg-warm-gold text-navy px-6 py-3 rounded-full text-center mt-2"
              >
                Donate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── 3. Hero ─── */
function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.9]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed hero group photo with parallax zoom */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image
          src={`${BASE}/images/hero-group.jpg`}
          alt="Asian American Dream community group photo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/30"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/20" />
      </motion.div>

      {/* Floating decorative orbs */}
      <FloatingOrb
        className="bg-bright-turquoise/10 blur-3xl -top-20 -right-20"
        size={300}
        delay={0}
        duration={8}
      />
      <FloatingOrb
        className="bg-deep-teal/10 blur-3xl bottom-20 -left-16"
        size={250}
        delay={2}
        duration={7}
      />

      <motion.div
        className="max-w-[1200px] mx-auto px-5 md:px-8 w-full py-16 md:py-24 relative z-10 pt-[120px]"
        style={{ y: textY }}
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-bright-turquoise mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Building Community Since 2021
            </motion.span>
            <motion.h1
              className="font-sora font-bold text-[40px] md:text-[64px] leading-[1.1] tracking-[-0.02em] text-white mb-6"
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Empowering AAPI Undergraduates to Dream{" "}
              <motion.span
                className="text-bright-turquoise inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Fearlessly
              </motion.span>
            </motion.h1>
            <motion.p
              className="font-inter text-lg md:text-xl text-white/85 leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Mentorship, professional development, and career advancement for first-generation,
              low-income AAPI undergraduates in New York.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href="#programs"
                className="font-inter font-semibold text-base bg-white text-deep-teal px-8 py-3.5 rounded-full hover:bg-off-white hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Programs
              </motion.a>
              <motion.a
                href="#donate"
                className="font-inter font-semibold text-base bg-warm-gold text-navy px-8 py-3.5 rounded-full hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Donate
              </motion.a>
              <motion.a
                href="mailto:kevin@asianamericandream.org?subject=Partnership%20Inquiry"
                className="font-inter font-semibold text-base bg-white/10 backdrop-blur-sm text-white border border-white/25 px-8 py-3.5 rounded-full hover:bg-white/20 hover:border-white/50 hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Partner With Us
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Floating community faces strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {["jack-tran", "james-cheng", "jason-huang", "kevin-ha", "jennifer-young"].map(
                (name, i) => (
                  <motion.div
                    key={name}
                    className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative"
                    initial={{ opacity: 0, scale: 0.5, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={`${BASE}/images/team/${name}.jpg`}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </motion.div>
                )
              )}
            </div>
            <div>
              <p className="font-sora font-bold text-white text-sm">150+ Students Empowered</p>
              <p className="font-inter text-xs text-white/70">Join our growing community</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/80"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── 4. About / Mission ─── */
const whyItMattersSlides = [
  {
    stat: "11x",
    label: "Income Disparity",
    description:
      "The top 10% of AAPI earners make 11 times the bottom 10% \u2014 the largest income disparity of any racial group in the United States. We exist to change this.",
  },
  {
    stat: "72%",
    label: "Overlooked in Leadership",
    description:
      "Despite being the fastest-growing racial group in the U.S., AAPIs hold only 2% of Fortune 500 CEO positions. Our programs build the pipeline for the next generation of AAPI leaders.",
  },
  {
    stat: "1 in 4",
    label: "First-Generation Challenges",
    description:
      "Nearly 1 in 4 AAPI students are first-generation college students navigating higher education without family guidance. AAD provides the mentorship and community they need to thrive.",
  },
];

function About() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % whyItMattersSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative orbs */}
      <FloatingOrb
        className="bg-bright-turquoise/5 blur-3xl -top-32 right-0"
        size={400}
        delay={1}
        duration={10}
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        <SectionWrapper>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left - Story */}
            <div>
              <motion.span
                variants={slideFromLeft}
                className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-deep-teal mb-3"
              >
                Our Mission
              </motion.span>
              <motion.h2
                variants={blurFadeUp}
                className="font-sora font-semibold text-[28px] md:text-[42px] leading-[1.2] tracking-[-0.01em] text-charcoal mb-6"
              >
                Bridging the Gap for AAPI Communities
              </motion.h2>
              <motion.p variants={fadeUp} className="font-inter text-base md:text-lg text-dark-gray leading-relaxed mb-5">
                Founded in May 2021, our mission is to provide mentorship networks, professional
                development training, and career advancement opportunities for underserved AAPI
                undergraduates, with the goal of helping them achieve their unique vision of the
                Asian American dream.
              </motion.p>
              <motion.p variants={fadeUp} className="font-inter text-base md:text-lg text-dark-gray leading-relaxed">
                First-generation, low-income AAPI undergraduates in New York face unique challenges
                in accessing mentorship and career opportunities. We provide the community, guidance,
                and resources needed to transform aspirations into achievements.
              </motion.p>
            </div>

            {/* Right - Stat callout carousel */}
            <motion.div variants={slideFromRight}>
              <motion.div
                className="bg-off-white rounded-3xl p-8 md:p-10 relative overflow-hidden"
                whileHover={{ boxShadow: "0 12px 40px rgba(26,107,122,0.12)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={`${BASE}/images/events/event-1.jpg`}
                    alt="AADream community event"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <span className="font-inter font-semibold text-xs tracking-[0.08em] uppercase text-deep-teal mb-4 block">
                  Why It Matters
                </span>
                <div className="relative min-h-[200px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="font-sora font-bold text-6xl md:text-7xl text-deep-teal">
                          {whyItMattersSlides[activeSlide].stat}
                        </span>
                      </div>
                      <p className="font-inter text-lg md:text-xl text-charcoal font-medium mb-3">
                        {whyItMattersSlides[activeSlide].label}
                      </p>
                      <p className="font-inter text-base text-dark-gray leading-relaxed">
                        {whyItMattersSlides[activeSlide].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Progress bar for carousel */}
                <div className="mt-6 flex items-center gap-3">
                  {whyItMattersSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className="relative rounded-full overflow-hidden transition-all duration-300"
                      style={{
                        width: i === activeSlide ? 32 : 8,
                        height: 8,
                        backgroundColor: i === activeSlide ? "transparent" : "rgba(26,107,122,0.3)",
                      }}
                    >
                      {i === activeSlide && (
                        <>
                          <span className="absolute inset-0 rounded-full bg-deep-teal/20" />
                          <motion.span
                            className="absolute inset-0 rounded-full bg-bright-turquoise origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 5, ease: "linear" }}
                            key={`progress-${activeSlide}`}
                          />
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}

/* ─── 5. Programs ─── */
const programData = [
  {
    title: "Kin Mentorship Program",
    tagline:
      "Empowering under-resourced AAPI undergraduates through career-centric, community-rooted mentorship.",
    description:
      "AAD's signature program stewards a supportive community for 250 AAPI undergraduates and 250 AAPI professionals in New York.",
    details:
      "Through strategic partnerships with leading ERGs, the program illuminates roads to career success and dismantles the model minority myth by empowering community, belonging, and boundless confidence.",
    highlights: [
      "1:1 mentorship for AAPI undergraduates in New York",
      "Community-rooted support with career-focused guidance",
      "Built alongside leading employee resource groups and partners",
    ],
    partners:
      "Amazon, American Express, Bank of America, Capri, Citi, Deloitte, Google, JPMorgan Chase, KKR, LinkedIn, McKinsey, Meta, Microsoft, Mizuho, National Grid, Skadden, Warburg Pincus, Wells Fargo, Zimmer Biomet",
    image: `${BASE}/images/programs/program-1.jpg`,
  },
  {
    title: "AAPI Creator Incubator",
    tagline: "Empowering the next generation of AAPI creators.",
    description:
      "The AAPI Creator Incubator is a 5-month fellowship for NYC-based AAPI undergraduates pursuing a career in content creation.",
    details:
      "Fellows receive a catalytic $2,500 grant, 1:1 mentorship from an established creator, and monthly workshop dinners focused on brand strategy, viral production, and monetization.",
    highlights: [
      "5-month fellowship for NYC-based AAPI undergraduates",
      "$2,500 catalytic grant",
      "Creator mentorship plus monthly workshop dinners",
    ],
    image: `${BASE}/images/programs/program-2.jpg`,
  },
  {
    title: "Thriving AANHPI Leadership Accelerator",
    tagline:
      "Empowering AANHPI students to lead, thrive, and succeed on their own terms.",
    description:
      "TALA is a career and leadership development program that supports economic mobility and holistic wellbeing for underrepresented Asian American, Native Hawaiian, and Pacific Islander college students in the NYC and SF Bay Areas.",
    details:
      "Designed for students ages 18 to 25 who are first-generation to college and/or low-income, the program offers a $1,000 stipend, exclusive swag, culturally relevant leadership training, mentorship, community care, networking opportunities, and social events.",
    highlights: [
      "Supports economic mobility and holistic wellbeing",
      "$1,000 stipend, mentorship, and culturally relevant training",
      "Built for first-generation and/or low-income AANHPI students ages 18 to 25",
    ],
    partners: "Facilitated in partnership with TAAF and APALI.",
    image: `${BASE}/images/programs/program-3.jpg`,
  },
];

function Programs() {
  const [activeProgram, setActiveProgram] = useState<number | null>(null);

  const toggleProgram = (index: number) => {
    setActiveProgram(activeProgram === index ? null : index);
  };

  return (
    <section id="programs" className="py-16 md:py-24 bg-off-white relative overflow-hidden">
      <FloatingOrb
        className="bg-deep-teal/5 blur-3xl -bottom-20 -left-20"
        size={350}
        delay={0.5}
        duration={9}
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        <SectionWrapper>
          <SectionHeading
            tag="What We Do"
            title="Our Programs"
            description="Three programs designed to support AAPI undergraduates at every stage of their professional journey. Click any program to learn more."
          />

          <motion.div className="grid md:grid-cols-3 gap-6" variants={widerStagger}>
            {programData.map((p, index) => {
              const isActive = activeProgram === index;
              return (
                <motion.div
                  key={p.title}
                  variants={cardReveal}
                  className="flex flex-col"
                >
                  <motion.button
                    type="button"
                    onClick={() => toggleProgram(index)}
                    className={`text-left bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 group border ${
                      isActive
                        ? "border-deep-teal ring-2 ring-deep-teal/15"
                        : "border-transparent"
                    }`}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-7">
                      <h3 className="font-sora font-semibold text-xl md:text-2xl text-charcoal mb-3">
                        {p.title}
                      </h3>
                      <p className="font-inter text-base text-dark-gray leading-relaxed mb-4">
                        {p.tagline}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-deep-teal">
                        {isActive ? "Show less" : "View details"}
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </span>
                    </div>
                  </motion.button>

                  {/* Inline expanded details */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-3xl bg-white p-6 shadow-[0_8px_32px_rgba(15,42,68,0.08)] border border-light-gray">
                          <p className="font-inter text-base text-dark-gray leading-relaxed mb-3">
                            {p.description}
                          </p>
                          <p className="font-inter text-base text-dark-gray leading-relaxed mb-5">
                            {p.details}
                          </p>

                          <div className="space-y-2 mb-5">
                            {p.highlights.map((highlight, hi) => (
                              <motion.div
                                key={highlight}
                                className="flex items-start gap-2.5"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + hi * 0.08, duration: 0.4 }}
                              >
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-bright-turquoise" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-inter text-sm text-dark-gray leading-relaxed">
                                  {highlight}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          {p.partners ? (
                            <p className="font-inter text-xs text-dark-gray mb-5 bg-off-white rounded-xl px-4 py-3 border border-light-gray">
                              <span className="font-semibold text-deep-teal uppercase tracking-wider">Partners: </span>
                              {p.partners}
                            </p>
                          ) : null}

                          <div className="flex flex-wrap gap-3">
                            <motion.a
                              href="#donate"
                              className="font-inter font-semibold text-sm border-2 border-deep-teal text-deep-teal px-6 py-3 rounded-full hover:bg-deep-teal hover:text-white transition-all duration-300"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              Support This Program
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Program gallery strip */}
          <motion.div variants={fadeUp} className="mt-10 grid grid-cols-5 gap-3">
            {[4, 5, 6, 7, 8].map((n) => (
              <motion.div
                key={n}
                className="relative aspect-square rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={`${BASE}/images/programs/program-${n}.jpg`}
                  alt={`Program activity ${n}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 20vw, 200px"
                />
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>
      </div>
    </section>
  );
}

/* ─── 6. Impact Stats ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 150, suffix: "+", label: "Students Mentored" },
  { value: 50, suffix: "+", label: "Active Mentors" },
  { value: 20, suffix: "+", label: "University Partners" },
  { value: 95, suffix: "%", label: "Recommend to Peers" },
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const particles = useRef<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; r: number; alpha: number; drift: number; phase: number; speed: number }[]>([]);
  const raf = useRef<number>(0);
  const trail = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const w = () => canvas.width / window.devicePixelRatio;
    const h = () => canvas.height / window.devicePixelRatio;

    // Initialize particles
    const count = 120;
    particles.current = Array.from({ length: count }, () => {
      const x = Math.random() * w();
      const y = Math.random() * h();
      return {
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        r: 1.2 + Math.random() * 2,
        alpha: 0.08 + Math.random() * 0.2,
        drift: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.5,
      };
    });

    let time = 0;

    const draw = () => {
      time += 0.008;
      const W = w();
      const H = h();
      ctx.clearRect(0, 0, W, H);

      // Ambient glow blobs
      const g1 = ctx.createRadialGradient(W * 0.3, H * 0.2, 0, W * 0.3, H * 0.2, W * 0.35);
      g1.addColorStop(0, "rgba(26,107,122,0.06)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W * 0.75, H * 0.7, 0, W * 0.75, H * 0.7, W * 0.3);
      g2.addColorStop(0, "rgba(59,168,212,0.04)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Update trail
      trail.current = trail.current
        .map((t) => ({ ...t, age: t.age + 1 }))
        .filter((t) => t.age < 40);

      // Draw trail (fading ripple marks)
      for (const t of trail.current) {
        const fade = 1 - t.age / 40;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 2 + (1 - fade) * 20, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,168,212,${fade * 0.06})`;
        ctx.fill();
      }

      // Cursor glow
      const mx = mouse.current.x;
      const my = mouse.current.y;
      if (mx > -500) {
        const cg = ctx.createRadialGradient(mx, my, 0, mx, my, 140);
        cg.addColorStop(0, "rgba(59,168,212,0.15)");
        cg.addColorStop(0.4, "rgba(26,107,122,0.06)");
        cg.addColorStop(1, "transparent");
        ctx.fillStyle = cg;
        ctx.fillRect(0, 0, W, H);
      }

      // Particles
      for (const p of particles.current) {
        // Gentle floating drift
        p.drift += p.speed * 0.01;
        const floatX = Math.sin(p.drift + p.phase) * 12;
        const floatY = Math.cos(p.drift * 0.7 + p.phase) * 8 + time * p.speed * 15;

        // Falling: wrap around when past bottom
        let targetY = p.baseY + floatY;
        if (targetY > H + 20) {
          p.baseY -= H + 40;
          targetY = p.baseY + floatY;
        }

        const targetX = p.baseX + floatX;

        // Cursor repulsion + attraction
        if (mx > -500) {
          const dx = targetX - mx;
          const dy = targetY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 120;
          if (dist < radius) {
            const force = (1 - dist / radius) * 3;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Apply velocity with damping
        p.x += (targetX - p.x) * 0.04 + p.vx;
        p.y += (targetY - p.y) * 0.04 + p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Distance to cursor for glow
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distM = Math.sqrt(dxm * dxm + dym * dym);
        const glow = mx > -500 ? Math.max(0, 1 - distM / 150) : 0;

        const r = p.r + glow * 3;
        const alpha = p.alpha + glow * 0.6;

        // Draw particle
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5);
        pg.addColorStop(0, `rgba(59,168,212,${alpha})`);
        pg.addColorStop(0.5, `rgba(26,107,122,${alpha * 0.4})`);
        pg.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,245,${alpha * 0.7})`;
        ctx.fill();

        // Connection lines between nearby particles
        if (glow > 0.1) {
          for (const p2 of particles.current) {
            if (p2 === p) continue;
            const dd = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (dd < 80) {
              const lineAlpha = (1 - dd / 80) * glow * 0.15;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(59,168,212,${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouse.current = { x, y };
    trail.current.push({ x, y, age: 0 });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouse.current = { x: -1000, y: -1000 }; }}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
}

function Impact() {
  return (
    <section className="py-16 md:py-24 bg-navy relative overflow-hidden">
      <ParticleCanvas />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        <SectionWrapper>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-bright-turquoise mb-3">
              Our Impact
            </span>
            <h2 className="font-sora font-semibold text-[28px] md:text-[42px] leading-[1.2] tracking-[-0.01em] text-white">
              Making a Real Difference
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10"
              >
                <p className="font-sora font-bold text-3xl md:text-4xl text-white mb-2">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="font-inter text-sm md:text-base text-white/70">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}

/* ─── 7. Team - Board, Advisory & AADream Team with Real Photos ─── */
const boardMembers = [
  { name: "Jack Tran", role: "Chair", title: "Strategy & Product Management, American Express", bio: "Fintech professional in Strategy and Product Management at American Express. Previously at CVS Health and consulting firms EY and PwC. Board member of ACE NextGen New York.", image: `${BASE}/images/team/jack-tran.jpg` },
  { name: "James Cheng", role: "Vice-Chair", title: "Global Senior Director of DEI, Zimmer Biomet", bio: "Global Senior Director and Head of Diversity, Equity, and Inclusion at Zimmer Biomet. Previously held leadership roles in inclusion and diversity at Gilead Sciences and Cargill.", image: `${BASE}/images/team/james-cheng.jpg` },
  { name: "Jason Huang", role: "Treasurer", title: "Financial Advisor, Oppenheimer Co.", bio: "Financial Advisor at Oppenheimer Co. Inc. Certified Financial Planner since 2024. Eagle Scout Award recipient with 400+ hours of volunteer service.", image: `${BASE}/images/team/jason-huang.jpg` },
  { name: "Andrew Pandolfo", role: "Secretary", title: "", bio: "", image: `${BASE}/images/team/andrew-pandolfo.jpg` },
  { name: "Kevin Ha", role: "Founder & Executive Director", title: "2024-2025 Obama USA Leader", bio: "Founder and Executive Director of Asian American Dream. Selected as 2024-2025 Obama USA Leader and 2024 Fellow by The EGF Accelerator. Previously worked in Markets Group at Federal Reserve Bank of New York.", image: `${BASE}/images/team/kevin-ha.jpg` },
  { name: "Carteneil Cheung", role: "Director", title: "Associate General Counsel, McKinsey & Company", bio: "Associate General Counsel at McKinsey & Company. Corporate attorney with experience at Paul, Weiss and Sidley Austin. Specializes in mergers, acquisitions, and strategic investments.", image: `${BASE}/images/team/carteneil-cheung.jpg` },
  { name: "Jocelyn Cruz-Alfalla", role: "Director", title: "Dir. of Community & Schools Tennis, USTA Eastern", bio: "Director of Community and Schools Tennis at USTA Eastern managing grassroots grant programs. Previously Assistant Athletic Director at Marymount School. 18+ years in organizational development.", image: `${BASE}/images/team/jocelyn-cruz-alfalla.png` },
  { name: "Roger Kim", role: "Director", title: "Managing Director, Societe Generale", bio: "Managing Director and head of Structuring and Solutions for fixed income division at Societe Generale. Prior roles at Deutsche Bank Korea and Morgan Stanley Korea. Stanford University graduate.", image: `${BASE}/images/team/roger-kim.jpg` },
  { name: "James Liao", role: "Director", title: "President, Salem Consultants Inc.", bio: "President of Salem Consultants Inc. Teacher at Chang Gung University in Taiwan. Director and former Board President of Flushing Town Hall.", image: `${BASE}/images/team/james-liao.jpg` },
  { name: "Kevin Vuong", role: "Director", title: "SVP Global Store & Workplace Experience, Capri Holdings", bio: "Licensed architect and SVP of Global Store & Workplace Experience for Capri Holdings (Versace, Jimmy Choo, Michael Kors). Architecture degrees from UC Berkeley.", image: `${BASE}/images/team/kevin-vuong.jpg` },
  { name: "Yuko Yates", role: "Director", title: "SVP Business Support Executive, Bank of America Legal", bio: "Senior Vice President at Bank of America Legal Department leading business strategy initiatives. Co-chair of Bank of America Asian Leadership Network New York.", image: `${BASE}/images/team/yuko-yates.jpg` },
  { name: "Jennifer Young", role: "Director", title: "Senior Principal, Google Cloud", bio: "Senior Principal at Google Cloud on Global Strategic Missions & Partnerships. Previously led M&A at Soci\u00e9t\u00e9 BIC and worked in investment banking at Evercore.", image: `${BASE}/images/team/jennifer-young.jpg` },
];

const advisoryMembers = [
  { name: "Alex Chester-Iwata", title: "Founder, Mixed Asian Media", bio: "Award-winning performer, writer, and cultural advocate with 35+ years in entertainment. Founder of Mixed Asian Media and Mixed Asian Day\u2122.", image: `${BASE}/images/team/alex-chester-iwata.jpg` },
  { name: "Timothy Fong", title: "Senior Systems Specialist, Warburg Pincus", bio: "Senior Systems Specialist at Warburg Pincus with 9+ years implementing enterprise systems. Focused on mentorship and creating pathways for early-career professionals.", image: `${BASE}/images/team/timothy-fong.jpg` },
  { name: "Esther Kim", title: "Program Manager, Microsoft Azure", bio: "Program Manager at Microsoft in Azure Customer Reliability Engineering. Chair of Microsoft Asians of New York.", image: `${BASE}/images/team/esther-kim.jpg` },
  { name: "Jerry Lee", title: "Co-Founder, Wonsulting", bio: "Co-Founder of Wonsulting and ex-Senior Strategy & Operations Manager at Google. 3M+ followers across social platforms.", image: `${BASE}/images/team/jerry-lee.jpg` },
  { name: "Dawn Lucovich", title: "Founding Faculty, University of Nagano", bio: "Founding faculty member at University of Nagano. Previously taught at Columbia University and NYU. Specializes in change management and organizational leadership.", image: `${BASE}/images/team/dawn-lucovich.jpg` },
  { name: "Rhea Mahajan", title: "CPA, SASB FSA Level II", bio: "CPA and SASB FSA Level II certified professional with expertise in development, social impact, and consulting. Drove meaningful change as Development Account Manager at APIA Scholars and Social Innovation Officer at Smart City Expo USA. At APCO Impact, advised foundations and corporations on financial inclusion, ESG, philanthropy, and DEI initiatives. Also a skilled media host with over 4 million views across South Asian platforms.", image: `${BASE}/images/team/rhea-mahajan.jpg` },
  { name: "Alicia Underwood", title: "Founder, TwentyThree LLC", bio: "Founder of TwentyThree, LLC, a digital communications and influencer marketing agency. 15 years of experience in social media strategy and brand storytelling. Leads strategy, creative, and execution across social media, paid media, and influencer marketing. Also building The Social Box, a software platform for influencer marketing workflows.", image: `${BASE}/images/team/alicia-underwood.jpg` },
  { name: "Christopher Won", title: "Educator & Community Advocate", bio: "Educator, advocate, and designer with over fifteen years of experience in community development, creative learning, and organizational management.", image: `${BASE}/images/team/christopher-won.jpeg` },
  { name: "Douglas York", title: "Chair, Advisory Council", bio: "Retiree with over 38 years of utility industry experience at National Grid. Led teams in IT, Finance, Operations Performance, and Sales. Former Chairperson for the Asian Leadership Association ERG. Currently on the Board of Directors for NAAAP New York and planning committee for the NAAAP STEP Mentorship program. Former AAD Board member for 3 years, now Chairperson for the Advisory Council.", image: `${BASE}/images/team/douglas-york.jpg` },
];

const aadreamTeam = [
  { name: "Mohina Abdullaeva", role: "Director of Partnerships", bio: "Junior at Baruch College, CUNY, pursuing a degree in Computer Information Systems with a Minor in Economics. Background in the business industry through startup involvement and volunteering at cultural non-profits. Originally from Central Asia.", image: `${BASE}/images/team/mohina-abdullaeva.jpg` },
  { name: "Jaclyn Eng", role: "Program Coordinator", bio: "Native New Yorker working in management consulting. Bachelor's degree in Psychology and master's in Data Analytics and Applied Social Research from Queens College, CUNY. Previous experience supporting dual-enrollment programs and college access initiatives.", image: `${BASE}/images/team/jaclyn-eng.jpg` },
  { name: "Kevin Ha", role: "Executive Director", bio: "Founder and Executive Director of Asian American Dream. Selected as 2024-2025 Obama USA Leader and 2024 Fellow by The EGF Accelerator. Previously worked in Markets Group at Federal Reserve Bank of New York.", image: `${BASE}/images/team/kevin-ha.jpg` },
  { name: "Josh Minsup Kim", role: "Program Coordinator", bio: "In GTM & Product at MindStudio, a No/Lo-Code AI Agent platform. Previously Data Insights & Analytics Consultant at Kantar. A proud Third Culture Kid with roots in both Seoul and New York, passionate about empowering Asian American professionals.", image: `${BASE}/images/team/josh-minsup-kim.png` },
  { name: "Perry Leong", role: "Co-Director of Community", bio: "Senior Product Marketing Manager at Microsoft working on Azure cloud infrastructure. Combination of software engineering and technical marketing experience. Born and raised in the SF Bay Area, living in Manhattan since 2023.", image: `${BASE}/images/team/perry-leong.jpg` },
  { name: "Ed Shen", role: "Program Coordinator", bio: "Portfolio manager at BlackRock, managing multi-asset portfolios. Also moonlights as a DJ and events organizer, coordinating programming for plur.nyc and Subtle Asian Mates.", image: `${BASE}/images/team/ed-shen.jpg` },
  { name: "Shirley Tan", role: "Program Coordinator", bio: "Born in China, grew up in North Carolina. Business Analyst at McKinsey & Company spanning across industries with a focus on Consumer & Retail. Led connectivity across New York and North America for Asians at McKinsey.", image: `${BASE}/images/team/shirley-tan.jpg` },
  { name: "Sarah Yoo", role: "Co-Director of Community", bio: "Strategy & Business Operations Associate at LinkedIn. Previously part of the Strategy Practice at EY-Parthenon. With roots in both Boston and Seoul, passionate about building community for Asian American professionals in New York.", image: `${BASE}/images/team/sarah-yoo.jpg` },
];

/* ─── Team Member Card with enhanced hover ─── */
function TeamMemberCard({
  member,
  selectedPerson,
  togglePerson,
  personKey,
  ringColor = "bright-turquoise",
  size = "md",
  showRole = true,
}: {
  member: { name: string; role?: string; title?: string; bio: string; image: string };
  selectedPerson: string | null;
  togglePerson: (name: string) => void;
  personKey: string;
  ringColor?: string;
  size?: "sm" | "md";
  showRole?: boolean;
}) {
  const sizeClasses = size === "md"
    ? "w-24 h-24 md:w-28 md:h-28"
    : "w-20 h-20 md:w-24 md:h-24";
  const ringWidth = size === "md" ? "ring-3" : "ring-2";

  return (
    <motion.div
      variants={scaleIn}
      className="flex flex-col items-center"
    >
      <button
        type="button"
        onClick={() => member.bio ? togglePerson(personKey) : undefined}
        className={`flex flex-col items-center group ${member.bio ? "cursor-pointer" : "cursor-default"}`}
      >
        <motion.div
          className={`${sizeClasses} rounded-full overflow-hidden shadow-lg ${ringWidth} ring-${ringColor}/20 relative`}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 8px 30px rgba(26,107,122,0.2)",
          }}
          animate={selectedPerson === personKey ? {
            boxShadow: "0 0 0 3px rgba(79,209,199,0.5)",
          } : {}}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="112px"
          />
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <p className="font-inter font-medium text-sm text-charcoal mt-3 text-center">{member.name}</p>
        {showRole && member.role && (
          <p className="font-inter text-xs text-deep-teal font-medium">{member.role}</p>
        )}
        {!showRole && <p className="font-inter text-xs text-dark-gray">Advisory</p>}
        {member.title && <p className="font-inter text-[11px] text-dark-gray mt-0.5 text-center max-w-[140px]">{member.title}</p>}
      </button>
      <AnimatePresence>
        {selectedPerson === personKey && member.bio && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-inter text-xs text-dark-gray leading-relaxed mt-2 text-center max-w-[200px] bg-off-white rounded-xl px-3 py-2 border border-light-gray">
              {member.bio}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Team() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const togglePerson = (name: string) => {
    setSelectedPerson(selectedPerson === name ? null : name);
  };

  return (
    <section id="team" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <FloatingOrb
        className="bg-warm-gold/5 blur-3xl top-1/4 -right-20"
        size={300}
        delay={1.5}
        duration={8}
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        <SectionWrapper>
          <SectionHeading
            tag="Our Community"
            title="Meet the People Behind the Dream"
          />

          {/* Board Members - Circular portraits */}
          <motion.div variants={fadeUp}>
            <motion.h3
              className="font-sora font-semibold text-xl text-charcoal text-center mb-8"
              variants={blurFadeUp}
            >
              Board of Directors
            </motion.h3>
            <motion.div
              className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16"
              variants={widerStagger}
            >
              {boardMembers.map((m) => (
                <TeamMemberCard
                  key={m.name}
                  member={m}
                  selectedPerson={selectedPerson}
                  togglePerson={togglePerson}
                  personKey={m.name}
                  ringColor="bright-turquoise"
                  size="md"
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Advisory Board */}
          <motion.div variants={fadeUp}>
            <motion.h3
              className="font-sora font-semibold text-xl text-charcoal text-center mb-8"
              variants={blurFadeUp}
            >
              Advisory Board
            </motion.h3>
            <motion.div
              className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16"
              variants={widerStagger}
            >
              {advisoryMembers.map((m) => (
                <TeamMemberCard
                  key={m.name}
                  member={m}
                  selectedPerson={selectedPerson}
                  togglePerson={togglePerson}
                  personKey={`advisory-${m.name}`}
                  ringColor="warm-gold"
                  size="sm"
                  showRole={false}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* AADream Team */}
          <motion.div variants={fadeUp}>
            <motion.h3
              className="font-sora font-semibold text-xl text-charcoal text-center mb-8"
              variants={blurFadeUp}
            >
              AADream Team
            </motion.h3>
            <motion.div
              className="flex flex-wrap justify-center gap-6 md:gap-8"
              variants={widerStagger}
            >
              {aadreamTeam.map((m) => (
                <TeamMemberCard
                  key={m.name}
                  member={m}
                  selectedPerson={selectedPerson}
                  togglePerson={togglePerson}
                  personKey={`team-${m.name}`}
                  ringColor="bright-turquoise"
                  size="sm"
                />
              ))}
            </motion.div>
          </motion.div>
        </SectionWrapper>
      </div>
    </section>
  );
}

/* ─── 8. Community Events ─── */
interface EventEdition {
  year: string;
  title: string;
  date: string;
  note: string;
  upcoming?: boolean;
  href: string;
  external?: boolean;
}

const eventSeries: { title: string; tag: string; tagline: string; image: string; description: string; editions: EventEdition[] }[] = [
  {
    title: "Gala of Dreams",
    tag: "Gala",
    tagline: "An evening of elegance and inspiration celebrating AAPI excellence.",
    image: `${BASE}/images/events/gala-of-dreams.png`,
    description:
      "AAD's signature gala brings together industry pioneers, community leaders, and mission champions to celebrate milestones and empower emerging AAPI leaders through a curated multi-floor experience.",
    editions: [
      {
        year: "2026",
        title: "Inaugural Gala of Dreams",
        date: "May 19, 2026",
        note: "Celebrating 5 years of impact at Glasshouse Chelsea, NYC. Formal evening attire.",
        upcoming: true,
        href: "https://givebutter.com/c/galaofdreams",
        external: true,
      },
    ],
  },
  {
    title: "Table of Dreams",
    tag: "Benefit Dinner",
    tagline: "Celebrating community through culture and cuisine.",
    image: `${BASE}/images/events/event-2.jpg`,
    description:
      "An intimate Giving Tuesday benefit dinner bringing the AAPI community together over cuisine that honors our cultural traditions.",
    editions: [
      {
        year: "2024",
        title: "2024 Table of Dreams",
        date: "December 3, 2024",
        note: "Inaugural dinner at La D\u1ED3ng in NYC, featuring authentic Vietnamese cuisine. Title sponsored by Mizuho Americas.",
        href: `${BASE}/events/table-of-dreams`,
      },
    ],
  },
  {
    title: "AAD Open",
    tag: "Tennis Fundraiser",
    tagline: "Where competition meets community on the court.",
    image: `${BASE}/images/events/event-1.jpg`,
    description:
      "AAD's annual tennis fundraiser brings together players of all levels for a day of doubles tennis, community, and celebration — with all proceeds supporting AAPI mentorship programs.",
    editions: [
      {
        year: "2025",
        title: "2025 AAD Open",
        date: "June 7, 2025",
        note: "Record 84 players, $14,988 raised. Sponsored by Capri Holdings, Happy Tuna, NYC Racquet Sports, and USTA Eastern.",
        href: `${BASE}/events/2025-aad-open`,
      },
      {
        year: "2024",
        title: "2024 AAD Open",
        date: "June 8, 2024",
        note: "Held at USTA Billie Jean King National Tennis Center. Jocelyn Cruz-Alfalla received the Asian American Dreamer award.",
        href: `${BASE}/events/2024-aad-open`,
      },
      {
        year: "2023",
        title: "2023 Inaugural AAD Open",
        date: "August 19, 2023",
        note: "The first-ever AAD Open at Chestnut Ridge Racquet Club. Andy Yu received the inaugural Asian American Dreamer award.",
        href: `${BASE}/events/2023-inaugural-aad-open`,
      },
    ],
  },
];

function Community() {
  const [activeSeries, setActiveSeries] = useState<number | null>(null);

  const toggleSeries = (index: number) => {
    setActiveSeries(activeSeries === index ? null : index);
  };

  return (
    <section id="community" className="py-16 md:py-24 bg-off-white relative overflow-hidden">
      <FloatingOrb
        className="bg-bright-turquoise/5 blur-3xl top-10 -left-16"
        size={280}
        delay={0.8}
        duration={9}
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        <SectionWrapper>
          <SectionHeading
            tag="Community Events"
            title="Where Connections Come to Life"
            description="From galas to benefit dinners to tennis fundraisers, our events bring the AAPI community together. Click any event to learn more."
          />

          <motion.div className="grid md:grid-cols-3 gap-6" variants={widerStagger}>
            {eventSeries.map((series, index) => {
              const isActive = activeSeries === index;
              return (
                <motion.div
                  key={series.title}
                  variants={cardReveal}
                  className="flex flex-col"
                >
                  <motion.button
                    type="button"
                    onClick={() => toggleSeries(index)}
                    className={`text-left bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 group border ${
                      isActive
                        ? "border-deep-teal ring-2 ring-deep-teal/15"
                        : "border-transparent"
                    }`}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={series.image}
                        alt={series.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 font-inter text-[11px] font-semibold tracking-wider uppercase bg-white/90 text-deep-teal px-3 py-1 rounded-full">
                        {series.tag}
                      </span>
                    </div>
                    <div className="p-7">
                      <h3 className="font-sora font-semibold text-xl md:text-2xl text-charcoal mb-3">
                        {series.title}
                      </h3>
                      <p className="font-inter text-base text-dark-gray leading-relaxed mb-4">
                        {series.tagline}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-deep-teal">
                        {isActive ? "Show less" : "View details"}
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </span>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-3xl bg-white p-6 shadow-[0_8px_32px_rgba(15,42,68,0.08)] border border-light-gray">
                          <p className="font-inter text-base text-dark-gray leading-relaxed mb-5">
                            {series.description}
                          </p>

                          <div className="space-y-3">
                            {series.editions.map((edition, ei) => (
                              <motion.a
                                key={edition.year}
                                href={edition.href}
                                {...(edition.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className="flex items-start gap-3 p-3 rounded-2xl bg-off-white border border-light-gray hover:border-deep-teal/30 hover:bg-bright-turquoise/5 transition-all duration-200 group/edition"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: ei * 0.1, duration: 0.3 }}
                              >
                                <span className={`flex-shrink-0 font-sora font-bold text-xs px-2.5 py-1 rounded-full ${
                                  edition.upcoming
                                    ? "bg-warm-gold text-navy"
                                    : "bg-deep-teal/10 text-deep-teal"
                                }`}>
                                  {edition.upcoming ? "UPCOMING" : edition.year}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-inter font-semibold text-sm text-charcoal group-hover/edition:text-deep-teal transition-colors">
                                    {edition.title}
                                  </p>
                                  <p className="font-inter text-xs text-deep-teal mt-0.5">{edition.date}</p>
                                  <p className="font-inter text-xs text-dark-gray mt-1 leading-relaxed">{edition.note}</p>
                                </div>
                                <svg className="w-4 h-4 mt-1 flex-shrink-0 text-dark-gray group-hover/edition:text-deep-teal group-hover/edition:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                              </motion.a>
                            ))}
                          </div>

                          {series.editions.some((e) => e.upcoming) && (
                            <div className="mt-4">
                              <motion.a
                                href={series.editions.find((e) => e.upcoming)?.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-inter font-semibold text-sm bg-warm-gold text-navy px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                                whileHover={{ y: -2, scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                Get Tickets
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </motion.a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </SectionWrapper>
      </div>
    </section>
  );
}

/* ─── 9. Photo Mosaic Banner ─── */
function PhotoBanner() {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <SectionWrapper>
        <motion.div variants={fadeUp} className="flex gap-3 md:gap-4 justify-center flex-wrap">
          {boardMembers.slice(0, 8).map((m, i) => (
            <motion.div
              key={m.name}
              variants={fadeUp}
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md"
              style={{ rotate: `${(i % 2 === 0 ? 1 : -1) * (3 + i)}deg` }}
              whileHover={{ scale: 1.15, rotate: 0, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={m.image}
                alt={m.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.div>
          ))}
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-bright-turquoise/20 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <span className="font-sora font-bold text-deep-teal text-sm md:text-base">+10</span>
          </motion.div>
        </motion.div>
      </SectionWrapper>
    </section>
  );
}

/* ─── 10. Final CTA ─── */
function CTA() {
  const ctaRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ctaRef}
      id="donate"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background with parallax image */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src={`${BASE}/images/events/event-2.jpg`}
          alt=""
          fill
          className="object-cover scale-120"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/90 via-bright-turquoise/80 to-deep-teal/90" />
      </motion.div>

      <div className="max-w-[800px] mx-auto px-5 md:px-8 text-center relative z-10">
        <SectionWrapper className="flex flex-col items-center">
          <motion.span
            variants={blurFadeUp}
            className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-white/80 mb-3"
          >
            Join the Movement
          </motion.span>
          <motion.h2
            variants={blurFadeUp}
            className="font-sora font-bold text-[28px] md:text-[48px] leading-[1.15] tracking-[-0.01em] text-white mb-6"
          >
            Help Us Build the Next Generation of AAPI Leaders
          </motion.h2>
          <motion.p variants={fadeUp} className="font-inter text-lg text-white/85 leading-relaxed mb-10 max-w-lg">
            Your support provides mentorship, resources, and pathways for first-generation AAPI
            students to achieve their dreams.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            {/* Pulsing glow donate button */}
            <motion.div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-warm-gold/40"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.a
                href="https://givebutter.com/asianamericandream"
                target="_blank"
                rel="noopener noreferrer"
                className="relative font-inter font-semibold text-base bg-warm-gold text-navy px-10 py-4 rounded-full hover:shadow-xl transition-all duration-300 inline-block"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Donate Now
              </motion.a>
            </motion.div>
            <motion.a
              href="#programs"
              className="font-inter font-semibold text-base bg-white/15 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-4 rounded-full hover:bg-white/25 transition-all duration-300"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Involved
            </motion.a>
          </motion.div>
        </SectionWrapper>
      </div>
    </section>
  );
}

/* ─── 11. Footer ─── */
function Footer() {
  return (
    <footer className="bg-navy py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src={`${BASE}/images/logos/logo-white.png`}
              alt="Asian American Dream"
              width={160}
              height={56}
              className="h-12 w-auto mb-4"
            />
            <p className="font-inter text-sm text-white/60 leading-relaxed max-w-sm">
              Empowering first-generation, low-income AAPI undergraduates in New York through
              mentorship, professional development, and career advancement.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About", href: "#about" },
                { label: "Programs", href: "#programs" },
                { label: "Team", href: "#team" },
                { label: "Events", href: "#community" },
                { label: "Donate", href: "#donate" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-inter text-sm text-white/60 hover:text-bright-turquoise transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/company/asianamericandream"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-bright-turquoise/20 hover:text-bright-turquoise transition-all duration-300"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/the_asianamericandream/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-bright-turquoise/20 hover:text-bright-turquoise transition-all duration-300"
                aria-label="Instagram"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </motion.a>
            </div>
            <a
              href="mailto:info@asianamericandream.org"
              className="inline-flex items-center gap-2 font-inter text-sm text-white/60 hover:text-bright-turquoise transition-colors duration-300 mt-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              info@asianamericandream.org
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-white/40">
            &copy; {new Date().getFullYear()} Asian American Dream. All rights reserved.
          </p>
          <p className="font-inter text-xs text-white/40">
            501(c)(3) Nonprofit Organization &middot; Tax ID: 87-1056467
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── 12. GiveButter Contact Widget ─── */
function GiveButterContact() {
  const scriptLoadedRef = useRef(false);

  const ensureScript = useCallback(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    const gb = window as unknown as Record<string, unknown>;
    gb.Givebutter = gb.Givebutter || function (...args: unknown[]) {
      ((gb.Givebutter as Record<string, unknown[]>).q =
        (gb.Givebutter as Record<string, unknown[]>).q || []).push(args);
    };
    (gb.Givebutter as Record<string, unknown>).l = +new Date();
    (gb.Givebutter as Function)("setOptions", {
      accountId: "x9CtBILjd14unxn0",
    });

    const script = document.createElement("script");
    script.src = "https://widgets.givebutter.com/latest.umd.cjs?acct=x9CtBILjd14unxn0&p=other";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("gb-popup-shown");
    if (!hasVisited) {
      const timer = setTimeout(() => {
        ensureScript();
        sessionStorage.setItem("gb-popup-shown", "true");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [ensureScript]);

  return (
    <div id="gb-widget-mount" dangerouslySetInnerHTML={{ __html: '<givebutter-widget id="LYGJ8p"></givebutter-widget>' }} />
  );
}

/* ─── Main Page ─── */
export default function CommunityPage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Navbar />
        <Hero />
        <About />
        <Programs />
        <Impact />
        <Team />
        <Community />
        <PhotoBanner />
        <CTA />
        <Footer />
        <GiveButterContact />
      </motion.div>
    </>
  );
}
