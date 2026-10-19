import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Moon, Sun, Bell, ArrowRight, Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { PROFILE_INFO } from '../data/initialData';
import { PageView } from '../types';

export const Header: React.FC = () => {
  const {
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    currentPage,
    setCurrentPage,
    unreadNotificationsCount,
    notificationsOpen,
    setNotificationsOpen,
    searchOpen,
    setSearchOpen,
    isAdminAuthenticated
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; bnLabel: string; page: PageView }[] = [
    { label: 'About', bnLabel: 'সম্পর্কে', page: 'about' },
    { label: 'Projects', bnLabel: 'প্রকল্পসমূহ', page: 'projects' },
    { label: 'Experience', bnLabel: 'অভিজ্ঞতা', page: 'experience' },
    { label: 'Gallery', bnLabel: 'গ্যালারি ও নোট', page: 'gallery' },
    { label: 'Contact', bnLabel: 'যোগাযোগ', page: 'contact' }
  ];

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-xl transition-colors">
        <div className="site-container flex h-[4.75rem] items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavigate('home')}
            className="group flex min-w-0 items-center gap-3 text-left transition"
            aria-label="Home"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7130cf] to-[#c026d3] text-white shadow-md shadow-[#7130cf]/20 transition group-hover:scale-105">
              <span className="font-display text-base font-bold">RI</span>
            </div>
            <div className="min-w-0">
              <span className="block truncate font-display text-sm font-bold tracking-tight sm:text-base text-[var(--text)]">
                {PROFILE_INFO.name}
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[.18em] text-[var(--text-soft)] sm:block">
                {language === 'bn' ? 'ডিজিটাল হোম' : 'Digital home'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map(link => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavigate(link.page)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#7130cf]/10 text-[#7130cf] dark:bg-[#7130cf]/25 dark:text-purple-300'
                      : 'text-[var(--text-soft)] hover:text-[#7130cf] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {language === 'bn' ? link.bnLabel : link.label}
                </button>
              );
            })}
          </nav>

          {/* Controls & CTA buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Switch */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="hidden rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-bold text-[var(--text-soft)] transition hover:border-[#7130cf]/40 hover:text-[#7130cf] sm:inline-flex items-center"
              title="Toggle Language"
            >
              <span className="text-[#7130cf] font-semibold">{language === 'en' ? 'বাং' : 'EN'}</span>
            </button>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-button"
              aria-label="Search"
              title="Search projects & notes"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="icon-button"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="icon-button relative"
                aria-label="Notifications"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-[var(--surface-solid)] animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Admin or Login Link */}
            {isAdminAuthenticated ? (
              <button
                onClick={() => handleNavigate('admin')}
                className={`btn-secondary !px-3.5 !py-2 !text-xs hidden sm:inline-flex items-center gap-1.5 border-purple-500/30 text-purple-600 dark:text-purple-300 ${
                  currentPage === 'admin' ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavigate('login')}
                className="btn-primary !px-4 !py-2 text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5"
              >
                <span>{language === 'bn' ? 'লগইন' : 'Log in'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Contact CTA */}
            <button
              onClick={() => handleNavigate('contact')}
              className="btn-primary hidden !px-4 !py-2 text-xs sm:text-sm xl:inline-flex items-center gap-1.5"
            >
              <span>{language === 'bn' ? 'যোগাযোগ' : 'Contact'}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="icon-button lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-[var(--line)] bg-[var(--surface-solid)]/98 backdrop-blur-xl lg:hidden animate-in slide-in-from-top-2 duration-200">
            <nav className="site-container grid gap-1.5 py-4" aria-label="Mobile navigation">
              <button
                onClick={() => handleNavigate('home')}
                className={`flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  currentPage === 'home'
                    ? 'bg-[#7130cf]/10 text-[#7130cf] dark:bg-[#7130cf]/25 dark:text-purple-300'
                    : 'text-[var(--text-soft)] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {language === 'bn' ? 'হোমপেজ' : 'Home'}
              </button>
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => handleNavigate(link.page)}
                  className={`flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    currentPage === link.page
                      ? 'bg-[#7130cf]/10 text-[#7130cf] dark:bg-[#7130cf]/25 dark:text-purple-300'
                      : 'text-[var(--text-soft)] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {language === 'bn' ? link.bnLabel : link.label}
                </button>
              ))}

              <div className="mt-2 flex items-center justify-between border-t border-[var(--line)] pt-4">
                <button
                  onClick={() => handleNavigate('contact')}
                  className="btn-primary w-full justify-center"
                >
                  {language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Me'}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleLanguage}
                  className="ml-3 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-bold text-[#7130cf]"
                >
                  {language === 'en' ? 'বাংলা' : 'English'}
                </button>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleNavigate('login')}
                  className="rounded-2xl border border-[var(--line)] px-4 py-3 text-center text-sm font-bold text-[var(--text)] hover:border-[#7130cf]/40"
                >
                  {isAdminAuthenticated ? 'Admin Panel' : 'Log in'}
                </button>
                <button
                  onClick={() => handleNavigate('contact')}
                  className="btn-primary justify-center text-sm font-bold"
                >
                  Let's Build
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-xs lg:hidden"
        />
      )}
    </>
  );
};
