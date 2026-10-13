import React, { useState } from 'react';
import { InlineEditAdminBar } from './components/InlineEditAdminBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { AcademicPrograms } from './components/AcademicPrograms';
import { CampusBanner } from './components/CampusBanner';
import { BeyondClassrooms } from './components/BeyondClassrooms';
import { TriPanelSection } from './components/TriPanelSection';
import { Footer } from './components/Footer';
import {
  EnquiryModal,
  TourModal,
  ProgramModal,
  SearchModal
} from './components/Modals';
import { VercelGuideModal } from './components/VercelGuideModal';
import { FullSiteCMSModal } from './components/FullSiteCMSModal';
import { LogoModal } from './components/LogoModal';
import { MenuEditorModal } from './components/MenuEditorModal';
import { NetlifyDeployModal } from './components/NetlifyDeployModal';
import { SiteConfigProvider, useSiteConfig, AcademicProgramItem, AnnouncementCardItem } from './context/SiteConfigContext';
import { ArrowUp, CheckCircle, Sliders, Edit3, Layers, Globe } from 'lucide-react';

function AppContent() {
  const { config, setIsFullCMSOpen, isInlineEditActive, setIsInlineEditActive } = useSiteConfig();
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [menuEditorOpen, setMenuEditorOpen] = useState(false);
  const [netlifyModalOpen, setNetlifyModalOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [vercelGuideOpen, setVercelGuideOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<AcademicProgramItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleEnquirySuccess = (data: { name: string; grade: string }) => {
    showToast(`Thank you, ${data.name}! Your enquiry for ${data.grade} has been registered.`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800 flex flex-col selection:bg-neutral-900 selection:text-white">
      
      {/* 0. TOP EDITING ENGINE BAR */}
      <InlineEditAdminBar
        onOpenMenuEditor={() => setMenuEditorOpen(true)}
        onOpenNetlifyDeploy={() => setNetlifyModalOpen(true)}
      />

      {/* 1. TOP & MAIN HEADER */}
      <Header
        onOpenEnquiry={() => setEnquiryOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenTour={() => setTourOpen(true)}
        onOpenLogoModal={() => setLogoModalOpen(true)}
        onOpenMenuEditor={() => setMenuEditorOpen(true)}
      />

      {/* 2. HERO SECTION WITH IMAGE & LEAD FORM */}
      <main className="flex-1">
        <Hero
          onOpenEnquiryModal={() => setEnquiryOpen(true)}
          onOpenTourModal={() => setTourOpen(true)}
          onEnquirySuccess={handleEnquirySuccess}
        />

        {/* 3. ABOUT SECTION & 2x3 STATS */}
        <AboutSection onOpenTour={() => setTourOpen(true)} />

        {/* 4. ACADEMIC PROGRAMS (5 STAGES) */}
        <AcademicPrograms onSelectProgram={(prog) => setSelectedProgram(prog)} />

        {/* 5. CAMPUS INFRASTRUCTURE FULL-WIDTH BANNER */}
        <CampusBanner />

        {/* 6. BEYOND CLASSROOMS / HOLISTIC ACTIVITIES */}
        <BeyondClassrooms />

        {/* 7. TRI-PANEL (TESTIMONIALS + ANNOUNCEMENTS + TOUR CARD) */}
        <TriPanelSection
          onOpenTour={() => setTourOpen(true)}
          onSelectAnnouncement={(ann: AnnouncementCardItem) => {
            showToast(`Notice: ${ann.title}`);
          }}
        />
      </main>

      {/* 8. FOOTER */}
      <Footer
        onOpenEnquiry={() => setEnquiryOpen(true)}
        onOpenTour={() => setTourOpen(true)}
      />

      {/* FLOATING ACTION TOOLBAR */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Toggle Inline Click-to-Edit */}
        <button
          onClick={() => setIsInlineEditActive(prev => !prev)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl text-xs font-bold transition-all cursor-pointer ${
            isInlineEditActive
              ? 'bg-amber-400 text-neutral-950 ring-2 ring-amber-500 scale-105'
              : 'bg-neutral-900 text-white hover:bg-black'
          }`}
          title="Toggle Click-to-Edit text directly on the page"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isInlineEditActive ? 'Click-to-Edit ON' : 'Click-to-Edit Text'}</span>
        </button>

        {/* Open Full CMS Studio */}
        <button
          onClick={() => setIsFullCMSOpen(true)}
          style={{ backgroundColor: config.theme.primaryColor }}
          className="flex items-center gap-2 text-white px-3.5 py-2.5 rounded-full shadow-2xl border border-white/20 text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="Open complete CMS studio to edit all sections, cards, and colors"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-300" />
          <span>Full CMS Studio</span>
        </button>

        {/* Deploy to Vercel Guide */}
        <button
          onClick={() => setVercelGuideOpen(true)}
          className="flex items-center gap-2 bg-[#111827] hover:bg-black text-white px-3.5 py-2.5 rounded-full shadow-2xl border border-neutral-700 text-xs font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="How to deploy this site on Vercel"
        >
          <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 116 100">
            <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
          </svg>
          <span className="hidden sm:inline">Deploy to Vercel</span>
          <span className="sm:hidden">Deploy</span>
        </button>

        {/* Back To Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="w-9 h-9 rounded-full bg-white shadow-lg border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-900 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div 
          style={{ backgroundColor: config.theme.primaryColor }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-white/20 animate-bounce"
        >
          <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODALS & DRAWERS */}
      <FullSiteCMSModal />

      <LogoModal
        isOpen={logoModalOpen}
        onClose={() => setLogoModalOpen(false)}
      />

      <MenuEditorModal
        isOpen={menuEditorOpen}
        onClose={() => setMenuEditorOpen(false)}
      />

      <NetlifyDeployModal
        isOpen={netlifyModalOpen}
        onClose={() => setNetlifyModalOpen(false)}
      />

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />

      <TourModal
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
      />

      <ProgramModal
        isOpen={!!selectedProgram}
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onOpenEnquiry={() => setEnquiryOpen(true)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <VercelGuideModal
        isOpen={vercelGuideOpen}
        onClose={() => setVercelGuideOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <SiteConfigProvider>
      <AppContent />
    </SiteConfigProvider>
  );
}
