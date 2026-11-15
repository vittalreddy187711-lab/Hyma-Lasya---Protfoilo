import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, ExternalLink, Mail } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import type { EditableProfileState } from '../hooks/useEditableProfile';
import { EditableField } from './EditableField';

interface ContactSectionProps {
  profile: EditableProfileState;
  onUpdateField: <K extends keyof Omit<EditableProfileState, 'certificates'>>(
    key: K,
    value: string
  ) => void;
}

export function ContactSection({ profile, onUpdateField }: ContactSectionProps) {
  const [copiedGithub, setCopiedGithub] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');

  const handleCopyGithub = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_PROFILE.githubUrl);
      setCopiedGithub(true);
      setTimeout(() => setCopiedGithub(false), 2000);
    } catch {
      // Fallback ignored
    }
  };

  const formattedDraft = `Hi Hyma Lasya S,\n\n${
    messageBody.trim() || 'I came across your portfolio and wanted to connect.'
  }\n\nBest regards,\n${senderName.trim() || 'Visitor'}`;

  const handleCopyDraft = async () => {
    try {
      await navigator.clipboard.writeText(formattedDraft);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2200);
    } catch {
      // Fallback ignored
    }
  };

  const normalizedLinkedInHref = profile.linkedin
    ? profile.linkedin.startsWith('http://') || profile.linkedin.startsWith('https://')
      ? profile.linkedin
      : `https://${profile.linkedin}`
    : '';

  return (
    <section id="contact" className="border-t border-slate-800/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-blue-400">Contact</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Connect &amp; collaborate
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            Open to connecting with fellow computer science students, mentors, and
            beginner-friendly Python or AI learning opportunities.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Real GitHub + Editable Email/LinkedIn Placeholders */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-surface flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-5"
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Direct Profiles
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  GitHub is live; Email and LinkedIn are editable placeholders.
                </p>
              </div>

              {/* Verified GitHub Card */}
              <div className="rounded-xl border border-blue-500/25 bg-slate-950/60 p-4">
                <div className="text-xs text-blue-300">GitHub Profile</div>
                <div className="mt-1 truncate font-mono text-sm text-slate-100">
                  {PORTFOLIO_PROFILE.githubUrl}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={PORTFOLIO_PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg gradient-btn-primary px-3.5 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <span>Open GitHub</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyGithub}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/70 px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    {copiedGithub ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-blue-300" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Editable Email Placeholder */}
              <EditableField
                label="Email Address"
                value={profile.email}
                placeholder="Placeholder: your.email@example.com"
                inputType="email"
                onSave={(val) => onUpdateField('email', val)}
              />

              {/* Editable LinkedIn Placeholder */}
              <div className="space-y-2">
                <EditableField
                  label="LinkedIn Profile"
                  value={profile.linkedin}
                  placeholder="Placeholder: linkedin.com/in/your-profile"
                  inputType="url"
                  onSave={(val) => onUpdateField('linkedin', val)}
                />
                {normalizedLinkedInHref && (
                  <a
                    href={normalizedLinkedInHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-300 hover:text-blue-200"
                  >
                    <span>Open saved LinkedIn URL</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Honest Message Composer (Copies draft or opens mailto if email set) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass-surface rounded-2xl p-6 sm:p-8 lg:col-span-7"
          >
            <h3 className="font-display text-lg font-semibold text-white">
              Compose a Note
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Draft your message below to copy to clipboard
              {profile.email ? ' or open directly in your email client.' : '.'}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCopyDraft();
              }}
              className="mt-6 space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-1.5 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-300">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Project discussion or mentorship"
                    className="mt-1.5 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Write a quick message..."
                  className="mt-1.5 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl gradient-btn-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Message Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Message Draft</span>
                    </>
                  )}
                </button>

                {profile.email ? (
                  <a
                    href={`mailto:${encodeURIComponent(profile.email)}?subject=${encodeURIComponent(
                      subject || 'Hello from your portfolio'
                    )}&body=${encodeURIComponent(formattedDraft)}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/70 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-blue-500/50 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Open Email App</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">
                    Add your email placeholder on the left to enable direct mailto links.
                  </span>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
