import { useState, useEffect } from 'react';
import { NAV_LINKS, type ProjectItem } from './data/portfolioData';
import { useEditableProfile } from './hooks/useEditableProfile';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';

export default function App() {
  const {
    profile,
    updateField,
    addCertificate,
    removeCertificate,
    resetAll,
    hasCustomizations,
  } = useEditableProfile();

  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#060B18] text-slate-100">
      {/* Subtle Ambient Electric Blue & Purple Radial Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-blue-600/12 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-[28rem] w-[28rem] translate-x-1/4 rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      <Navbar activeSection={activeSection} />

      <main>
        <HeroSection collegeName={profile.collegeName} />
        <AboutSection profile={profile} onUpdateField={updateField} />
        <SkillsSection />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <AchievementsSection
          certificates={profile.certificates}
          onAddCertificate={addCertificate}
          onRemoveCertificate={removeCertificate}
        />
        <ContactSection profile={profile} onUpdateField={updateField} />
      </main>

      <Footer
        hasCustomizations={hasCustomizations}
        onResetPlaceholders={resetAll}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
