// TODO: dodać integrację z systemem płatności bezgotówkowych (BLIK/terminal)
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
import QuotePage from './components/QuotePage';
import StoryDrawer from './components/StoryDrawer';
import TermsModal from './components/TermsModal';
import TelegramModal from './components/TelegramModal';
import CookieBanner from './components/CookieBanner';
import MobileCallBar from './components/MobileCallBar';
import NotFoundPage from './components/NotFoundPage';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/wycena' || window.location.hash === '#wycena') {
        return 'quote';
      }
    }
    return 'home';
  });

  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isTelegramOpen, setIsTelegramOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [show404, setShow404] = useState(false);

  // Initialize Lenis smooth scroll; pause cleanly only when full overlays are open
  const isAnyModalOpen = isStoryOpen || isTermsOpen || isTelegramOpen;
  useSmoothScroll(isAnyModalOpen);

  useEffect(() => {
    if (window.location.pathname === '/404') {
      setShow404(true);
    }
    const checkHashAndRoute = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#telegram') {
        setIsTelegramOpen(true);
      }
      if (window.location.pathname === '/wycena' || window.location.hash === '#wycena') {
        setCurrentRoute('quote');
      } else if (window.location.pathname === '/' || (!window.location.hash || window.location.hash === '#home')) {
        setCurrentRoute('home');
      }
    };
    checkHashAndRoute();
    window.addEventListener('hashchange', checkHashAndRoute);
    window.addEventListener('popstate', checkHashAndRoute);
    return () => {
      window.removeEventListener('hashchange', checkHashAndRoute);
      window.removeEventListener('popstate', checkHashAndRoute);
    };
  }, []);

  const navigateToQuote = (service = '', district = '') => {
    if (service) setSelectedService(service);
    if (district) setSelectedDistrict(district);
    setCurrentRoute('quote');
    try {
      window.history.pushState({ route: 'quote' }, '', '/wycena');
    } catch (e) {
      window.location.hash = '#wycena';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentRoute('home');
    try {
      window.history.pushState({ route: 'home' }, '', '/');
    } catch (e) {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (show404) {
    return (
      <NotFoundPage
        onBackToHome={() => {
          setShow404(false);
          navigateToHome();
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#060608] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* 1. Preloader Screen */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 2. Header with dynamic route states */}
      <Header
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenTelegramSettings={() => setIsTelegramOpen(true)}
        isQuoteView={currentRoute === 'quote'}
        onNavigateToQuote={() => navigateToQuote()}
        onBackToHome={navigateToHome}
      />

      {/* 3. Conditional Page Views */}
      {currentRoute === 'quote' ? (
        <main>
          <QuotePage
            onBack={navigateToHome}
            preselectedService={selectedService}
            preselectedDistrict={selectedDistrict}
          />
        </main>
      ) : (
        <main>
          {/* Hero Section with Luxury Cleared Visual & Quick Online Quote CTA */}
          <HeroSection
            isLoaded={isLoaded}
            onNavigateToQuote={() => navigateToQuote()}
          />

          {/* Horizontal Marquee Ticker with Clickable Phone */}
          <MarqueeSection />

          {/* How It Works (3 Steps) */}
          <HowItWorksSection />

          {/* Services Section with Direct /wycena Subpage Link */}
          <ServicesSection onSelectService={(serviceName) => navigateToQuote(serviceName)} />

          {/* Comparison Section (CzystoTruck vs Others) */}
          <ComparisonSection />

          {/* Districts of Łódź with Direct /wycena Subpage Link */}
          <DistrictsSection onSelectDistrict={(districtName) => navigateToQuote('', districtName)} />

          {/* Contact Section with Direct Call & Standards */}
          <ContactSection
            onOpenTerms={() => setIsTermsOpen(true)}
            onOpenTelegramSettings={() => setIsTelegramOpen(true)}
            onNavigateToQuote={() => navigateToQuote()}
          />
        </main>
      )}

      {/* 4. Floating Mobile Quick Contact Bar (tylko na stronie głównej, aby nie przysłaniać formularza wyceny) */}
      {currentRoute === 'home' && <MobileCallBar />}

      {/* 5. Modals & Drawers */}
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

      {/* 6. Cookie Banner */}
      <CookieBanner onOpenTerms={() => setIsTermsOpen(true)} />

      {/* 404 Preview Shortcut */}
      <div className="hidden sm:block fixed bottom-2 right-2 opacity-20 hover:opacity-100 transition-opacity z-10 text-[9px] font-mono text-zinc-600">
        <button
          onClick={() => setShow404(true)}
          className="hover:text-amber-400 cursor-pointer"
          title="Podgląd strony 404"
        >
          [Test 404]
        </button>
      </div>

    </div>
  );
}
