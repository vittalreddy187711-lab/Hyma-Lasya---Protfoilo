import { useState, useEffect, useRef } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface EditableFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onSave: (nextValue: string) => void;
  inputType?: 'text' | 'email' | 'url';
  compact?: boolean;
}

export function EditableField({
  label,
  value,
  placeholder,
  onSave,
  inputType = 'text',
  compact = false,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(draft.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-slate-400">{label}</label>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type={inputType}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            placeholder={placeholder}
            aria-label={label}
            className="w-full min-w-0 rounded-lg border border-blue-500/40 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            type="button"
            onClick={handleSave}
            aria-label={`Save ${label}`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            aria-label={`Cancel editing ${label}`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group flex items-center justify-between gap-3 ${
        compact ? 'py-1' : 'rounded-xl border border-slate-800/80 bg-slate-950/40 px-4 py-3'
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div
          className={`mt-0.5 truncate text-sm ${
            value ? 'font-medium text-slate-100' : 'italic text-slate-500'
          }`}
        >
          {value || placeholder}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        aria-label={`Edit ${label}`}
        className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-blue-500/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap"
      >
        <Pencil className="h-3.5 w-3.5" />
        <span>{value ? 'Edit' : 'Add'}</span>
      </button>
    </div>
  );
}
