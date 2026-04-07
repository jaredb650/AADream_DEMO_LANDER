"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BASE = "";

export interface EventPageProps {
  title: string;
  date: string;
  tag: string;
  heroImage: string;
  children: React.ReactNode;
}

export default function EventLayout({ title, date, tag, heroImage, children }: EventPageProps) {
  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px] px-5 md:px-8">
          <Link href="/" aria-label="Home" className="flex items-center gap-2">
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
              href="/events"
              className="font-inter font-medium text-[15px] text-dark-gray hover:text-deep-teal transition-colors"
            >
              All Events
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

      {/* Hero */}
      <section className="relative pt-[72px]">
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-inter text-[11px] font-semibold tracking-wider uppercase bg-white/90 text-deep-teal px-3 py-1 rounded-full mb-3">
                {tag}
              </span>
              <h1 className="font-sora font-bold text-[32px] md:text-[48px] leading-[1.1] text-white mb-2">
                {title}
              </h1>
              <p className="font-inter text-sm text-white/80">{date}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-[800px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose-aad"
        >
          {children}
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-light-gray"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-inter font-semibold text-sm text-deep-teal hover:text-bright-turquoise transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to all events
          </Link>
        </motion.div>
      </main>

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

export function PhotoGallery({ images }: { images: string[] }) {
  return (
    <>
      <h2>Photo Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i % 3 * 0.1 }}
            className="relative aspect-[4/3] rounded-xl overflow-hidden group"
          >
            <Image
              src={src}
              alt={`Event photo ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}

export function ResultsTable({ flights }: { flights: { name: string; champions: string; finalists: string }[] }) {
  return (
    <div className="rounded-2xl border border-light-gray overflow-hidden my-6">
      <table className="w-full">
        <caption className="sr-only">Tournament Results</caption>
        <thead>
          <tr className="bg-off-white">
            <th scope="col" className="font-inter font-semibold text-xs tracking-wider uppercase text-deep-teal text-left px-5 py-3">Flight</th>
            <th scope="col" className="font-inter font-semibold text-xs tracking-wider uppercase text-deep-teal text-left px-5 py-3">Champions</th>
            <th scope="col" className="font-inter font-semibold text-xs tracking-wider uppercase text-deep-teal text-left px-5 py-3">Finalists</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <tr key={f.name} className="border-t border-light-gray">
              <td scope="row" className="font-inter font-medium text-sm text-charcoal px-5 py-3">{f.name}</td>
              <td className="font-inter text-sm text-dark-gray px-5 py-3">{f.champions}</td>
              <td className="font-inter text-sm text-dark-gray px-5 py-3">{f.finalists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
