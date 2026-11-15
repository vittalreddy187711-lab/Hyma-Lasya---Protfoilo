import { useState, useEffect, useCallback } from 'react';
import type { CertificateEntry } from '../data/portfolioData';

export interface EditableProfileState {
  collegeName: string;
  registrationNumber: string;
  location: string;
  email: string;
  linkedin: string;
  certificates: CertificateEntry[];
}

const STORAGE_KEY = 'hyma_lasya_portfolio_profile_v1';

const DEFAULT_PROFILE_STATE: EditableProfileState = {
  collegeName: '',
  registrationNumber: '',
  location: '',
  email: '',
  linkedin: '',
  certificates: [],
};

function loadSavedState(): EditableProfileState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE_STATE;
    const parsed = JSON.parse(raw) as Partial<EditableProfileState>;
    return {
      collegeName: typeof parsed.collegeName === 'string' ? parsed.collegeName : '',
      registrationNumber:
        typeof parsed.registrationNumber === 'string' ? parsed.registrationNumber : '',
      location: typeof parsed.location === 'string' ? parsed.location : '',
      email: typeof parsed.email === 'string' ? parsed.email : '',
      linkedin: typeof parsed.linkedin === 'string' ? parsed.linkedin : '',
      certificates: Array.isArray(parsed.certificates) ? parsed.certificates : [],
    };
  } catch {
    return DEFAULT_PROFILE_STATE;
  }
}

export function useEditableProfile() {
  const [profile, setProfile] = useState<EditableProfileState>(loadSavedState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [profile]);

  const updateField = useCallback(
    <K extends keyof Omit<EditableProfileState, 'certificates'>>(
      key: K,
      value: string
    ) => {
      setProfile((prev) => ({
        ...prev,
        [key]: value.trim(),
      }));
    },
    []
  );

  const addCertificate = useCallback((cert: Omit<CertificateEntry, 'id'>) => {
    setProfile((prev) => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        {
          id: `cert-${Date.now()}`,
          title: cert.title.trim(),
          issuer: cert.issuer.trim(),
          date: cert.date.trim(),
        },
      ],
    }));
  }, []);

  const removeCertificate = useCallback((id: string) => {
    setProfile((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
  }, []);

  const resetAll = useCallback(() => {
    setProfile(DEFAULT_PROFILE_STATE);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const hasCustomizations =
    Boolean(profile.collegeName) ||
    Boolean(profile.registrationNumber) ||
    Boolean(profile.location) ||
    Boolean(profile.email) ||
    Boolean(profile.linkedin) ||
    profile.certificates.length > 0;

  return {
    profile,
    updateField,
    addCertificate,
    removeCertificate,
    resetAll,
    hasCustomizations,
  };
}
