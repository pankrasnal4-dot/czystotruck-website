import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import HowItWorksSection from './components/HowItWorksSection';
import ServicesSection from './components/ServicesSection';
import ComparisonSection from './components/ComparisonSection';
import DistrictsSection from './components/DistrictsSection';
import ContactSection from './components/ContactSection';
import StoryDrawer from './components/StoryDrawer';
import TermsModal from './components/TermsModal';
import TelegramModal from './components/TelegramModal';
import CookieBanner from './components/CookieBanner';
import MobileCallBar from './components/MobileCallBar';
import NotFoundPage from './components/NotFoundPage';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isTelegramOpen, setIsTelegramOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [show404, setShow404] = useState(false);

  // Initialize Lenis smooth scroll; pause cleanly only when full overlays are open
  const isAnyModalOpen = isStoryOpen || isTermsOpen || isTelegramOpen;
  useSmoothScroll(isAnyModalOpen);

  useEffect(() => {
    if (window.location.pathname === '/404') {
      setShow404(true);
    }
  }, []);

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDistrict = (districtName) => {
    setSelectedService(`Rejon: ${districtName}`);
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (show404) {
    return (
      <NotFoundPage
        onBackToHome={() => {
          setShow404(false);
          window.history.pushState({}, '', '/');
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#060608] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* 1. Preloader Screen */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 2. Header */}
      <Header
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenTelegramSettings={() => setIsTelegramOpen(true)}
      />

      {/* 3. Hero Section (Unified Single Interactive Quote Hub) */}
      <HeroSection
        isLoaded={isLoaded}
        incomingService={selectedService}
      />

      {/* 4. Horizontal Marquee Ticker */}
      <MarqueeSection />

      {/* 5. How It Works (3 Steps) */}
      <HowItWorksSection />

      {/* 6. Services Section (Tabbed Editorial Showcase) */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* 7. Comparison Section (CzystoTruck vs Others) */}
      <ComparisonSection />

      {/* 8. Districts of Łódź */}
      <DistrictsSection onSelectDistrict={handleSelectDistrict} />

      {/* 9. Contact Section with Direct Call & Standards (No duplicate forms) */}
      <ContactSection
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenTelegramSettings={() => setIsTelegramOpen(true)}
      />

      {/* 11. Floating Mobile Quick Contact Bar */}
      <MobileCallBar />

      {/* 12. Modals & Drawers */}
      <StoryDrawer
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <TelegramModal
        isOpen={isTelegramOpen}
        onClose={() => setIsTelegramOpen(false)}
      />

      {/* 13. Cookie Banner */}
      <CookieBanner onOpenTerms={() => setIsTermsOpen(true)} />

      {/* 404 Preview Shortcut */}
      <div className="fixed bottom-2 right-2 opacity-20 hover:opacity-100 transition-opacity z-10 text-[9px] font-mono text-zinc-600">
        <button
          onClick={() => setShow404(true)}
          className="hover:text-amber-400"
          title="Podgląd strony 404"
        >
          [Test 404]
        </button>
      </div>

    </div>
  );
}
