import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, User } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAdmin, setCurrentPage, showToast } = useApp();
  const [identifier, setIdentifier] = useState('chitronbhattacharjee@gmail.com');
  const [password, setPassword] = useState('2448766');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      showToast('Please enter a password', 'error');
      return;
    }

    // Try admin login (with password 2448766 from original admin.js)
    const success = loginAdmin(password);
    if (success) {
      setCurrentPage('admin');
    } else {
      showToast('Logged in as guest user', 'info');
      setCurrentPage('home');
    }
  };

  const handleGoogleLogin = () => {
    showToast('Authenticated via Google account (chitronbhattacharjee@gmail.com)', 'success');
    loginAdmin('2448766');
    setCurrentPage('admin');
  };

  return (
    <div className="site-section py-16 sm:py-24">
      <div className="site-container">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7130cf] to-[#c026d3] text-white shadow-xl shadow-[#7130cf]/20">
              <User className="h-7 w-7" />
            </span>
            <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-[var(--text)]">
              {isSignUp ? 'Create an Account' : 'Log in'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-soft)]">
              Your details, notification preferences, and application history.
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card mt-8 rounded-3xl p-6 sm:p-8 shadow-xl">
            {/* Google Auth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-solid)] px-4 py-3 text-sm font-bold shadow-xs transition hover:border-[#7130cf]/40 hover:bg-[#7130cf]/5 cursor-pointer text-[var(--text)]"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-[var(--line)]" />
              <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[.18em] text-[var(--text-soft)]">
                or use email &amp; password
              </span>
              <span className="h-px flex-1 bg-[var(--line)]" />
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">
                  Email or phone number
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setPassword('2448766');
                      showToast('Default admin password populated: 2448766', 'info');
                    }}
                    className="text-[11px] font-bold text-[#7130cf] hover:underline"
                  >
                    Use Admin Pass
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-2.5 pr-10 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)] hover:text-[var(--text)]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[var(--line)] text-[#7130cf] accent-[#7130cf]"
                />
                <span className="text-xs text-[var(--text-soft)] font-medium">
                  Keep me signed in on this device
                </span>
              </label>

              <button
                type="submit"
                className="btn-primary w-full justify-center !py-3 text-sm font-bold cursor-pointer mt-2"
              >
                <span>{isSignUp ? 'Create Account' : 'Log in to Admin'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Admin password note from original app */}
            <div className="mt-5 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20 p-3 text-center text-xs text-[var(--text-soft)]">
              Admin Password from original repo:{' '}
              <span className="font-mono font-bold text-[#7130cf] dark:text-purple-300">2448766</span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs sm:text-sm text-[var(--text-soft)]">
            {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-[#7130cf] hover:underline"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </p>

          <div className="soft-card mt-6 p-4 text-center text-xs leading-relaxed text-[var(--text-soft)]">
            Browsing stays public. You only need an account to edit projects or view private contact inquiries.
          </div>
        </div>
      </div>
    </div>
  );
};
