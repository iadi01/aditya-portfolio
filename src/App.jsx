import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
const ContactModal = lazy(() => import('./components/ContactModal'));
const ContactFormModal = lazy(() => import('./components/ContactFormModal'));
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import MarqueeBanner from './components/MarqueeBanner';
import AccordionSections from './components/AccordionSections';
import EducationSection from './components/EducationSection';
import BlogsSection from './components/BlogsSection';
import BrandIdentity from './components/BrandIdentity';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));
import { audioSynth } from './utils/audioSynth';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const progressBarRef = useRef(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const isBlogPage = currentPath.startsWith('/blog');
  const isHomePage = currentPath === '/' || currentPath === '';
  const is404Page = !isHomePage && !isBlogPage;

  // Auto-trigger Boot startup sound on first user gesture
  useEffect(() => {
    let soundPlayed = false;
    const playBootSound = () => {
      if (soundPlayed) return;
      soundPlayed = true;
      audioSynth.playStartup();
      
      // Cleanup listeners
      window.removeEventListener('click', playBootSound);
      window.removeEventListener('touchstart', playBootSound);
      window.removeEventListener('keydown', playBootSound);
    };

    window.addEventListener('click', playBootSound);
    window.addEventListener('touchstart', playBootSound);
    window.addEventListener('keydown', playBootSound);

    return () => {
      window.removeEventListener('click', playBootSound);
      window.removeEventListener('touchstart', playBootSound);
      window.removeEventListener('keydown', playBootSound);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!isBlogPage) {
      const hash = window.location.hash;
      if (hash) {
        const timer = setTimeout(() => {
          const id = hash.replace('#', '');
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [currentPath]);

  useEffect(() => {
    // Force scroll to top on refresh/load to ensure progress bar starts at 0%
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Cache scroll calculations to prevent forced reflow layout thrashing
    let maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const handleResize = () => {
      maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${progress}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <div className="min-h-screen bg-custom-blue overflow-x-hidden selection:bg-custom-yellow selection:text-black font-sans relative">
      <CustomCursor />

      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Top progress indicator bar */}
      <div 
        ref={progressBarRef}
        className="fixed top-0 left-0 h-2 bg-custom-green z-[100] transition-all duration-100 ease-out"
        style={{ width: '0%' }}
      />
      {/* Top background accent bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-custom-yellow z-[90]" />

      {!isBlogPage && !is404Page && (
        <Navbar
          visible={showContent}
          onContactClick={() => setContactFormOpen(true)}
        />
      )}

      <Suspense fallback={null}>
        <ContactModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
        <ContactFormModal
          isOpen={contactFormOpen}
          onClose={() => setContactFormOpen(false)}
        />
      </Suspense>

      {is404Page ? (
        <Suspense fallback={null}>
          <NotFoundPage />
        </Suspense>
      ) : isBlogPage ? (
        <Suspense fallback={null}>
          <BlogPage onContactClick={() => setContactOpen(true)} currentPath={currentPath} />
        </Suspense>
      ) : (
        <main className="w-full max-w-full overflow-x-hidden flex flex-col items-center gap-20 pt-32 pb-20">
          {/* SEO Accessibility Headings & Links (Invisible in UI) */}
          <h1 className="sr-only">Aditya Portfolio | Aditya Sharma Portfolio | WTF Aadi | Full Stack Developer | Software Engineer | iadi0</h1>
          <nav aria-label="SEO Internal Links" className="sr-only">
            <a href="#home">Home</a>
            <a href="#about">About Aditya Sharma</a>
            <a href="#projects">Aditya Sharma Portfolio Projects</a>
            <a href="#skills">Skills of Aditya Sharma</a>
            <a href="#experience">Learning Journey of Aditya Sharma</a>
            <a href="#contact">Contact Aditya Sharma</a>
          </nav>

          <HeroSection onContactClick={() => setContactOpen(true)} />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <BlogsSection />
          <BrandIdentity />
          <EducationSection />
          <AccordionSections />
          <FAQSection />
          <MarqueeBanner />
        </main>
      )}
      
      {!isBlogPage && !is404Page && <Footer />}
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </div>
  );
}

export default App;
