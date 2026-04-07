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
            href="https://givebutter.com/c/galaofdreams"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter font-semibold text-sm bg-warm-gold text-navy px-6 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Gala of Dreams
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
                href="https://givebutter.com/c/galaofdreams"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="font-inter font-semibold text-sm bg-warm-gold text-navy px-6 py-3 rounded-full text-center mt-2"
              >
                Gala of Dreams
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── 3. Hero ─── */

// Shared ripple mouse state between Hero and HeroBackground
const heroRippleMouse = { x: -1, y: -1 };

/* Grid glow canvas for mobile / fallback */
function HeroGridGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 50;
    const gridColor = "rgba(255, 255, 255, 0.06)";
    const glowColorOptions = ["#1A6B7A", "#3BA8D4", "#4FD1C7", "#0F2A44", "#C8EBF5"];
    let frameId: number;

    function createGlow() {
      const x = Math.floor(Math.random() * (canvas!.width / gridSize)) * gridSize;
      const y = Math.floor(Math.random() * (canvas!.height / gridSize)) * gridSize;
      const glow = {
        x, y, targetX: x, targetY: y,
        radius: Math.random() * 100 + 50,
        speed: Math.random() * 0.015 + 0.008,
        color: glowColorOptions[Math.floor(Math.random() * glowColorOptions.length)],
        alpha: 0,
        setNewTarget() { this.targetX = Math.floor(Math.random() * (canvas!.width / gridSize)) * gridSize; this.targetY = Math.floor(Math.random() * (canvas!.height / gridSize)) * gridSize; },
        update() { this.x += (this.targetX - this.x) * this.speed; this.y += (this.targetY - this.y) * this.speed; if (Math.abs(this.targetX - this.x) < 1 && Math.abs(this.targetY - this.y) < 1) this.setNewTarget(); if (this.alpha < 1) this.alpha += 0.01; },
        draw() { ctx!.globalAlpha = this.alpha; const grad = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius); grad.addColorStop(0, this.color); grad.addColorStop(1, "transparent"); ctx!.fillStyle = grad; ctx!.beginPath(); ctx!.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); ctx!.fill(); ctx!.globalAlpha = 1; },
      };
      glow.setNewTarget();
      return glow;
    }

    let glows: ReturnType<typeof createGlow>[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; glows = Array.from({ length: 12 }, () => createGlow()); };
    const drawGrid = () => { ctx.strokeStyle = gridColor; ctx.lineWidth = 1; for (let x = 0; x < canvas.width; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); } for (let y = 0; y < canvas.height; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); } };
    const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); drawGrid(); glows.forEach((g) => { g.update(); g.draw(); }); frameId = requestAnimationFrame(animate); };
    resize(); animate(); window.addEventListener("resize", resize);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(frameId); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full opacity-60" />;
}

/* Desktop: video + ripple distortion canvas */
function HeroVideoRipple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const rippleRef = useRef<{ prev: Float32Array; curr: Float32Array; w: number; h: number } | null>(null);
  const mouseRef = useRef(heroRippleMouse);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => setFailed(true));

    const stallTimer = setTimeout(() => { if (video.readyState < 2) setFailed(true); }, 4000);

    const canvas = canvasRef.current;
    if (!canvas) return () => clearTimeout(stallTimer);
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => clearTimeout(stallTimer);

    const rw = 256, rh = 144;
    rippleRef.current = { prev: new Float32Array(rw * rh), curr: new Float32Array(rw * rh), w: rw, h: rh };

    const resize = () => { canvas.width = containerRef.current?.clientWidth || window.innerWidth; canvas.height = containerRef.current?.clientHeight || window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      if (!video || video.paused || video.ended || video.readyState < 2) { rafRef.current = requestAnimationFrame(render); return; }
      const cw = canvas.width, ch = canvas.height;
      const r = rippleRef.current!;

      if (mouseRef.current.x >= 0) {
        const rx = Math.floor((mouseRef.current.x / cw) * r.w);
        const ry = Math.floor((mouseRef.current.y / ch) * r.h);
        for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
          const px = rx + dx, py = ry + dy;
          if (px >= 0 && px < r.w && py >= 0 && py < r.h && dx * dx + dy * dy <= 9) r.curr[py * r.w + px] = 512;
        }
      }

      const next = new Float32Array(r.w * r.h);
      for (let y = 1; y < r.h - 1; y++) for (let x = 1; x < r.w - 1; x++) {
        const i = y * r.w + x;
        next[i] = (r.curr[i - 1] + r.curr[i + 1] + r.curr[i - r.w] + r.curr[i + r.w]) / 2 - r.prev[i];
        next[i] *= 0.97;
      }
      r.prev = r.curr; r.curr = next;

      ctx.drawImage(video, 0, 0, cw, ch);
      const imgData = ctx.getImageData(0, 0, cw, ch);
      const src = new Uint8ClampedArray(imgData.data);
      const dst = imgData.data;
      const scaleX = r.w / cw, scaleY = r.h / ch;

      for (let y = 1; y < ch - 1; y++) for (let x = 1; x < cw - 1; x++) {
        const rrx = Math.floor(x * scaleX), rry = Math.floor(y * scaleY);
        if (rrx <= 0 || rrx >= r.w - 1 || rry <= 0 || rry >= r.h - 1) continue;
        const ri = rry * r.w + rrx;
        const ddx = r.curr[ri - 1] - r.curr[ri + 1], ddy = r.curr[ri - r.w] - r.curr[ri + r.w];
        if (Math.abs(ddx) < 0.5 && Math.abs(ddy) < 0.5) continue;
        const sx = Math.min(cw - 1, Math.max(0, Math.round(x + ddx * 0.5)));
        const sy = Math.min(ch - 1, Math.max(0, Math.round(y + ddy * 0.5)));
        const di = (y * cw + x) * 4, si = (sy * cw + sx) * 4;
        dst[di] = src[si]; dst[di + 1] = src[si + 1]; dst[di + 2] = src[si + 2];
      }
      ctx.putImageData(imgData, 0, 0);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => { clearTimeout(stallTimer); cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  if (failed) return <HeroGridGlow />;

  return (
    <div ref={containerRef} className="absolute inset-0">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0 }} src={`${BASE}/hero-bg.mp4`} poster={`${BASE}/images/hero-poster.jpg`} autoPlay loop muted playsInline />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none" />
    </div>
  );
}

/* Chooses desktop (video+ripple) or mobile (grid glow) */
function HeroBackground() {
  const [isMobile, setIsMobile] = useState(true); // default to mobile/safe until hydrated

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768);
  }, []);

  return (
    <div className="absolute inset-0">
      {isMobile ? <HeroGridGlow /> : <HeroVideoRipple />}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/40 to-navy/20 z-[2] pointer-events-none" />
    </div>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const handleRipple = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    heroRippleMouse.x = e.clientX - rect.left;
    heroRippleMouse.y = e.clientY - rect.top;
  }, []);

  const stopRipple = useCallback(() => {
    heroRippleMouse.x = -1;
    heroRippleMouse.y = -1;
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "#0F2A44" }} onMouseMove={handleRipple} onMouseLeave={stopRipple}>
      {/* Video background with ripple distortion */}
      <HeroBackground />

      <motion.div
        className="max-w-[1200px] mx-auto px-5 md:px-8 w-full py-16 md:py-24 relative z-10 pt-[120px] pointer-events-none"
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
              Mentorship, professional development, and career advancement opportunities for AAPI undergraduates in New York.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 pointer-events-auto"
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
                href="mailto:info@asianamericandream.org?subject=Partnership%20Inquiry"
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
              <p className="font-sora font-bold text-white text-sm">1000+ Students Empowered</p>
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
    stat: "",
    label: "Career Readiness Programs",
    description:
      "Across the United States, there is a severe lack of career readiness programs for AAPI college students. Long-established and well-endowed organizations exclude AAPI out of their target communities.",
  },
  {
    stat: "Myth",
    label: "The Model Minority",
    description:
      "This systemic oversight stems from the harmful and pervasive model minority myth that all AAPI are wealthy, well-connected, and possess abundant social capital.",
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
                Bridging the Gap for the AAPI Community
              </motion.h2>
              <motion.p variants={fadeUp} className="font-inter text-base md:text-lg text-dark-gray leading-relaxed mb-5">
                Asian American Dream (AAD) was founded in May 2021 to forge new pathways to career
                success for a historically overlooked population.
              </motion.p>
              <motion.p variants={fadeUp} className="font-inter text-base md:text-lg text-dark-gray leading-relaxed">
                Our mission is to provide mentorship networks, professional development training,
                and career advancement opportunities for underserved AAPI undergraduates, with the
                goal of helping them achieve their unique vision of the Asian American dream.
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
                    src={`${BASE}/images/hero-group.jpg`}
                    alt="AADream community"
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
    image: `${BASE}/images/programs/creator-incubator.jpg`,
  },
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
    image: `${BASE}/images/programs/tala.jpeg`,
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
            description="At AAD, our programs bridge the gap between potential and opportunity. We forge career pathways for under-resourced AAPI undergraduates to connect with mentors, develop professionally, and achieve their unique vision of success. Through strategic partnerships and community-rooted initiatives, we're fostering a strong and supportive AAPI community. Click any program to learn more."
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
                    className={`text-left bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 group border flex flex-col ${
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
                    <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="font-sora font-semibold text-xl md:text-2xl text-charcoal mb-3">
                        {p.title}
                      </h3>
                      <p className="font-inter text-base text-dark-gray leading-relaxed mb-4 flex-1">
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
  { value: 1000, suffix: "+", label: "Undergraduates Mentored" },
  { value: 250, suffix: "+", label: "Mentorship Pairs Served Annually" },
  { value: 50, suffix: "+", label: "University Partners" },
  { value: 30, suffix: "+", label: "Corporate Partners" },
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const particles = useRef<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; r: number; alpha: number; drift: number; phase: number; speed: number }[]>([]);
  const raf = useRef<number>(0);
  const trail = useRef<{ x: number; y: number; age: number }[]>([]);
  const isVisible = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pause animation when section is not in viewport
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (canvas.parentElement) observer.observe(canvas.parentElement);

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
      raf.current = requestAnimationFrame(draw);
      if (!isVisible.current) return;
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

    };

    raf.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    // Listen for mouse events dispatched from Impact section
    const handleParticleMouse = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      mouse.current = { x: detail.x, y: detail.y };
      if (detail.x > -500) trail.current.push({ x: detail.x, y: detail.y, age: 0 });
    };
    canvas.addEventListener("particlemouse", handleParticleMouse);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("particlemouse", handleParticleMouse);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const impactMouse = useRef({ x: -1000, y: -1000 });

  // Wire up ParticleCanvas mouse via shared ref — ParticleCanvas reads from its own mouse ref,
  // so we need to pass it through. We'll use a DOM-level approach instead.
  const handleImpactMouse = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    impactMouse.current = { x, y };
    // Dispatch to ParticleCanvas's mouse ref via the canvas element's dataset
    const canvas = sectionRef.current?.querySelector("canvas");
    if (canvas) {
      canvas.dispatchEvent(new CustomEvent("particlemouse", { detail: { x, y } }));
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-navy relative overflow-hidden"
      onMouseMove={handleImpactMouse}
      onMouseLeave={() => {
        const canvas = sectionRef.current?.querySelector("canvas");
        if (canvas) canvas.dispatchEvent(new CustomEvent("particlemouse", { detail: { x: -1000, y: -1000 } }));
      }}
    >
      <ParticleCanvas />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10 pointer-events-none">
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
  { name: "James Cheng", role: "Vice-Chair", title: "Global Senior Director of DEI, Zimmer Biomet", bio: "James Cheng is the Global Senior Director and Head of Diversity, Equity, and Inclusion of Zimmer Biomet. He is responsible for the strategy, development, and growth of the Diversity, Equity, and Inclusion at Zimmer Biomet and to drive positive impact for the 20,000+ team members in 25+ countries that services 100+ countries across the globe. Prior to Zimmer Biomet, was the Global Director of Inclusion & Diversity and Talent Acquisition at Gilead Sciences Inc. and formally HR Director of Global Inclusion & Diversity COE Business Resource Groups and Business Development at Cargill Inc.\n\nHe serves on the Board of Directors for The Asian American Dream and NAAAP New York. He also serves as an advisor to the Board of Directors for NAAAP Minnesota. The recipient of the Top Healthcare Diversity Officers in 2022 and Top 100 Diversity Officers in 2021 by the National Diversity Council, Outstanding 50 Asian Americans in Business Awardee by the Asian American Business Development Center in 2018.", image: `${BASE}/images/team/james-cheng.jpg` },
  { name: "Carteneil Cheung", role: "Director", title: "Associate General Counsel, McKinsey & Company", bio: "Carteneil is a corporate attorney and strategic advisor with a global career spanning senior in-house leadership and elite international law firms. Carteneil currently serves as Associate General Counsel at McKinsey & Company, advising senior leadership on complex strategic investments and bespoke alternative fee arrangements across North America, EMEA, and APAC.\n\nEarlier in the career, Carteneil practiced at top-tier global law firms including Paul, Weiss and Sidley Austin, representing private equity firms, multinational corporations, and financial institutions on sophisticated mergers and acquisitions and other strategic investments. Carteneil also played a foundational role in establishing a major global law firm\u2019s Asia-Pacific presence.\n\nBorn and raised in a multicultural environment and professionally active across multiple continents, Carteneil brings a global perspective to Asian American Dream\u2019s mission of expanding opportunity and equity for Asian American communities. Carteneil is committed to advancing strong governance, sustainable growth, and inclusive leadership in support of AAD\u2019s work.", image: `${BASE}/images/team/carteneil-cheung.jpg` },
  { name: "Jocelyn Cruz-Alfalla", role: "Director", title: "Dir. of Community & Schools Tennis, USTA Eastern", bio: "Jocelyn Cruz-Alfalla is the Director, Community and Schools Tennis at USTA Eastern where she manages grants focused on grassroots programs for tennis. Prior to joining the USTA Eastern, Jocelyn worked for the Marymount School as the Assistant Athletic Director. She is a professionally trained consultant, educator and manager with over 18 years of experience in organizational development having worked in the educational institutions, health care and nonprofit sectors.\n\nJocelyn currently serves as a volunteer for Asian American Pacific Islander Tennis Association. She earned a B.S from Hunter College and an M.P.A. from Baruch CUNY School of Public Affairs. Jocelyn is also a passionate supporter of her local community and has served on the board of trustees at the Hamilton Park Conservancy to help with the capital needs of the park.", image: `${BASE}/images/team/jocelyn-cruz-alfalla.jpg` },
  { name: "Kevin Ha", role: "Founder & Executive Director", title: "2024-2025 Obama USA Leader", bio: "Kevin Ha is the Founder and Executive Director of Asian American Dream (AAD), a New York-based nonprofit that provides mentorship, professional development, and career advancement opportunities for underserved AAPI undergraduates.\n\nSince founding AAD in 2021, Kevin has scaled the organization to serve 200 mentees and 200 mentors annually. Most recently, he was selected as a 2024-2025 Obama USA Leader by the Obama Foundation and a 2024 Fellow by The EGF Accelerator, respectively.\n\nPrior to AAD, Kevin worked in the Markets Group at the Federal Reserve Bank of New York. Kevin is a proud Cate School (\u201917) and Skidmore College (\u201921) alumnus.", image: `${BASE}/images/team/kevin-ha.jpg` },
  { name: "Jason Huang", role: "Treasurer", title: "Financial Advisor, Oppenheimer Co., CFP\u00ae, ChFC\u00ae, WMCP\u00ae", bio: "Jason Huang is a Financial Advisor at Oppenheimer Co. Inc., where he helps individuals and families achieve financial security through personalized guidance in insurance, investment strategies, and retirement planning. Prior to his current role, Jason served as a Financial Representative at Northwestern Mutual and a Senior Associate at Premier Financial Alliance. His early career includes technical positions at Henry Schein and Verizon, reflecting a diverse professional background.\n\nJason is a CERTIFIED FINANCIAL PLANNER\u00ae professional since 2024. He has also obtained the Chartered Financial Consultant\u00ae (ChFC\u00ae) designation in 2024 and the Wealth Management Certified Professional\u00ae (WMCP\u00ae) designation in 2022, both through The American College of Financial Services. Additionally, he holds Series 7 and 66 FINRA licenses.\n\nJason earned his B.A. in International Relations, Global Political Economy from the State University of New York at Geneseo. Committed to community service, Jason is an Eagle Scout Award recipient and is still active in his local Scouting Council. He has been recognized with the President\u2019s Volunteer Service Award and a Certificate of Special Congressional Recognition for over 400+ hours of service.\n\nAs Board Treasurer of AAD, he leverages his financial expertise to support the organization\u2019s mission of empowering underserved Asian American and Pacific Islander undergraduates. In his personal life, Jason enjoys hiking and camping in nature during the spring and alpine sports in winter. He is passionate about environmental issues. Jason currently resides with his wife and son in Stony Brook, NY.", image: `${BASE}/images/team/jason-huang.jpg` },
  { name: "Roger Kim", role: "Director", title: "Managing Director, Societe Generale", bio: "Roger is currently a managing director and head of Structuring and Solutions for the fixed income division of Societe Generale\u2019s global markets platform in the Americas. Prior to his current position, Roger held structuring and investment professional positions in Asia for Societe Generale Hong Kong, Deutsche Bank Korea and Morgan Stanley Korea. Roger is a graduate of Stanford University and served as a Lieutenant in the South Korean Air Force.", image: `${BASE}/images/team/roger-kim.jpg` },
  { name: "James Liao", role: "Director", title: "President, Salem Consultants Inc.", bio: "James S. J. Liao is president of Salem Consultants Inc., a management consulting firm performing financial and business advisory services. In Taiwan, he is a teacher at Chang Gung University of Science and Technology, teaching conversational English to staff and students. He was an adjunct lecturer at Skidmore College, lecturing on international business, investments, and finance and banking.\n\nHe serves as a Director, former Board President and former Treasurer of Flushing Town Hall, Board Secretary and Co-Chair of the Finance Committee for Villa Maria Academy, and former Director of Asian CineVision.\n\nHe was a co-founder of a comedy club in Flushing, Queens, NY \u2013 Laff Lab. Previously, he was V.P. and general manager of Crossings TV for its stations in NYC and Chicago. Crossings TV nationwide fulfills the entertainment and information needs of Asian American communities providing programming in Chinese, South Asian, Filipino, and Russian.\n\nHe served as a senior executive at two non-profit organizations \u2013 The Municipal Art Society of New York and The Jockey Club and, was President of Christiansen Capital Advisors LLC. He also served as a Director of Fiduciary and Financial Auditing at Siemens Corp., manager of financial and litigation services at Touche Ross (now Deloitte Consulting), and vice president of Asia-Pacific and Europe for Manufacturers Hanover Leasing Corp. (now JP Morgan).\n\nLiao earned his M.B.A. in finance from NYU and his bachelor\u2019s degree in finance (Magna Cum Laude) from Fordham University.", image: `${BASE}/images/team/james-liao.jpg` },
  { name: "Jack Tran", role: "Chair", title: "Strategy & Product Management, American Express", bio: "Jack Tran is a distinguished fintech professional with extensive expertise in product management, strategic development, and financial services. He currently holds a key role in Strategy and Product Management at American Express, where he is instrumental in driving product innovation, expanding B2B solutions, and leading cross-functional initiatives that enhance business growth and operational efficiency.\n\nPrior to his tenure at American Express, Jack held strategic positions at CVS Health Corporation, specializing in corporate strategy and commercialization. Before that, he was based in the San Francisco Bay Area, where he worked at Ernst & Young and PricewaterhouseCoopers, focusing on the financial technology sector and advising clients.\n\nBeyond his professional career, Jack is deeply committed to entrepreneurship, mentorship, and community engagement. He serves on the board of ACE NextGen New York and previously held a leadership role as a Program Coordinator for The Asian American Dream (AAD). Additionally, he is an active member of American Express\u2019s Asian American and Pacific Islander (AAPI) Employee Resource Group, contributing to its Philanthropy Committee.", image: `${BASE}/images/team/jack-tran.jpg` },
  { name: "Kevin Vuong", role: "Director", title: "SVP Global Store & Workplace Experience, Capri Holdings", bio: "Born in Vietnam and raised in California, Kevin earned dual Bachelor of Arts degrees in Architecture and Italian Literature from UC Berkeley. He later moved to New York City, where he joined global design giant Gensler. During his time there, Kevin became a licensed architect and discovered his passion for retail design, working with clients such as Gucci, Burberry, Hugo Boss, and Bottega Veneta.\n\nAfter Gensler, Kevin transitioned to the client side, joining the Architecture team at Coach. Three years later, he was recruited by Michael Kors to build and lead their in-house Store Design team. When Kevin joined the company in 2007, there were just 22 stores worldwide. Under his leadership, the team has since opened nearly 1,000 stores globally and developed multiple retail environments for the brand.\n\nToday, Kevin is the SVP of Global Store & Workplace Experience for all three Capri Holdings brands\u2014Versace, Jimmy Choo, and Michael Kors\u2014and resides in New York City.", image: `${BASE}/images/team/kevin-vuong.jpg` },
  { name: "Yuko Yates", role: "Director", title: "SVP Business Support Executive, Bank of America Legal", bio: "Yuko Yates leads business strategy and initiatives for the Legal Department at Bank of America. In her role, she is responsible for the development and execution of strategic initiatives, including operational excellence, technology initiatives, and process and data enablement across the department.\n\nYuko joined the bank in Singapore in 2010 and relocated to New York in June 2020.\n\nYuko has been actively engaged in driving diversity & inclusion efforts in the organization. She currently serves as the co-chair for the Bank of America Asian Leadership Network New York chapter.\n\nYuko is originally from Japan and holds a Bachelor of Law degree from Keio University in Japan. She has been in the Business Enablement and Business Control roles in the investment banks throughout her career, working in Tokyo, New York, London and Singapore.", image: `${BASE}/images/team/yuko-yates.jpg` },
  { name: "Jennifer Young", role: "Director", title: "Senior Principal, Google Cloud", bio: "Jennifer Young is a Senior Principal on the Global Strategic Missions & Partnerships team within Google Cloud focused on scaling growth and generative AI initiatives. She previously led Global Strategic Partnerships efforts within Google Devices & Services.\n\nPrior to Google, Jennifer led Global Mergers & Acquisitions at Soci\u00e9t\u00e9 BIC. The team was tasked with growing the BIC platform through a blend of global corporate M&A, strategic partnerships and venture capital. Before BIC, Jennifer worked within Evercore\u2019s Investment Banking Mergers & Acquisitions group in New York where she provided buy-side / sell-side advisory and debt financing services to clients in the retail and consumer and consumer tech industries. Prior to business school, Jennifer worked in public capital markets within J.P. Morgan Asset Management and traded foreign currency at FXCM / Deutsche Bank FX.\n\nJennifer received her MBA from the University of Chicago Booth School of Business with concentrations in Finance, Accounting and Managerial and Organizational Behavior and a B.S. in Business Administration with concentrations in Marketing and Finance from Boston University. She received a Forte Foundation merit-based scholarship upon admission to Chicago Booth and was a member of the Dean\u2019s Student Admissions Council. Jennifer is also a graduate of Stuyvesant High School, a college preparatory STEM focused high school and one of nine specialized charter schools in New York City.", image: `${BASE}/images/team/jennifer-young.jpg` },
];

const advisoryMembers = [
  { name: "Alex Chester-Iwata", role: "Member", bio: "Alex Chester-Iwata is an award-winning performer, writer, and cultural advocate with over 35 years in the entertainment industry. A former child actor and member of Diddy\u2019s girl group Dream, she has appeared on Broadway and across major networks, including ABC, NBC, and PBS. As a mixed race Japanese and Jewish American, Alex channeled her experiences into founding Mixed Asian Media\u2014a platform dedicated to uplifting mixed AAPINH voices\u2014which has been recognized by Nielsen and included in academic texts.\n\nShe is also the founder of Mixed Asian Day\u2122, a national movement celebrating mixed Asian identity, and has spoken at events hosted by TikTok, Amazon, Tribeca Festival, and more. Alex serves on multiple national boards, including ACE NextGen, American Advertising Federation LA, New York Asian Film Festival, Philadelphia Asian American Film Foundation, and The Lunar Collective. She was also honored with the National Association of Asian Americans\u2019 Inspire Award in 2025.", image: `${BASE}/images/team/alex-chester-iwata.jpg` },
  { name: "Timothy Fong", role: "Member", bio: "Tim is a seasoned business technologist with over nine years of experience in implementing and managing enterprise systems. He is currently a senior systems specialist at Warburg Pincus, a leading global private equity firm, where he partners with cross-functional teams to enhance operational efficiency through practical, technology-driven solutions.\n\nAs a proud first-generation Asian American, Tim is deeply committed to creating long-term pathways for success within the community. He believes in the transformative power of mentorship and is focused on building a sustainable, strategic support network for early-career Asian professionals from underserved socioeconomic backgrounds\u2014empowering the next generation to thrive in the workforce.", image: `${BASE}/images/team/timothy-fong.jpg` },
  { name: "Esther Kim", role: "Member", bio: "A Florida native and proud University of Florida alum, Esther studied Chemical Engineering and earned a Piano Performance certificate. She is currently a Program Manager at Microsoft within the Azure Customer Reliability Engineering organization, partnering with customers on outage escalations and driving operational excellence.\n\nOutside of her core role, she serves as the Chair for Microsoft Asians of New York, where she is passionate about fostering community and celebrating cultural heritage, events, and traditions across the region.", image: `${BASE}/images/team/esther-kim.jpg` },
  { name: "Jerry Lee", role: "Member", bio: "Jerry is the Co-Founder of Wonsulting and an ex-Senior Strategy & Operations Manager at Google & used to lead Product Strategy at Lucid. After graduating college, Jerry was hired as the youngest analyst in his organization by being promoted multiple times in his first 2 years. After he left Google, he was the youngest person to lead a strategy team at Lucid.\n\nJerry started Wonsulting to help millions around the world land their dream jobs. Through his work, he\u2019s spoken at 250+ events & amassed 3M+ followers across LinkedIn, TikTok & Instagram and has reached 1B+ jobseekers globally. In addition, his work has been featured on Forbes, Newsweek, Business Insider, Yahoo! News, LinkedIn & Forbes 30 under 30.", image: `${BASE}/images/team/jerry-lee.jpg` },
  { name: "Dawn Lucovich", role: "Member", bio: "Dawn Lucovich was one of the founding faculty members at The University of Nagano in Nagano, Japan. She previously worked at a private university in Tokyo, as well as Columbia University and New York University. She specializes in change management, and organizational leadership and learning. She is passionate about AAD\u2019s mission of supporting and mentoring Asian American university students.\n\nShe has lived and worked in the United States, England, South Korea, and Japan. She currently sits on the Board of Directors for the Jersey City Arts Council, and serves on the Teachers College Alumni Association and as Co-Chair of the George Washington University Asian Pacific Islander Network. She also belongs to the New York Junior League and Toastmasters International.", image: `${BASE}/images/team/dawn-lucovich.jpg` },
  { name: "Rhea Mahajan", role: "Member", bio: "Rhea is a CPA and SASB FSA Level II certified professional with expertise in development, social impact, and consulting. She has driven meaningful change through roles such as Development Account Manager at APIA Scholars, where she worked on a multi-million-dollar fundraising plan, and Social Innovation and Operations Officer at Smart City Expo USA, leading efforts to advance equitable and sustainable urban development.\n\nAt APCO Impact, Rhea advised foundations and corporations on financial inclusion, ESG, philanthropy, and DEI initiatives while co-leading the firm\u2019s ANHPI ERG to amplify advocacy and awareness. Her career began in forensic and litigation consulting, partnering with federal agencies and supporting high-stakes investigations.\n\nBeyond her professional work, Rhea is a skilled media host with over 4 million views across South Asian and personal platforms. Fluent in English and Hindi, she is passionate about empowering the ANHPI community and expanding career opportunities for underserved AAPI students.", image: `${BASE}/images/team/rhea-mahajan.jpg` },
  { name: "Alicia Underwood", role: "Member", bio: "Alicia Underwood is the founder of TwentyThree, LLC, a digital communications and influencer marketing agency based in St. Louis. With 15 years of experience in social media strategy and brand storytelling, she partners with enthusiastic, values-driven brands to help them stand out in a crowded digital landscape.\n\nThrough TwentyThree, Alicia leads strategy, creative, and execution across social media, paid media, and influencer marketing. She works with clients across healthcare, hospitality, and luxury, and is known for blending data, creativity, and culture into campaigns that move people and deliver results.\n\nAlongside her client work, Alicia is building The Social Box, a software platform designed to simplify influencer marketing workflows. She also teaches and speaks on the business of social media and influencer marketing, including at MDMC, one of the Midwest\u2019s largest digital conferences. Additionally, she serves on the board of Social Media Club St. Louis and previously served as President of the Lafayette Square Business Association.\n\nAlicia is passionate about storytelling, community building, and helping brands grow with clarity and confidence. She lives in Webster Groves with her husband, two boys, and two cats. She also enjoys Pilates, reading, and cooking in her free time.", image: `${BASE}/images/team/alicia-underwood.jpg` },
];

const aadreamTeam = [
  { name: "Mohina Abdullaeva", role: "Director of Partnerships", bio: "Mohina is a junior at Baruch College, CUNY, where she is pursuing a degree in Computer Information Systems with a Minor in Economics. With a background in the business industry gained through her involvement with StartUps and volunteering at cultural non-profits, she brings a unique blend of skills. Originally from Central Asia, specifically Uzbekistan, Mohina ventured to the U.S. to pursue her educational endeavors. Her experiences have cultivated a deep passion for both technological innovation and the preservation of cultural heritage.", image: `${BASE}/images/team/mohina-abdullaeva.jpg` },
  { name: "Maxwell Chan", role: "AAD Ambassador", bio: "Born and raised in New York City, Maxwell Chan is a Business Administration and Computer Science student at Binghamton University. Through his consulting work, he has worked with organizations to automate manual processes, improve how they use data, and build tools that support better decision-making. His experience spans both technical and business roles, including data management and business development at Diversolar and Sullivan & Cromwell LLP. On campus, Maxwell is the Co-Founder of the Asian Business Collective, where he focuses on creating opportunities and building community for Asian American students. Outside of school and work, he enjoys hiking, biking, camping, and skiing, interests that go back to his scouting days.", image: `${BASE}/images/team/maxwell-chan.jpeg` },
  { name: "Jaclyn Eng", role: "Co-Program Director", bio: "Jaclyn is a native New Yorker, who currently works in management consulting, helping clients meet their needs. She has a bachelor\u2019s degree in Psychology and a master\u2019s degree in Data Analytics and Applied Social Research from Queens College, CUNY. She has previous work experience in education, supporting a dual-enrollment program and managing a college awareness program under the NYC Mayor\u2019s College Access for All initiative. Through these experiences, she has witnessed the transformative power of education firsthand and is passionate about creating opportunities for students to thrive academically, personally, and professionally.", image: `${BASE}/images/team/jaclyn-eng.jpg` },
  { name: "Daron Fong", role: "Community Manager", bio: "Daron is a Principal Engineering Project Manager at Fresenius Medical Care, with a background in chemical engineering. He\u2019s born and raised in the SF Bay Area and graduated as a Regents Scholar from UC Davis.\n\nOutside of his day job, Daron enjoys bringing people together, playing basketball, practicing hip hop dance, and going on fun travel adventures (25+ countries, climbed Mt Kilimanjaro last year and survived altitude sickness). He\u2019s looking to make an impact with the AAD community by bringing more fun events to program members!", image: `${BASE}/images/team/daron-fong.jpg` },
  { name: "Kevin Ha", role: "Founder & Executive Director", bio: "Kevin Ha is the Founder and Executive Director of Asian American Dream (AAD), a New York-based nonprofit that provides mentorship, professional development, and career advancement opportunities for underserved AAPI undergraduates.\n\nSince founding AAD in 2021, Kevin has scaled the organization to serve 200 mentees and 200 mentors annually. Most recently, he was selected as a 2024-2025 Obama USA Leader by the Obama Foundation and a 2024 Fellow by The EGF Accelerator, respectively.\n\nPrior to AAD, Kevin worked in the Markets Group at the Federal Reserve Bank of New York. Kevin is a proud Cate School (\u201917) and Skidmore College (\u201921) alumnus.", image: `${BASE}/images/team/kevin-ha.jpg` },
  { name: "Yi Huang", role: "Director of Student Engagement", bio: "Yi Huang is a sophomore at Cornell University in the Dyson School where she is pursuing a degree in Applied Economics and Management with a concentration in Entrepreneurship. She is a 2026 Girls Who Invest Summer Intensive Program Scholar and a 2026 Investment Associate Intern at Lord Abbett. She was born and raised in Brooklyn, NY and enjoys watching Real Estate shows and playing strategic games in her free time. As a first-generation student, mentorship within and outside of AAD has had a big impact on her personal, academic, and professional growth, making her passionate about creating open spaces for people to pursue their dreams.", image: `${BASE}/images/team/yi-huang.jpg` },
  { name: "Joseph Kao", role: "Community Manager", bio: "Joseph Kao serves as the AAPI Creator Incubator Program Coordinator/Community Manager for AAD. He is a Boston University alum working as a marketing and communications professional at Capgemini with experiences in social media, comms, campaigns, and events across various industries. He also has a background in auditing for a Big 4 Consulting Firm.\n\nOutside of AAD, Joseph is a big tennis fan with passions in film and modeling. He strongly aligns with AAD\u2019s mission and looks forward to giving back and providing his perspective to underserved AAPI students through mentorship and career development.", image: `${BASE}/images/team/joseph-kao.jpg` },
  { name: "Josh Minsup Kim", role: "Co-Program Director", bio: "Josh is in GTM & Product at MindStudio, a No/Lo-Code AI Agent developing platform. Prior to diving into the AI Startup space, Josh was a Data Insights & Analytics Consultant at Kantar, leveraging digital search and social data to guide product, marketing, and brand strategy. He\u2019s also dabbled in venture capital at Syntax Capital (formerly Aves Lair) and TZ Ventures where he sourced startups as well as support the incubation of South Korea\u2019s first B2B Buy Now Pay Later service.\n\nA proud Third Culture Kid (TCK) with roots in both Seoul and New York, Josh is passionate about empowering Asian American professionals with the insights and tools they need to pursue meaningful, purpose-driven careers. Outside of work, he\u2019s an avid volleyball player, enjoys food crawls, and has recently taken up photography.", image: `${BASE}/images/team/josh-minsup-kim.jpg` },
  { name: "Perry Leong", role: "Director of Community", bio: "I\u2019m currently a Sr. Product Marketing Manager at Microsoft working on Azure cloud infrastructure, where I create and manage marketing strategy for Azure Virtual Machines and various IaaS products. I\u2019ve been lucky enough to have a variety of roles from software engineering to technical marketing that have allowed me to leverage a unique combination of technical and interpersonal skills. I love bringing people together and am driven by a desire to make the world more connected. I was born and raised in the SF Bay Area and have been living in Manhattan since 2023. In my free time, I love to travel (over 45 countries!), host social events, play basketball, and take pictures.", image: `${BASE}/images/team/perry-leong.jpg` },
  { name: "Anita Lin", role: "AAD Ambassador", bio: "Anita is a junior at Columbia University studying Cognitive Science and Sustainable Development. She is from New York, the Outer Banks, and Fuzhou, China. Currently, she is a Growth Program Management intern at NBCUniversal Peacock and on the data team at Columbia Technology Ventures. In her free time, you can find her trying new NYC restaurants to rank on Beli!", image: `${BASE}/images/team/anita-lin.jpg` },
  { name: "Matthew Noh", role: "Operations Manager", bio: "Matt is a Baruch College alum, where he earned a degree in Finance with a minor in Computer Information Systems. He currently serves as a Client Associate at Heritage Strategies, where he supports client relationships and financial advisory efforts, gaining hands-on experience in estate planning and client service.\n\nHe will be joining the Dormitory Authority of the State of New York (DASNY) as a Public Finance Fellow, where he will further develop his expertise in municipal finance, capital markets, and public-sector funding. He is particularly interested in how public finance can be used to support infrastructure, education, and community-driven development projects.\n\nAs an Asian American, Matthew is passionate about expanding access to mentorship, professional development, and career pathways for underserved students. He is committed to helping bridge gaps in opportunity and empowering the next generation of professionals.", image: `${BASE}/images/team/matthew-noh.jpg` },
  { name: "Lara Pena", role: "Co-Director of Mentor Experience", bio: "Lara Pena serves as the Co-Director of Mentorship Experience. She is a marketing and communications professional with experiences across financial services, advertising, and non-profit organizations. She graduated from Rutgers University with a degree in Communication, where she first became an AAD mentee after attending one of their online career fairs.\n\nShe has become a mentor as well as a project manager for AAD\u2019s social media. Now curating opportunities for mentor engagement, she looks forward to supporting mentors personally and professionally. Outside of AAD, she works at Prudential Financial as a marketing associate and volunteers with non-profits in the NJ, NYC, and DC areas.", image: `${BASE}/images/team/lara-pena.jpg` },
  { name: "Leon Pham", role: "Co-Director of Mentor Experience", bio: "Leon\u2019s curious and untraditional journey as an immigrant from Vietnam and a community college transfer student led him to exploring the intersection of psychology, business, and technology. Now, whether he is building AI systems, re-imagining brands, or growing a mental health podcast, everything he does in his personal and professional life is anchored by unwavering purpose, grit, and action.\n\nThat same drive to turn ambition into reality is what drew him to AAD, where he knew he wanted to join a community that doesn\u2019t just dream big, but acts together.", image: `${BASE}/images/team/leon-pham.jpg` },
  { name: "Ed Shen", role: "Community Manager", bio: "Ed Shen is a portfolio manager at BlackRock, where he helps manage multi-asset portfolios in a scalable manner.\n\nOutside of his day job, Ed moonlights as a DJ and events organizer, coordinating a variety of programming for both plur.nyc and Subtle Asian Mates while dropping bass beats as JUNTING.\n\nIn his free time, Ed is an avid snowboarder/skateboarder, enjoys reading psychology/philosophy books, and practices needlework/pouring latte art.", image: `${BASE}/images/team/ed-shen.jpg` },
  { name: "Ayan Sivaram", role: "AAD Ambassador", bio: "Ayan is a junior at NYU, where he studies Finance, Statistics, and Philosophy. He spent a year on exchange at University College London. He will be joining J.P. Morgan this summer on the Structured Equity Financing team. Before J.P. Morgan, Ayan worked for One Madison Group and conducted research in LLM fine-tuning and econometrics at NYU and Harvard.", image: `${BASE}/images/team/ayan-sivaram.jpg` },
  { name: "Maximilian Wang", role: "Operations Manager", bio: "Maximilian is a graduate from Rutgers University studying Supply Chain Management and Finance. Through various internships and his current role in Procurement, he hopes to provide expertise in business operations and management.\n\nAs an Eagle Scout within the Boy Scouts of America, he hopes to continue his commitment to serving and supporting the community.", image: `${BASE}/images/team/maximilian-wang.jpg` },
  { name: "Hanson Wen", role: "AAD Ambassador", bio: "Hanson is a Brooklyn-native currently studying Finance and Economics at NYU Stern. Being from NYC, he was exposed to all walks of life and started his journey of volunteering early on. He has been involved with volunteering with organizations like Asian Americans for Equality (AAFE) and Apex For Youth, and is excited to help lead and grow the efforts at AAD.", image: `${BASE}/images/team/hanson-wen.jpg` },
  { name: "Deven Williams", role: "AAD Ambassador", bio: "Deven Williams is a sophomore at Macaulay Honors College at Baruch College, CUNY, where he is pursuing a degree in Finance with a minor in Interdisciplinary NYC Studies. Growing up around his family\u2019s construction business, Deven received early exposure to entrepreneurship, finance, and real estate. These experiences shaped his professional passions, where he now looks forward to joining Centerbridge this summer, and Barclays next summer. Outside of work, Deven enjoys practicing archery, solving puzzles, journaling, and spending time with friends and family.", image: `${BASE}/images/team/deven-williams.jpg` },
  { name: "Keith Wong", role: "Director of Marketing", bio: "Keith is the Director of Marketing for AAD. Currently working in the advertising tech space as a Platform Solutions Manager, previously being on the agency side. Fun fact: he used to be in the competitive dance scene!", image: `${BASE}/images/team/keith-wong.jpg` },
  { name: "Sarah Yoo", role: "Director of Operations", bio: "Sarah is a Strategy & Business Operations Associate at LinkedIn, where she helps shape long-term product strategies for key growth initiatives and oversees performance and forecasting across B2B and B2C product lines. Before joining LinkedIn, Sarah was part of the Strategy Practice at EY-Parthenon, where she developed go-to-market strategies for clients in the Consumer and Technology sectors and was a pillar lead for the Pan-Asian Professional Network.\n\nWith roots in both Boston and Seoul, Sarah is passionate about building a diverse, tight-knit community for current and aspiring Asian-American professionals in the New York area. In her free time, she enjoys dabbling in arts and crafts, playing golf, and exploring NYC cafes in search of the best matcha latte!", image: `${BASE}/images/team/sarah-yoo.jpg` },
  { name: "Jeffrey Zhang", role: "Community Manager", bio: "Jeffrey is a Product Strategy Associate at Fanatics Collectibles, working on the frontier of all things trading cards. Prior to Fanatics, Jeffrey spent 2 years at McKinsey & Company, where he specialized in growth strategy, marketing, and sales.\n\nWhen he\u2019s not nerding out about trading cards, Jeffrey loves to play basketball, watch his Houston Rockets, and play board games with his friends \u2014 Catan, Terraforming Mars, and Mahjong are some of his favorites!\n\nPrior to moving to New York, Jeffrey spent 6 years in the Bay Area, studying Business Administration at UC Berkeley and living in San Francisco. Jeffrey is a Los Angeles native, growing up in Rancho Palos Verdes with his 4 siblings.", image: `${BASE}/images/team/jeffrey-zhang.jpg` },
];

/* ─── Team Member Card with enhanced hover ─── */
function TeamMemberCard({
  member,
  selectedPerson,
  togglePerson,
  personKey,
}: {
  member: { name: string; role?: string; title?: string; bio: string; image: string };
  selectedPerson: string | null;
  togglePerson: (name: string) => void;
  personKey: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="flex flex-col items-center w-[120px] md:w-[140px]"
    >
      <button
        type="button"
        onClick={() => member.bio ? togglePerson(personKey) : undefined}
        className={`flex flex-col items-center group ${member.bio ? "cursor-pointer" : "cursor-default"}`}
      >
        <motion.div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg ring-3 ring-deep-teal/30 relative"
          whileHover={{
            scale: 1.08,
            boxShadow: "0 8px 30px rgba(26,107,122,0.25)",
          }}
          animate={selectedPerson === personKey ? {
            boxShadow: "0 0 0 4px rgba(26,107,122,0.5)",
          } : {}}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="96px"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <p className="font-inter font-medium text-sm text-charcoal mt-3 text-center">{member.name}</p>
        {member.role && (
          <p className="font-inter text-xs text-deep-teal font-medium">{member.role}</p>
        )}
      </button>
    </motion.div>
  );
}

/* ─── Bio Modal Popup ─── */
function BioModal({
  member,
  onClose,
}: {
  member: { name: string; role?: string; title?: string; bio: string; image: string } | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!member) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-8"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-off-white flex items-center justify-center text-dark-gray hover:text-charcoal hover:bg-light-gray transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-3 ring-deep-teal/30 shadow-lg relative mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <h3 className="font-sora font-semibold text-xl text-charcoal">{member.name}</h3>
              {member.role && (
                <p className="font-inter text-sm text-deep-teal font-medium mt-1">{member.role}</p>
              )}
              {member.title && (
                <p className="font-inter text-xs text-dark-gray mt-0.5">{member.title}</p>
              )}
            </div>
            <div className="font-inter text-sm text-dark-gray leading-relaxed whitespace-pre-line">
              {member.bio}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Team() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [modalMember, setModalMember] = useState<typeof boardMembers[0] | typeof advisoryMembers[0] | typeof aadreamTeam[0] | null>(null);

  const togglePerson = (personKey: string) => {
    // Find the member across all arrays
    const allMembers = [
      ...boardMembers.map(m => ({ ...m, key: m.name })),
      ...advisoryMembers.map(m => ({ ...m, key: `advisory-${m.name}` })),
      ...aadreamTeam.map(m => ({ ...m, key: `team-${m.name}` })),
    ];
    const found = allMembers.find(m => m.key === personKey);
    if (found) {
      setModalMember(found);
      setSelectedPerson(personKey);
    }
  };

  const closeModal = () => {
    setModalMember(null);
    setSelectedPerson(null);
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

          {/* Board Members */}
          <motion.div variants={fadeUp}>
            <motion.h3
              className="font-sora font-semibold text-xl text-charcoal text-center mb-8"
              variants={blurFadeUp}
            >
              Board of Directors
            </motion.h3>
            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16"
              variants={widerStagger}
            >
              {boardMembers.map((m) => (
                <TeamMemberCard
                  key={m.name}
                  member={m}
                  selectedPerson={selectedPerson}
                  togglePerson={togglePerson}
                  personKey={m.name}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Advisory Council */}
          <motion.div variants={fadeUp}>
            <motion.h3
              className="font-sora font-semibold text-xl text-charcoal text-center mb-8"
              variants={blurFadeUp}
            >
              Advisory Council
            </motion.h3>
            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16"
              variants={widerStagger}
            >
              {advisoryMembers.map((m) => (
                <TeamMemberCard
                  key={m.name}
                  member={m}
                  selectedPerson={selectedPerson}
                  togglePerson={togglePerson}
                  personKey={`advisory-${m.name}`}
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
              className="flex flex-wrap justify-center gap-4 md:gap-6"
              variants={widerStagger}
            >
              {aadreamTeam.map((m) => (
                <TeamMemberCard
                  key={m.name}
                  member={m}
                  selectedPerson={selectedPerson}
                  togglePerson={togglePerson}
                  personKey={`team-${m.name}`}
                />
              ))}
            </motion.div>
          </motion.div>
        </SectionWrapper>
      </div>

      {/* Bio Modal */}
      <BioModal member={modalMember} onClose={closeModal} />
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
    image: `${BASE}/images/events/gala-of-dreams.jpg`,
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
    image: `${BASE}/images/events/table-of-dreams-2025-cover.jpeg`,
    description:
      "An intimate Giving Tuesday benefit dinner bringing the AAPI community together over cuisine that honors our cultural traditions.",
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

/* ─── 9. Community Photo Gallery ─── */
function PhotoBanner() {
  const communityPhotos = Array.from({ length: 10 }, (_, i) =>
    `${BASE}/images/community/community-${i + 1}.jpeg`
  );
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxSrc(communityPhotos[index]);
  };

  const closeLightbox = () => setLightboxSrc(null);

  const navLightbox = (dir: -1 | 1) => {
    const next = (lightboxIndex + dir + communityPhotos.length) % communityPhotos.length;
    setLightboxIndex(next);
    setLightboxSrc(communityPhotos[next]);
  };

  useEffect(() => {
    if (!lightboxSrc) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navLightbox(1);
      if (e.key === "ArrowLeft") navLightbox(-1);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  });

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionWrapper>
          <SectionHeading
            tag="Life at AAD"
            title="Our Community in Action"
          />
          <motion.div variants={widerStagger} className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {communityPhotos.map((src, i) => (
              <motion.div
                key={src}
                variants={cardReveal}
                className="relative overflow-hidden rounded-2xl shadow-md group aspect-[4/3] cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={src}
                  alt={`AAD community moment ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeLightbox} />
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Prev button */}
            <button
              onClick={() => navLightbox(-1)}
              className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Next button */}
            <button
              onClick={() => navLightbox(1)}
              className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* Image */}
            <motion.div
              key={lightboxSrc}
              className="relative max-w-[90vw] max-h-[85vh] z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={lightboxSrc}
                alt={`Community photo ${lightboxIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh] w-auto rounded-lg"
                sizes="90vw"
              />
            </motion.div>
            {/* Counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 font-inter text-sm text-white/60">
              {lightboxIndex + 1} / {communityPhotos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
      <motion.div className="absolute -inset-y-[20%] inset-x-0" style={{ y: bgY }}>
        <Image
          src={`${BASE}/images/events/event-2.jpg`}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/92 via-bright-turquoise/85 to-deep-teal/92" />
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
            Empower Dreams
          </motion.h2>
          <motion.p variants={fadeUp} className="font-inter text-lg text-white/85 leading-relaxed mb-10 max-w-lg">
            Your support empowers our students to fearlessly chase and achieve their career dreams.
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
