import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NotificationsDropdown } from './components/NotificationsDropdown';
import { SearchModal } from './components/SearchModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { CookieConsent } from './components/CookieConsent';
import { LightboxModal } from './components/LightboxModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';

import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toast } = useApp();
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed top-20 right-4 z-50 flex items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface-solid)] px-4 py-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
      {isSuccess && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
      {isError && <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />}
      {!isSuccess && !isError && <Info className="h-4 w-4 text-[#7130cf] shrink-0" />}
      <span className="text-xs font-semibold text-[var(--text)]">{toast.message}</span>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <main id="main-content" className="min-h-[calc(100vh-14rem)]">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'projects' && <ProjectsPage />}
      {currentPage === 'experience' && <ExperiencePage />}
      {currentPage === 'gallery' && <GalleryPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'admin' && <AdminPage />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[var(--page-bg)] text-[var(--text)] transition-colors duration-200 selection:bg-[#7130cf]/20 selection:text-[#7130cf]">
        <Header />
        <NotificationsDropdown />
        <SearchModal />
        <ProjectDetailModal />
        <LightboxModal />
        <ToastNotification />

        <MainContent />

        <Footer />
        <LiveChatWidget />
        <CookieConsent />
      </div>
    </AppProvider>
  );
};

export default App;
