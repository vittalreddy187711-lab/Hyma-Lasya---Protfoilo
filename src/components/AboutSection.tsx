import { motion } from 'motion/react';
import { GraduationCap, Compass } from 'lucide-react';
import { CAREER_ROADMAP } from '../data/portfolioData';
import type { EditableProfileState } from '../hooks/useEditableProfile';
import { EditableField } from './EditableField';

interface AboutSectionProps {
  profile: EditableProfileState;
  onUpdateField: <K extends keyof Omit<EditableProfileState, 'certificates'>>(
    key: K,
    value: string
  ) => void;
}

export function AboutSection({ profile, onUpdateField }: AboutSectionProps) {
  return (
    <section id="about" className="border-t border-slate-800/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-blue-400">About Me</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Building strong computer science fundamentals from year one
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Education & Editable Institutional Placeholders */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-surface flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-5"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Academic Profile
                  </h3>
                  <p className="text-xs text-slate-400">
                    B.Tech Computer Science &amp; Engineering · First Year
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-300">
                Currently in my first year of B.Tech Computer Science, focusing on
                core programming principles, logical thinking, and hands-on practice.
                Missing institutional details below are intentionally left as editable
                placeholders.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <EditableField
                  label="College / University Name"
                  value={profile.collegeName}
                  placeholder="Placeholder: Add your college or university name"
                  onSave={(val) => onUpdateField('collegeName', val)}
                />
                <EditableField
                  label="Registration / Roll Number"
                  value={profile.registrationNumber}
                  placeholder="Placeholder: Add your registration number"
                  onSave={(val) => onUpdateField('registrationNumber', val)}
                />
                <EditableField
                  label="Location"
                  value={profile.location}
                  placeholder="Placeholder: Add your city or state"
                  onSave={(val) => onUpdateField('location', val)}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interests & Career Goals */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass-surface rounded-2xl p-6 sm:p-8 lg:col-span-7"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Interests &amp; Career Direction
                </h3>
                <p className="text-xs text-slate-400">
                  Python · Artificial Intelligence · Machine Learning · Web Development
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              <p>
                I am drawn to how software turns structured logic into useful tools. Right
                now, I am concentrating on{' '}
                <span className="font-medium text-white">Python</span> as my primary
                programming language while exploring{' '}
                <span className="font-medium text-white">HTML and CSS</span> to build clean,
                responsive web interfaces.
              </p>
              <p>
                Longer term, my goal is to become an{' '}
                <span className="font-medium text-white">AI Engineer</span>—combining solid
                computer science fundamentals with{' '}
                <span className="font-medium text-white">
                  Machine Learning and Generative AI
                </span>{' '}
                to design reliable, human-centered systems.
              </p>
            </div>

            <div className="mt-8 border-t border-slate-800/80 pt-6">
              <h4 className="text-xs font-medium tracking-wide text-slate-400">
                Learning &amp; Career Roadmap
              </h4>
              <div className="mt-4 space-y-5">
                {CAREER_ROADMAP.map((stage) => (
                  <div key={stage.step} className="flex items-start gap-4">
                    <span className="font-mono text-sm font-medium text-blue-400 tabular-nums">
                      {stage.step}.
                    </span>
                    <div>
                      <h5 className="font-display text-base font-semibold text-slate-100">
                        {stage.title}
                      </h5>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
