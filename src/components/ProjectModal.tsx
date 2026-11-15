import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Calculator } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

interface SubjectRow {
  id: string;
  name: string;
  score: string;
}

const INITIAL_SUBJECTS: SubjectRow[] = [
  { id: 's1', name: 'Computer Programming (Python)', score: '88' },
  { id: 's2', name: 'Engineering Mathematics', score: '84' },
  { id: 's3', name: 'Web Foundations (HTML/CSS)', score: '91' },
];

function getLetterGrade(pct: number): { grade: string; gpa: number } {
  if (pct >= 90) return { grade: 'A+', gpa: 10.0 };
  if (pct >= 80) return { grade: 'A', gpa: 9.0 };
  if (pct >= 70) return { grade: 'B+', gpa: 8.0 };
  if (pct >= 60) return { grade: 'B', gpa: 7.0 };
  if (pct >= 50) return { grade: 'C', gpa: 6.0 };
  if (pct >= 40) return { grade: 'D', gpa: 5.0 };
  return { grade: 'F', gpa: 0.0 };
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [subjects, setSubjects] = useState<SubjectRow[]>(INITIAL_SUBJECTS);
  const [numA, setNumA] = useState('24');
  const [numB, setNumB] = useState('6');
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  // Grade Calculator computation
  const validScores = subjects
    .map((s) => Number(s.score))
    .filter((n) => !Number.isNaN(n) && n >= 0 && n <= 100);
  const average =
    validScores.length > 0
      ? validScores.reduce((acc, v) => acc + v, 0) / validScores.length
      : 0;
  const gradeSummary = getLetterGrade(average);

  // Basic Arithmetic Calculator computation
  const a = Number(numA);
  const b = Number(numB);
  let calcResult = 'Enter valid numbers';
  if (!Number.isNaN(a) && !Number.isNaN(b) && numA.trim() !== '' && numB.trim() !== '') {
    if (op === '+') calcResult = String(Number((a + b).toFixed(4)));
    if (op === '-') calcResult = String(Number((a - b).toFixed(4)));
    if (op === '*') calcResult = String(Number((a * b).toFixed(4)));
    if (op === '/') {
      calcResult = b === 0 ? 'Error: Division by zero is undefined' : String(Number((a / b).toFixed(4)));
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-surface relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-blue-300">
              {project.subtitle} · {project.status}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1 font-display text-2xl font-bold text-white"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {project.id === 'grade-calculator' ? (
          <div className="mt-6 space-y-6">
            <p className="text-sm leading-relaxed text-slate-300">
              Interactive browser preview simulating the Python grade computation
              logic. Adjust subject scores (0–100) or add subjects to test edge cases.
            </p>

            <div className="space-y-3">
              {subjects.map((row) => (
                <div key={row.id} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) =>
                      setSubjects((prev) =>
                        prev.map((item) =>
                          item.id === row.id ? { ...item, name: e.target.value } : item
                        )
                      )
                    }
                    placeholder="Subject name"
                    aria-label="Subject name"
                    className="flex-1 rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 focus:border-blue-400 focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={row.score}
                      onChange={(e) =>
                        setSubjects((prev) =>
                          prev.map((item) =>
                            item.id === row.id ? { ...item, score: e.target.value } : item
                          )
                        )
                      }
                      aria-label={`${row.name} score`}
                      className="w-24 rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-2 font-mono text-sm text-slate-100 tabular-nums focus:border-blue-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      disabled={subjects.length <= 1}
                      onClick={() =>
                        setSubjects((prev) => prev.filter((item) => item.id !== row.id))
                      }
                      aria-label={`Remove ${row.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/70 text-slate-400 transition-colors hover:text-rose-300 disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setSubjects((prev) => [
                    ...prev,
                    { id: `s-${Date.now()}`, name: `Subject ${prev.length + 1}`, score: '80' },
                  ])
                }
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/60 px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-blue-500/50 hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Subject</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div>
                <div className="text-xs text-slate-400">Average</div>
                <div className="mt-1 font-mono text-xl font-semibold text-white tabular-nums">
                  {average.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Grade</div>
                <div className="mt-1 font-mono text-xl font-semibold text-blue-300">
                  {gradeSummary.grade}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Scale (10)</div>
                <div className="mt-1 font-mono text-xl font-semibold text-purple-300 tabular-nums">
                  {gradeSummary.gpa.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <p className="text-sm leading-relaxed text-slate-300">
              Currently in progress as a foundational Python CLI exercise. Below is the
              active build scope and an interactive arithmetic logic test matching the
              planned Python functions.
            </p>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-purple-300">
                <Calculator className="h-4 w-4" />
                <span>Interactive Arithmetic Logic Test (Including Zero Division Check)</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs text-slate-400">First Number</label>
                  <input
                    type="number"
                    value={numA}
                    onChange={(e) => setNumA(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-2 font-mono text-sm text-white tabular-nums focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400">Operator</label>
                  <select
                    value={op}
                    onChange={(e) => setOp(e.target.value as '+' | '-' | '*' | '/')}
                    className="mt-1 w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-2 font-mono text-sm text-white focus:border-blue-400 focus:outline-none"
                  >
                    <option value="+">+ (Add)</option>
                    <option value="-">- (Subtract)</option>
                    <option value="*">* (Multiply)</option>
                    <option value="/">/ (Divide)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400">Second Number</label>
                  <input
                    type="number"
                    value={numB}
                    onChange={(e) => setNumB(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-2 font-mono text-sm text-white tabular-nums focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-slate-800/80 bg-slate-900/70 px-4 py-3">
                <span className="text-xs text-slate-400">Output: </span>
                <span className="font-mono text-sm font-medium text-blue-300 tabular-nums">
                  {calcResult}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-slate-400">Planned Python Milestones</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {project.learningFocus.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
