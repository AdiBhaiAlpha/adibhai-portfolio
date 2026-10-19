import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, X, Check } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const { cookieConsentVisible, setCookieConsentVisible, setCookieConsentAccepted, showToast } = useApp();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferencesToggle, setPreferencesToggle] = useState(true);

  if (!cookieConsentVisible) return null;

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', 'true');
    setCookieConsentAccepted(true);
    setCookieConsentVisible(false);
    showToast('Cookie preferences saved: All enabled', 'success');
  };

  const handleNecessaryOnly = () => {
    localStorage.setItem('cookie_consent', 'necessary_only');
    setCookieConsentAccepted(true);
    setCookieConsentVisible(false);
    showToast('Cookie preferences saved: Necessary only', 'info');
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', preferencesToggle ? 'true' : 'necessary_only');
    setCookieConsentAccepted(true);
    setCookieConsentVisible(false);
    showToast('Preferences updated successfully', 'success');
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 max-w-xl mx-auto animate-in slide-in-from-bottom-6 duration-200">
      <div className="glass-card rounded-2xl p-5 shadow-2xl border border-[var(--line)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[#7130cf] dark:bg-purple-950/60 dark:text-purple-300">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <h3 className="font-display text-sm font-bold tracking-tight text-[var(--text)]">
                Cookies &amp; your privacy
              </h3>
            </div>
            <p className="mt-2 text-xs leading-5 text-[var(--text-soft)]">
              A few first-party cookies keep this site working (theme, language, and chat persistence). No advertising or tracking trackers are used.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCookieConsentVisible(false)}
            className="icon-button h-8 w-8 shrink-0"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Preferences Detail Drawer */}
        {showPreferences && (
          <div className="mt-4 space-y-2.5 border-t border-[var(--line)] pt-3 text-xs">
            <div className="soft-card flex items-start justify-between gap-3 p-3">
              <div>
                <p className="font-bold text-[var(--text)]">Necessary Cookies</p>
                <p className="mt-0.5 text-[11px] text-[var(--text-soft)]">
                  Session, security, and live-chat state. Always on.
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                Always on
              </span>
            </div>

            <div className="soft-card flex items-start justify-between gap-3 p-3">
              <div>
                <p className="font-bold text-[var(--text)]">Preference Cookies</p>
                <p className="mt-0.5 text-[11px] text-[var(--text-soft)]">
                  Remembers your dark/light appearance and selected language.
                </p>
              </div>
              <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={preferencesToggle}
                  onChange={e => setPreferencesToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="h-5 w-9 rounded-full bg-slate-300 peer-checked:bg-[#7130cf] transition-all after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4"></div>
              </label>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {!showPreferences ? (
            <>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn-primary !px-3.5 !py-1.5 !text-xs"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Accept all</span>
              </button>
              <button
                type="button"
                onClick={handleNecessaryOnly}
                className="btn-secondary !px-3.5 !py-1.5 !text-xs"
              >
                Necessary only
              </button>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="text-xs font-semibold text-[#7130cf] hover:underline px-2 py-1"
              >
                Manage preferences
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="btn-primary !px-3.5 !py-1.5 !text-xs"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="btn-secondary !px-3.5 !py-1.5 !text-xs"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
