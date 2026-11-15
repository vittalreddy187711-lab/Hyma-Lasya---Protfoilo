import { useState } from 'react';
import { ArrowRight, ExternalLink, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_SUMMARY_STRIP, PORTFOLIO_PROFILE } from '../data/portfolioData';

interface HeroSectionProps {
  collegeName: string;
}

export function HeroSection({ collegeName }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Primary Typography & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-blue-300/90">
              <span>{PORTFOLIO_PROFILE.academicStatus}</span>
              <span aria-hidden="true" className="text-slate-500">
                ·
              </span>
              <span className={collegeName ? 'text-slate-200' : 'text-slate-400'}>
                {collegeName || 'Institution Editable in About'}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
              {PORTFOLIO_PROFILE.fullName}
              <span className="mt-2 block gradient-text-accent">
                {PORTFOLIO_PROFILE.headlineRole}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              First-year B.Tech Computer Science student building strong foundations in
              Python programming, semantic web development, and Generative AI. Focused
              on learning deliberately, writing clean beginner-friendly code, and turning
              fundamental concepts into working projects.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl gradient-btn-primary px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/50 transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href={PORTFOLIO_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-blue-500/50 hover:bg-slate-800/80 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>GitHub Profile</span>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Framed Visual Anchor */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="glass-surface relative h-full min-h-[280px] overflow-hidden rounded-2xl p-3 sm:min-h-[340px]">
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#070D1F]">
                {!imgError ? (
                  <img
                    src={PORTFOLIO_PROFILE.heroImage}
                    alt="Architectural dark smoked-glass geometric planes symbolizing computational structure"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover lg:h-full"
                  />
                ) : (
                  <div className="flex h-full min-h-[280px] w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#0C1938] to-[#1A1336] p-6 text-center">
                    <Layers className="h-10 w-10 text-blue-400/80" />
                    <p className="mt-3 font-display text-sm font-medium text-slate-200">
                      B.Tech CSE · AI &amp; Python Foundations
                    </p>
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060B18]/75 via-transparent to-transparent"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 text-xs text-slate-200">
                  <span className="font-medium">Learning Track</span>
                  <span className="font-mono text-slate-300">Python · HTML · CSS · GenAI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Summary Strip below split */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HERO_SUMMARY_STRIP.map((item) => (
            <div
              key={item.label}
              className="glass-surface rounded-xl px-5 py-4"
            >
              <div className="text-xs text-slate-400">{item.label}</div>
              <div className="mt-1 font-display text-base font-semibold text-slate-100 tabular-nums">
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
