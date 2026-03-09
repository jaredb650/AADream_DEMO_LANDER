"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BASE = process.env.NODE_ENV === "production" ? "/AADream_DEMO_LANDER" : "";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const events = [
  {
    title: "2025 AAD Open",
    date: "June 7, 2025",
    description:
      "The third annual tennis fundraiser drew a record 84 players and raised $14,988. Sponsored by Capri Holdings, Happy Tuna, NYC Racquet Sports, and USTA Eastern.",
    image: `${BASE}/images/events/event-1.jpg`,
    href: `${BASE}/events/2025-aad-open`,
    tag: "Fundraiser",
  },
  {
    title: "2024 Table of Dreams",
    date: "December 3, 2024",
    description:
      "AAD\u2019s inaugural Giving Tuesday benefit dinner at La D\u1ED3ng in NYC, celebrating community through Vietnamese cuisine. Title sponsored by Mizuho Americas.",
    image: `${BASE}/images/events/event-2.jpg`,
    href: `${BASE}/events/table-of-dreams`,
    tag: "Benefit Dinner",
  },
  {
    title: "2024 AAD Open",
    date: "June 8, 2024",
    description:
      "Second annual tennis fundraiser at USTA Billie Jean King National Tennis Center. Jocelyn Cruz-Alfalla received the Asian American Dreamer award.",
    image: `${BASE}/images/events/event-3.jpg`,
    href: `${BASE}/events/2024-aad-open`,
    tag: "Fundraiser",
  },
  {
    title: "2023 Inaugural AAD Open",
    date: "August 19, 2023",
    description:
      "The first-ever AAD Open at Chestnut Ridge Racquet Club featured a doubles tennis tournament and afterparty presented by Mo\u00EBt Hennessy. Andy Yu received the inaugural Asian American Dreamer award.",
    image: `${BASE}/images/events/event-1.jpg`,
    href: `${BASE}/events/2023-inaugural-aad-open`,
    tag: "Fundraiser",
  },
];

export default function EventsIndex() {
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
              From tennis fundraisers to benefit dinners, our events bring the AAPI community together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-8"
          >
            {events.map((event) => (
              <motion.a
                key={event.title}
                href={event.href}
                variants={fadeUp}
                className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-inter text-[11px] font-semibold tracking-wider uppercase bg-white/90 text-deep-teal px-3 py-1 rounded-full">
                    {event.tag}
                  </span>
                </div>
                <div className="p-6">
                  <p className="font-inter text-xs font-medium text-deep-teal mb-2">
                    {event.date}
                  </p>
                  <h2 className="font-sora font-semibold text-xl text-charcoal mb-2 group-hover:text-deep-teal transition-colors">
                    {event.title}
                  </h2>
                  <p className="font-inter text-sm text-dark-gray leading-relaxed mb-4">
                    {event.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-deep-teal">
                    Read more
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </motion.a>
            ))}
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
