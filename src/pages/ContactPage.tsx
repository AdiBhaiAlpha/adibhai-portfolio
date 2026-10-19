import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PROFILE_INFO } from '../data/initialData';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitContactInquiry, setChatOpen, language } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setLoading(true);
    setTimeout(() => {
      submitContactInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || undefined,
        message: formData.message.trim()
      });
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-[var(--line)] py-16 sm:py-24 lg:py-28">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="site-container relative max-w-4xl">
          <p className="eyebrow">Contact</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text)]">
            LET’S BUILD.
          </h1>
          <p className="section-copy text-base sm:text-lg">
            Have an idea, a product problem, a collaboration, or something you want to learn? Send a message and start a conversation.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Channels */}
      <section className="site-section py-16 sm:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          {/* Direct Reach Sidebar */}
          <aside className="space-y-5">
            <div className="soft-card p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                Or reach me directly
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-soft)]">
                I usually reply within 24–48 hours.
              </p>

              <div className="mt-6 grid gap-3">
                {/* Email card */}
                <a
                  href={`mailto:${PROFILE_INFO.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-solid)] p-4 text-sm font-semibold transition hover:border-[#7130cf]/40 hover:text-[#7130cf]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-[#7130cf] dark:bg-purple-950/60 dark:text-purple-300">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-soft)]">
                      Email
                    </span>
                    <span className="mt-0.5 block truncate text-xs sm:text-sm">{PROFILE_INFO.email}</span>
                  </div>
                </a>

                {/* Phone card */}
                <a
                  href={`tel:${PROFILE_INFO.phone}`}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-solid)] p-4 text-sm font-semibold transition hover:border-[#7130cf]/40 hover:text-[#7130cf]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-950/60 dark:text-pink-300">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-soft)]">
                      Phone / Mobile
                    </span>
                    <span className="mt-0.5 block text-xs sm:text-sm">{PROFILE_INFO.phone}</span>
                  </div>
                </a>

                {/* WhatsApp card */}
                <a
                  href={PROFILE_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-solid)] p-4 text-sm font-semibold transition hover:border-[#7130cf]/40 hover:text-[#7130cf]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-soft)]">
                      WhatsApp Chat
                    </span>
                    <span className="mt-0.5 block text-xs sm:text-sm">{PROFILE_INFO.whatsapp}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Live Chat Prompt card */}
            <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-5 text-sm leading-relaxed text-purple-900 dark:border-purple-900/60 dark:bg-purple-950/30 dark:text-purple-200">
              <span className="font-bold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Chat Assistant
              </span>
              <p className="mt-1 text-xs">
                Usually replies in real time. Have quick questions about stacks or timelines?
              </p>
              <button
                type="button"
                onClick={() => setChatOpen(true)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#7130cf] underline underline-offset-4 dark:text-purple-300 cursor-pointer"
              >
                <span>Open live chat panel</span>
                <MessageSquare className="h-3.5 w-3.5" />
              </button>
            </div>
          </aside>

          {/* Interactive Form Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-xl">
            <p className="eyebrow">Send a message</p>
            <h2 className="font-display text-2xl font-bold text-[var(--text)]">
              Drop a note into the inbox
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-soft)]">
              Your inquiry becomes a direct private ticket accessible in the admin panel.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-6 text-center animate-in zoom-in-95">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                <h3 className="mt-3 font-display text-lg font-bold text-emerald-800 dark:text-emerald-200">
                  Message Sent!
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                  Thank you for reaching out. I'll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-primary mt-6 !px-4 !py-2 text-xs"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-2">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Chitron Bhattacharjee"
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition placeholder:text-[var(--text-soft)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-2">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition placeholder:text-[var(--text-soft)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-2">
                    Subject <span className="font-normal text-[var(--text-soft)]">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry, Consultation, or Hello"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition placeholder:text-[var(--text-soft)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-2">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, budget, or ideas..."
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition resize-y placeholder:text-[var(--text-soft)]"
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
                  <p className="text-xs text-[var(--text-soft)]">
                    Protected with client-side verification &amp; encryption.
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary !px-6 !py-3 text-sm justify-center cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
