import React from 'react';
import { useApp } from '../context/AppContext';
import { PROFILE_INFO } from '../data/initialData';
import { PageView } from '../types';
import { ShieldCheck, Bell, Youtube, Linkedin, MessageCircle, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, toggleLanguage, language, setCookieConsentVisible, showToast, sendPushTestNotification } = useApp();

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInstallPWA = () => {
    showToast('App ready! Use your browser menu -> Install / Add to Home Screen', 'info');
  };

  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[var(--surface-solid)]/70 backdrop-blur-md">
      <div className="site-container grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.8fr_1fr] lg:py-20">
        {/* Col 1: Bio & Socials */}
        <div>
          <button onClick={() => handleNav('home')} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7130cf] to-[#c026d3] text-white font-bold">
              RI
            </div>
            <span className="font-display font-bold text-base text-[var(--text)]">
              {PROFILE_INFO.name}
            </span>
          </button>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--text-soft)]">
            A personal digital home for projects, systems, production code, notes, and practical web engineering.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <a
              href={PROFILE_INFO.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label="YouTube Channel"
              title="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href={PROFILE_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={PROFILE_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={PROFILE_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
              aria-label="Facebook"
              title="Facebook"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigate */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.16em] text-[var(--text)]">
            Navigate
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-[var(--text-soft)]">
            <button
              onClick={() => handleNav('projects')}
              className="text-left transition hover:text-[#7130cf]"
            >
              Projects
            </button>
            <button
              onClick={() => handleNav('experience')}
              className="text-left transition hover:text-[#7130cf]"
            >
              Experience
            </button>
            <button
              onClick={() => handleNav('gallery')}
              className="text-left transition hover:text-[#7130cf]"
            >
              Gallery &amp; Notes
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left transition hover:text-[#7130cf]"
            >
              About
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="text-left transition hover:text-[#7130cf]"
            >
              Admin Dashboard
            </button>
          </div>
        </div>

        {/* Col 3: Connect */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.16em] text-[var(--text)]">
            Connect
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-[var(--text-soft)]">
            <button
              onClick={() => handleNav('contact')}
              className="text-left transition hover:text-[#7130cf]"
            >
              Contact Me
            </button>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="transition hover:text-[#7130cf] truncate"
            >
              {PROFILE_INFO.email}
            </a>
            <button
              onClick={toggleLanguage}
              className="text-left transition hover:text-[#7130cf]"
            >
              Language: <span className="font-bold text-[#7130cf]">{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
            <button
              type="button"
              onClick={handleInstallPWA}
              className="w-fit text-left transition hover:text-[#7130cf]"
            >
              Install App
            </button>
          </div>
        </div>

        {/* Col 4: Notifications & Region */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.16em] text-[var(--text)]">
            Location
          </h3>
          <p className="mt-4 text-sm text-[var(--text-soft)] font-medium">
            {PROFILE_INFO.location}
          </p>

          <button
            type="button"
            onClick={sendPushTestNotification}
            className="mt-5 inline-flex items-center gap-2 text-left text-sm font-semibold text-[#7130cf] transition hover:opacity-80 dark:text-purple-300"
          >
            <Bell className="h-4 w-4" />
            <span>Send test notification</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--line)]">
        <div className="site-container flex flex-col gap-3 py-5 text-xs text-[var(--text-soft)] sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} {PROFILE_INFO.name}. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => setCookieConsentVisible(true)}
              className="inline-flex items-center gap-1.5 font-semibold text-[#7130cf] transition hover:underline dark:text-purple-300"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Cookie preferences
            </button>
            <span>Engineered with React, TypeScript &amp; Tailwind.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
