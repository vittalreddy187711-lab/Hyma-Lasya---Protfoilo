import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play, Code2 } from 'lucide-react';
import {
  PROJECTS_DATA,
  PORTFOLIO_PROFILE,
  type ProjectItem,
} from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section id="projects" className="border-t border-slate-800/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-blue-400">Projects</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Foundational builds &amp; active practice
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              Hands-on beginner projects focused on clean Python logic, input
              validation, and Generative AI study workflows.
            </p>
          </div>

          <a
            href={PORTFOLIO_PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-blue-300 transition-colors hover:text-blue-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md"
          >
            <span>Visit GitHub Profile</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PROJECTS_DATA.map((project, idx) => {
            const hasFailed = Boolean(failedImages[project.id]);
            const isInProgress = project.status === 'In Progress';

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-surface glass-surface-hover flex flex-col overflow-hidden rounded-2xl"
              >
                {/* Project Visual Header */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-slate-800/80 bg-[#070D1F]">
                  {!hasFailed ? (
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#0F1B3D] to-[#1D133B] p-6 text-center">
                      <Code2 className="h-9 w-9 text-blue-400/80" />
                      <span className="mt-2 font-display text-sm font-medium text-slate-200">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Body */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-slate-400">{project.subtitle}</span>
                      <span
                        className={`font-medium ${
                          isInProgress ? 'text-purple-300' : 'text-blue-300'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {project.summary}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-slate-800/80 pt-4 text-sm text-slate-300">
                      {project.learningFocus.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      {project.stack.map((tech, tIdx) => (
                        <span key={tech} className="inline-flex items-center gap-2">
                          <span className="font-mono text-slate-300">{tech}</span>
                          {tIdx < project.stack.length - 1 && (
                            <span aria-hidden="true" className="text-slate-600">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl gradient-btn-primary px-4 py-2 text-xs font-medium text-white shadow-sm transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <Play className="h-3.5 w-3.5" />
                      <span>{project.actionLabel}</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
