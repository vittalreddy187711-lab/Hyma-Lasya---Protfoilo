import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Plus, Trash2 } from 'lucide-react';
import { LEARNING_MILESTONES, type CertificateEntry } from '../data/portfolioData';

interface AchievementsSectionProps {
  certificates: CertificateEntry[];
  onAddCertificate: (cert: Omit<CertificateEntry, 'id'>) => void;
  onRemoveCertificate: (id: string) => void;
}

export function AchievementsSection({
  certificates,
  onAddCertificate,
  onRemoveCertificate,
}: AchievementsSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddCertificate({
      title: title.trim(),
      issuer: issuer.trim() || 'Issuing Organization',
      date: date.trim() || '2026',
    });
    setTitle('');
    setIssuer('');
    setDate('');
    setShowAddForm(false);
  };

  return (
    <section id="achievements" className="border-t border-slate-800/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-blue-400">Achievements</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Honest learning milestones &amp; future credentials
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            Tracking genuine progress during my first year of B.Tech Computer Science,
            with dedicated space reserved for verified certificates as I earn them.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Honest Learning Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-surface rounded-2xl p-6 sm:p-8 lg:col-span-7"
          >
            <h3 className="font-display text-lg font-semibold text-white">
              Early Learning Milestones
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Verified personal steps in my computer science journey
            </p>

            <div className="mt-6 divide-y divide-slate-800/80">
              {LEARNING_MILESTONES.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span className="font-mono text-sm font-medium text-blue-400 tabular-nums">
                    {milestone.index}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display text-base font-semibold text-slate-100">
                        {milestone.title}
                      </h4>
                      <span className="text-xs text-slate-400">{milestone.timeframe}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                      {milestone.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Future Certificates Placeholder & Editable List */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass-surface flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-5"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      Certificates &amp; Awards
                    </h3>
                    <p className="text-xs text-slate-400">
                      Editable space for future credentials
                    </p>
                  </div>
                </div>

                {!showAddForm && (
                  <button
                    type="button"
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-blue-500/50 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Slot</span>
                  </button>
                )}
              </div>

              {showAddForm && (
                <form
                  onSubmit={handleSubmit}
                  className="mt-5 space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div>
                    <label className="block text-xs text-slate-400">
                      Certificate or Award Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Python Programming Foundations"
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs text-slate-400">Issuer</label>
                      <input
                        type="text"
                        value={issuer}
                        onChange={(e) => setIssuer(e.target.value)}
                        placeholder="e.g., Coursera / University"
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400">Date / Year</label>
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="e.g., 2026"
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="min-h-10 rounded-lg border border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="min-h-10 rounded-lg gradient-btn-primary px-4 py-1.5 text-xs font-medium text-white"
                    >
                      Save Entry
                    </button>
                  </div>
                </form>
              )}

              {certificates.length === 0 ? (
                <div className="mt-6 space-y-3">
                  <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-950/35 p-5">
                    <div className="text-xs font-medium text-slate-400">
                      Placeholder · Future Certificate 01
                    </div>
                    <p className="mt-1.5 text-sm text-slate-300">
                      No fabricated awards or certifications are listed. Completed courses,
                      hackathon milestones, and verified certificates will appear here.
                    </p>
                  </div>
                  <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/25 p-5">
                    <div className="text-xs font-medium text-slate-500">
                      Placeholder · Future Certificate 02
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Use “Add Slot” above whenever you earn a new credential to store it
                      in this browser.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4"
                    >
                      <div>
                        <h4 className="font-display text-sm font-semibold text-white">
                          {cert.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-400">
                          {cert.issuer} · {cert.date}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveCertificate(cert.id)}
                        aria-label={`Remove ${cert.title}`}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-rose-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
