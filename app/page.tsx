"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
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
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-inter font-medium text-[15px] transition-colors relative group ${
                scrolled
                  ? "text-dark-gray hover:text-deep-teal"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-bright-turquoise transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
          <a
            href="#donate"
            className="font-inter font-semibold text-sm bg-warm-gold text-navy px-6 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Donate
          </a>
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
                href="#donate"
                onClick={() => setMobileOpen(false)}
                className="font-inter font-semibold text-sm bg-warm-gold text-navy px-6 py-3 rounded-full text-center mt-2"
              >
                Donate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── 3. Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed hero group photo */}
      <div className="absolute inset-0">
        <Image
          src={`${BASE}/images/hero-group.jpg`}
          alt="Asian American Dream community group photo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/20" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 w-full py-16 md:py-24 relative z-10 pt-[120px]">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-bright-turquoise mb-4">
              Building Community Since 2021
            </span>
            <h1 className="font-sora font-bold text-[40px] md:text-[64px] leading-[1.1] tracking-[-0.02em] text-white mb-6">
              Empowering AAPI Undergraduates to Dream{" "}
              <span className="text-bright-turquoise">Fearlessly</span>
            </h1>
            <p className="font-inter text-lg md:text-xl text-white/85 leading-relaxed mb-8 max-w-lg">
              Mentorship, professional development, and career advancement for first-generation,
              low-income AAPI undergraduates in New York.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#programs"
                className="font-inter font-semibold text-base bg-white text-deep-teal px-8 py-3.5 rounded-full hover:bg-off-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                Explore Programs
              </a>
              <a
                href="#donate"
                className="font-inter font-semibold text-base bg-warm-gold text-navy px-8 py-3.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                Donate
              </a>
              <button
                type="button"
                aria-disabled="true"
                className="font-inter font-semibold text-base bg-white/10 backdrop-blur-sm text-white border border-white/25 px-8 py-3.5 rounded-full hover:bg-white/15 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                Partner With Us
              </button>
            </div>
          </motion.div>

          {/* Floating community faces strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {["jack-tran", "james-cheng", "jason-huang", "kevin-ha", "jennifer-young"].map(
                (name) => (
                  <div
                    key={name}
                    className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative"
                  >
                    <Image
                      src={`${BASE}/images/team/${name}.jpg`}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                )
              )}
            </div>
            <div>
              <p className="font-sora font-bold text-white text-sm">150+ Students Empowered</p>
              <p className="font-inter text-xs text-white/70">Join our growing community</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. About / Mission ─── */
function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionWrapper>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left - Story */}
            <div>
              <motion.span
                variants={fadeUp}
                className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-deep-teal mb-3"
              >
                Our Mission
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-sora font-semibold text-[28px] md:text-[42px] leading-[1.2] tracking-[-0.01em] text-charcoal mb-6"
              >
                Bridging the Gap for AAPI Communities
              </motion.h2>
              <motion.p variants={fadeUp} className="font-inter text-base md:text-lg text-dark-gray leading-relaxed mb-5">
                Founded in May 2021, Asian American Dream was born from the recognition that
                first-generation, low-income AAPI undergraduates in New York face unique challenges
                in accessing mentorship and career opportunities.
              </motion.p>
              <motion.p variants={fadeUp} className="font-inter text-base md:text-lg text-dark-gray leading-relaxed">
                We provide the community, guidance, and resources needed to transform aspirations into
                achievements - connecting students with mentors, professional development, and career
                pathways.
              </motion.p>
            </div>

            {/* Right - Stat callout with event photo */}
            <motion.div variants={fadeUp}>
              <div className="bg-off-white rounded-3xl p-8 md:p-10 relative overflow-hidden">
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
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-sora font-bold text-6xl md:text-7xl text-deep-teal">11x</span>
                </div>
                <p className="font-inter text-lg md:text-xl text-charcoal font-medium mb-3">
                  Income Disparity
                </p>
                <p className="font-inter text-base text-dark-gray leading-relaxed">
                  The top 10% of AAPI earners make 11 times the bottom 10% - the largest income
                  disparity of any racial group in the United States. We exist to change this.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-bright-turquoise" />
                  <div className="w-2 h-2 rounded-full bg-deep-teal" />
                  <div className="w-2 h-2 rounded-full bg-warm-gold" />
                </div>
              </div>
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
    applicationHref:
      "https://forms.office.com/pages/responsepage.aspx?id=t5piMQcNikilfZtYTEzdYGqD7xouP-FPrxhl8w0vvghUMzBRQzlGUElMNEtDSUoyMFFQREszUlVVSi4u&route=shorturl",
    applicationLabel: "2026 Application",
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
    applicationHref: "https://forms.office.com/r/Atqkget5qy",
    applicationLabel: "2026 Application",
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
  const [activeProgram, setActiveProgram] = useState(0);
  const selectedProgram = programData[activeProgram];

  return (
    <section id="programs" className="py-16 md:py-24 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionWrapper>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-deep-teal mb-3">
              What We Do
            </span>
            <h2 className="font-sora font-semibold text-[28px] md:text-[42px] leading-[1.2] tracking-[-0.01em] text-charcoal">
              Our Programs
            </h2>
            <p className="font-inter text-base md:text-lg text-dark-gray max-w-3xl mx-auto mt-4 leading-relaxed">
              Explore the three programs currently featured on AAD&apos;s live site. Each one
              expands with more detail, and active application links are included where available.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {programData.map((p, index) => (
              <motion.button
                key={p.title}
                type="button"
                onClick={() => setActiveProgram(index)}
                variants={fadeUp}
                className={`text-left bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 group border ${
                  activeProgram === index
                    ? "border-deep-teal ring-2 ring-deep-teal/15"
                    : "border-transparent"
                }`}
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
                  <p className="font-inter text-xs font-semibold tracking-[0.08em] uppercase text-deep-teal mb-3">
                    Click to expand
                  </p>
                  <h3 className="font-sora font-semibold text-xl md:text-2xl text-charcoal mb-3">
                    {p.title}
                  </h3>
                  <p className="font-inter text-base text-dark-gray leading-relaxed mb-4">
                    {p.tagline}
                  </p>
                  <span className="font-inter text-sm font-semibold text-deep-teal">
                    {activeProgram === index ? "Expanded below" : "View details"}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={selectedProgram.title}
            variants={fadeUp}
            className="mt-8 rounded-[32px] bg-white p-6 md:p-8 shadow-[0_12px_40px_rgba(15,42,68,0.08)] border border-white/80"
          >
            <div className="grid lg:grid-cols-[1.1fr_1.3fr] gap-8 md:gap-10 items-start">
              <div>
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden">
                  <Image
                    src={selectedProgram.image}
                    alt={selectedProgram.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>

              <div>
                <span className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-deep-teal mb-3">
                  Program Details
                </span>
                <h3 className="font-sora font-semibold text-[26px] md:text-[36px] leading-[1.15] text-charcoal mb-4">
                  {selectedProgram.title}
                </h3>
                <p className="font-inter text-lg text-charcoal font-medium leading-relaxed mb-4">
                  {selectedProgram.tagline}
                </p>
                <p className="font-inter text-base md:text-lg text-dark-gray leading-relaxed mb-4">
                  {selectedProgram.description}
                </p>
                <p className="font-inter text-base md:text-lg text-dark-gray leading-relaxed mb-6">
                  {selectedProgram.details}
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                  {selectedProgram.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-2xl bg-off-white px-4 py-4 font-inter text-sm text-dark-gray leading-relaxed border border-light-gray"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>

                {selectedProgram.partners ? (
                  <div className="rounded-2xl bg-navy/[0.03] border border-navy/10 px-5 py-4 mb-6">
                    <p className="font-inter text-xs font-semibold tracking-[0.08em] uppercase text-deep-teal mb-2">
                      Partners
                    </p>
                    <p className="font-inter text-sm md:text-base text-dark-gray leading-relaxed">
                      {selectedProgram.partners}
                    </p>
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-4">
                  {selectedProgram.applicationHref ? (
                    <a
                      href={selectedProgram.applicationHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter font-semibold text-base bg-deep-teal text-white px-7 py-3.5 rounded-full hover:bg-navy hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                    >
                      {selectedProgram.applicationLabel}
                    </a>
                  ) : null}
                  <a
                    href="#donate"
                    className="font-inter font-semibold text-base border-2 border-deep-teal text-deep-teal px-7 py-3.5 rounded-full hover:bg-deep-teal hover:text-white transition-all duration-300"
                  >
                    Support This Program
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Program gallery strip */}
          <motion.div variants={fadeUp} className="mt-10 grid grid-cols-5 gap-3">
            {[4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={`${BASE}/images/programs/program-${n}.jpg`}
                  alt={`Program activity ${n}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 20vw, 200px"
                />
              </div>
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

function Impact() {
  return (
    <section className="py-16 md:py-24 bg-navy relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-bright-turquoise/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-deep-teal/10 blur-3xl" />
      </div>

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

/* ─── 7. Team - Board & Advisory with Real Photos ─── */
const boardMembers = [
  { name: "Jack Tran", role: "Chair", image: `${BASE}/images/team/jack-tran.jpg` },
  { name: "James Cheng", role: "Vice-Chair", image: `${BASE}/images/team/james-cheng.jpg` },
  { name: "Jason Huang", role: "Treasurer", image: `${BASE}/images/team/jason-huang.jpg` },
  { name: "Andrew Pandolfo", role: "Secretary", image: `${BASE}/images/team/andrew-pandolfo.jpg` },
  { name: "Kevin Ha", role: "Director", image: `${BASE}/images/team/kevin-ha.jpg` },
  { name: "Carteneil Cheung", role: "Director", image: `${BASE}/images/team/carteneil-cheung.jpg` },
  { name: "Jocelyn Cruz-Alfalla", role: "Director", image: `${BASE}/images/team/jocelyn-cruz-alfalla.png` },
  { name: "Roger Kim", role: "Director", image: `${BASE}/images/team/roger-kim.jpg` },
  { name: "James Liao", role: "Director", image: `${BASE}/images/team/james-liao.jpg` },
  { name: "Kevin Vuong", role: "Director", image: `${BASE}/images/team/kevin-vuong.jpg` },
  { name: "Yuko Yates", role: "Director", image: `${BASE}/images/team/yuko-yates.jpg` },
  { name: "Jennifer Young", role: "Director", image: `${BASE}/images/team/jennifer-young.jpg` },
];

const advisoryMembers = [
  { name: "Alex Chester-Iwata", image: `${BASE}/images/team/alex-chester-iwata.jpg` },
  { name: "Timothy Fong", image: `${BASE}/images/team/timothy-fong.jpg` },
  { name: "Esther Kim", image: `${BASE}/images/team/esther-kim.jpg` },
  { name: "Jerry Lee", image: `${BASE}/images/team/jerry-lee.jpg` },
  { name: "Dawn Lucovich", image: `${BASE}/images/team/dawn-lucovich.jpg` },
  { name: "Rhea Mahajan", image: `${BASE}/images/team/rhea-mahajan.jpg` },
];

function Team() {
  return (
    <section id="team" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionWrapper>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-deep-teal mb-3">
              Our Community
            </span>
            <h2 className="font-sora font-semibold text-[28px] md:text-[42px] leading-[1.2] tracking-[-0.01em] text-charcoal">
              Meet the People Behind the Dream
            </h2>
          </motion.div>

          {/* Board Members - Circular portraits */}
          <motion.div variants={fadeUp}>
            <h3 className="font-sora font-semibold text-xl text-charcoal text-center mb-8">
              Board of Directors
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
              {boardMembers.map((m) => (
                <motion.div
                  key={m.name}
                  variants={fadeUp}
                  className="flex flex-col items-center group"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 ring-3 ring-bright-turquoise/20 group-hover:ring-bright-turquoise/50 relative">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <p className="font-inter font-medium text-sm text-charcoal mt-3 text-center">{m.name}</p>
                  <p className="font-inter text-xs text-deep-teal font-medium">{m.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Advisory Board */}
          <motion.div variants={fadeUp}>
            <h3 className="font-sora font-semibold text-xl text-charcoal text-center mb-8">
              Advisory Board
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {advisoryMembers.map((m) => (
                <motion.div
                  key={m.name}
                  variants={fadeUp}
                  className="flex flex-col items-center group"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 ring-2 ring-warm-gold/20 group-hover:ring-warm-gold/50 relative">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <p className="font-inter font-medium text-sm text-charcoal mt-3 text-center">{m.name}</p>
                  <p className="font-inter text-xs text-dark-gray">Advisory</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SectionWrapper>
      </div>
    </section>
  );
}

/* ─── 8. Community Events + Testimonials ─── */
const testimonials = [
  {
    quote:
      "[Testimonial placeholder — awaiting real quote from program participant]",
    name: "[Name]",
    role: "[Role / Program Year]",
    avatar: `${BASE}/images/team/esther-kim.jpg`,
  },
  {
    quote:
      "[Testimonial placeholder — awaiting real quote from program participant]",
    name: "[Name]",
    role: "[Role / Program Year]",
    avatar: `${BASE}/images/team/timothy-fong.jpg`,
  },
  {
    quote:
      "[Testimonial placeholder — awaiting real quote from program participant]",
    name: "[Name]",
    role: "[Role / Program Year]",
    avatar: `${BASE}/images/team/rhea-mahajan.jpg`,
  },
];

function Community() {
  return (
    <section id="community" className="py-16 md:py-24 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionWrapper>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-deep-teal mb-3">
              Community Events
            </span>
            <h2 className="font-sora font-semibold text-[28px] md:text-[42px] leading-[1.2] tracking-[-0.01em] text-charcoal">
              Where Connections Come to Life
            </h2>
          </motion.div>

          {/* Event photo gallery */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-4 mb-16">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="relative aspect-[3/2] rounded-2xl overflow-hidden group"
              >
                <Image
                  src={`${BASE}/images/events/event-${n}.jpg`}
                  alt={`AADream event ${n}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h3 className="font-sora font-semibold text-xl md:text-2xl text-charcoal">
              Voices from Our Community
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-3xl p-7 md:p-8 relative shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                {/* Quote mark */}
                <svg
                  className="w-10 h-10 text-bright-turquoise/30 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>
                <p className="font-inter text-base text-dark-gray leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden relative">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-sm text-charcoal">{t.name}</p>
                    <p className="font-inter text-xs text-dark-gray">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-bright-turquoise/20 flex items-center justify-center">
            <span className="font-sora font-bold text-deep-teal text-sm md:text-base">+10</span>
          </div>
        </motion.div>
      </SectionWrapper>
    </section>
  );
}

/* ─── 10. Final CTA ─── */
function CTA() {
  return (
    <section
      id="donate"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background with event image */}
      <div className="absolute inset-0">
        <Image
          src={`${BASE}/images/events/event-2.jpg`}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/90 via-bright-turquoise/80 to-deep-teal/90" />
      </div>

      <div className="max-w-[800px] mx-auto px-5 md:px-8 text-center relative z-10">
        <SectionWrapper className="flex flex-col items-center">
          <motion.span
            variants={fadeUp}
            className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-white/80 mb-3"
          >
            Join the Movement
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-sora font-bold text-[28px] md:text-[48px] leading-[1.15] tracking-[-0.01em] text-white mb-6"
          >
            Help Us Build the Next Generation of AAPI Leaders
          </motion.h2>
          <motion.p variants={fadeUp} className="font-inter text-lg text-white/85 leading-relaxed mb-10 max-w-lg">
            Your support provides mentorship, resources, and pathways for first-generation AAPI
            students to achieve their dreams.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <a
              href="https://givebutter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter font-semibold text-base bg-warm-gold text-navy px-10 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            >
              Donate Now
            </a>
            <a
              href="#programs"
              className="font-inter font-semibold text-base bg-white/15 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-4 rounded-full hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Involved
            </a>
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
              {["About", "Programs", "Team", "Events", "Donate"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="font-inter text-sm text-white/60 hover:text-bright-turquoise transition-colors duration-300"
                  >
                    {l}
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
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-bright-turquoise/20 hover:text-bright-turquoise hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-bright-turquoise/20 hover:text-bright-turquoise hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
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
      </motion.div>
    </>
  );
}
