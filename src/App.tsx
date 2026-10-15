/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SelectedWorksSection } from './components/SelectedWorksSection';
import { JournalSection } from './components/JournalSection';
import { ExplorationsSection } from './components/ExplorationsSection';
import { StatsSection } from './components/StatsSection';
import { FooterSection } from './components/FooterSection';
import { ProjectModal } from './components/ProjectModal';
import { ExplorationModal } from './components/ExplorationModal';
import { ArticleModal } from './components/ArticleModal';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';
import { Project, ExplorationItem, JournalEntry } from './data/portfolioData';

export default function App() {
  // Check if ?autostart=1 is present
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') !== '1' && params.get('skipLoading') !== '1';
    }
    return true;
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedExploration, setSelectedExploration] = useState<ExplorationItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalEntry | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Section observer to update active nav state
  useEffect(() => {
    const sections = ['hero', 'work', 'journal', 'explorations', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text-primary selection:bg-[#89AACC]/30 selection:text-white font-body relative">
      {/* Loading Screen Overlay */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <main>
        {/* Section 2: Hero */}
        <HeroSection
          onSeeWorks={() => handleNavigate('work')}
          onReachOut={() => setIsContactOpen(true)}
        />

        {/* Section 3: Selected Works */}
        <SelectedWorksSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onViewAllWork={() => handleNavigate('work')}
        />

        {/* Section 4: Journal */}
        <JournalSection
          onSelectArticle={(article) => setSelectedArticle(article)}
          onViewAll={() => handleNavigate('journal')}
        />

        {/* Section 5: Explorations (Parallax Gallery) */}
        <ExplorationsSection
          onSelectExploration={(item) => setSelectedExploration(item)}
        />

        {/* Section 6: Stats */}
        <StatsSection />

        {/* Section 7: Contact / Footer */}
        <FooterSection
          onOpenMessageModal={() => setIsContactOpen(true)}
        />
      </main>

      {/* Modals & Dialogs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ExplorationModal
        item={selectedExploration}
        onClose={() => setSelectedExploration(null)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
