"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BASE = "";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface Edition {
  year: string;
  title: string;
  date: string;
  note: string;
  upcoming?: boolean;
  href: string;
  external?: boolean;
}

const eventSeries = [
  {
    title: "Gala of Dreams",
    tag: "Gala",
    tagline: "An evening of elegance and inspiration celebrating AAPI excellence.",
    image: `${BASE}/images/events/gala-of-dreams.jpg`,
    description:
      "AAD\u2019s signature gala brings together industry pioneers, community leaders, and mission champions to celebrate milestones and empower emerging AAPI leaders.",
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
    ] as Edition[],
  },
  {
    title: "Table of Dreams",
    tag: "Benefit Dinner",
    tagline: "Celebrating community through culture and cuisine.",
    image: `${BASE}/images/events/table-of-dreams-2025-cover.jpeg`,
    description:
      "An intimate Giving Tuesday benefit dinner bringing the AAPI community together over cuisine that honors cultural traditions.",
    editions: [
      {
        year: "2025",
        title: "2025 Table of Dreams",
        date: "Giving Tuesday, 2025",
        note: "Raised $31,000 at Michelin Bib Gourmand-honored La D\u1ED3ng. Record-breaking evening championing the Kin Mentorship Program.",
        href: `${BASE}/events/2025-table-of-dreams`,
      },
      {
        year: "2024",
        title: "2024 Table of Dreams",
        date: "December 3, 2024",
        note: "Inaugural dinner at La D\u1ED3ng in NYC. Title sponsored by Mizuho Americas.",
        href: `${BASE}/events/table-of-dreams`,
      },
    ] as Edition[],
  },
  {
    title: "AAD Open",
    tag: "Tennis Fundraiser",
    tagline: "Where competition meets community on the court.",
    image: `${BASE}/images/events/event-1.jpg`,
    description:
      "AAD\u2019s annual tennis fundraiser brings together players of all levels for a day of doubles, community, and celebration.",
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
        note: "First-ever AAD Open at Chestnut Ridge Racquet Club. Andy Yu received the inaugural Asian American Dreamer award.",
        href: `${BASE}/events/2023-inaugural-aad-open`,
      },
    ] as Edition[],
  },
];

export default function EventsIndex() {
  const [activeSeries, setActiveSeries] = useState<number | null>(null);

  const toggleSeries = (index: number) => {
    setActiveSeries(activeSeries === index ? null : index);
  };

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px] px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={`${BASE}/images/logos/logo-black.png`}
              alt="Asian American Dream"
              width={140}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-inter font-medium text-[15px] text-dark-gray hover:text-deep-teal transition-colors"
            >
              Home
            </Link>
            <a
              href="https://givebutter.com/asianamericandream"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter font-semibold text-sm bg-warm-gold text-navy px-6 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Donate
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-[72px] bg-gradient-to-br from-navy via-deep-teal to-bright-turquoise">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-inter font-semibold text-xs tracking-[0.08em] uppercase text-bright-turquoise mb-3">
              Community Events
            </span>
            <h1 className="font-sora font-bold text-[36px] md:text-[52px] leading-[1.1] text-white mb-4">
              Where Connections Come to Life
            </h1>
            <p className="font-inter text-lg text-white/70 max-w-[600px]">
              From galas to benefit dinners to tennis fundraisers, our events bring the AAPI community together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Series */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            {eventSeries.map((series, index) => {
              const isActive = activeSeries === index;
              return (
                <motion.div
                  key={series.title}
                  variants={fadeUp}
                  className="flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => toggleSeries(index)}
                    className={`text-left bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 group border ${
                      isActive
                        ? "border-deep-teal ring-2 ring-deep-teal/15"
                        : "border-transparent"
                    }`}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
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
                    <div className="p-6">
                      <h2 className="font-sora font-semibold text-xl text-charcoal mb-2 group-hover:text-deep-teal transition-colors">
                        {series.title}
                      </h2>
                      <p className="font-inter text-sm text-dark-gray leading-relaxed mb-4">
                        {series.tagline}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-deep-teal">
                        {isActive ? "Show less" : "View editions"}
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
                  </button>

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
                          <p className="font-inter text-sm text-dark-gray leading-relaxed mb-5">
                            {series.description}
                          </p>

                          <div className="space-y-3">
                            {series.editions.map((edition) => (
                              <a
                                key={edition.year}
                                href={edition.href}
                                {...(edition.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className="flex items-start gap-3 p-3 rounded-2xl bg-off-white border border-light-gray hover:border-deep-teal/30 hover:bg-bright-turquoise/5 transition-all duration-200 group/edition"
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
                              </a>
                            ))}
                          </div>

                          {series.editions.some((e) => e.upcoming) && (
                            <div className="mt-4">
                              <a
                                href={series.editions.find((e) => e.upcoming)?.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-inter font-semibold text-sm bg-warm-gold text-navy px-6 py-3 rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                              >
                                Get Tickets
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-10">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-white/40">
            &copy; {new Date().getFullYear()} Asian American Dream. All rights reserved.
          </p>
          <p className="font-inter text-xs text-white/40">
            501(c)(3) Nonprofit Organization &middot; Tax ID: 87-1056467
          </p>
        </div>
      </footer>
    </>
  );
}
