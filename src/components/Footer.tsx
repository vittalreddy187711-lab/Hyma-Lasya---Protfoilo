import { RotateCcw } from 'lucide-react';
import { NAV_LINKS, PORTFOLIO_PROFILE } from '../data/portfolioData';

interface FooterProps {
  hasCustomizations: boolean;
  onResetPlaceholders: () => void;
}

export function Footer({ hasCustomizations, onResetPlaceholders }: FooterProps) {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050914] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-white">
            {PORTFOLIO_PROFILE.fullName}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {PORTFOLIO_PROFILE.academicStatus} · {PORTFOLIO_PROFILE.headlineRole}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-xs text-slate-400 transition-colors hover:text-slate-100 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {hasCustomizations && (
            <button
              type="button"
              onClick={onResetPlaceholders}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-slate-700 hover:text-white whitespace-nowrap"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Placeholders</span>
            </button>
          )}
          <span className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {PORTFOLIO_PROFILE.fullName}
          </span>
        </div>
      </div>
    </footer>
  );
}
