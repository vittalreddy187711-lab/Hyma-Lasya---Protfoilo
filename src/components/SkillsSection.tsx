import { useState } from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA, type SkillCategory } from '../data/portfolioData';

const FILTER_OPTIONS: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Skills' },
  { id: 'programming', label: 'Programming' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'Generative AI' },
];

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<SkillCategory>('all');

  const visibleSkills =
    activeFilter === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === activeFilter);

  return (
    <section id="skills" className="border-t border-slate-800/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-blue-400">Skills</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Current technical toolkit &amp; active learning areas
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              An honest overview of the foundational technologies I am practicing as a
              first-year Computer Science student.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter skills by category"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/70 p-1 self-start md:self-auto"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = activeFilter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveFilter(option.id)}
                  aria-pressed={isSelected}
                  className={`min-h-10 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    isSelected
                      ? 'gradient-btn-primary text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleSkills.map((skill, idx) => (
            <motion.article
              key={skill.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-surface glass-surface-hover flex flex-col justify-between rounded-2xl p-6 sm:p-7"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 whitespace-nowrap shrink-0">
                    <span>{skill.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-blue-300">{skill.levelLabel}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {skill.description}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-800/80 pt-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  {skill.focusAreas.map((area, areaIdx) => (
                    <span key={area} className="inline-flex items-center gap-3">
                      <span>{area}</span>
                      {areaIdx < skill.focusAreas.length - 1 && (
                        <span aria-hidden="true" className="text-slate-600">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
