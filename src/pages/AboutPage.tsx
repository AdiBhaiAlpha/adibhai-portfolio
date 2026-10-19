import React from 'react';
import { useApp } from '../context/AppContext';
import { PROFILE_INFO, TIMELINE_ITEMS } from '../data/initialData';
import { MapPin, Sparkles, Check, BookOpen, Layers, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage, openLightbox, projects } = useApp();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-[var(--line)] py-16 sm:py-24 lg:py-28">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="site-container relative max-w-4xl">
          <p className="eyebrow">About me</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text)]">
            A developer who documents the real work.
          </h1>
          <p className="section-copy text-base sm:text-lg">
            I work at the intersection of practical development and approachable education. I enjoy turning complex workflows into clear digital experiences, then writing about the decisions behind the work.
          </p>
        </div>
      </section>

      {/* Main About Details & Stats */}
      <section className="site-section py-16 sm:py-20">
        <div className="site-container grid items-start gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          {/* Left Column: Profile Card */}
          <div className="min-w-0 lg:sticky lg:top-28">
            <div className="glass-card mx-auto w-full max-w-md overflow-hidden rounded-[2.25rem] p-3 shadow-xl">
              <div
                className="relative overflow-hidden rounded-[1.75rem] aspect-[4/5] bg-slate-900 cursor-pointer"
                onClick={() => openLightbox(PROFILE_INFO.heroPhoto, PROFILE_INFO.name)}
              >
                <img
                  src={PROFILE_INFO.heroPhoto}
                  alt={PROFILE_INFO.name}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              <span className="status-pill">
                <span className="status-dot" />
                {PROFILE_INFO.status}
              </span>
              <span className="status-pill">
                <MapPin className="h-3.5 w-3.5 text-[#7130cf]" />
                {PROFILE_INFO.location}
              </span>
            </div>
          </div>

          {/* Right Column: Numbers & Approach */}
          <div className="min-w-0">
            {/* Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="soft-card p-5">
                <p className="font-display text-3xl font-extrabold text-[#7130cf] dark:text-purple-400">
                  {projects.length}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--text-soft)]">
                  Published projects
                </p>
              </div>
              <div className="soft-card p-5">
                <p className="font-display text-3xl font-extrabold text-[#7130cf] dark:text-purple-400">
                  {PROFILE_INFO.stats.journalEntries}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--text-soft)]">
                  Journal notes
                </p>
              </div>
              <div className="soft-card p-5">
                <p className="font-display text-3xl font-extrabold text-[#7130cf] dark:text-purple-400">
                  {PROFILE_INFO.stats.courses}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--text-soft)]">
                  Courses &amp; Guides
                </p>
              </div>
            </div>

            {/* My Approach Section */}
            <div className="mt-12 space-y-6">
              <div className="flex gap-4 items-start">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-[#7130cf] dark:bg-purple-950/60 dark:text-purple-300">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text)]">My approach</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-soft)]">
                    Writing clean code is only half the battle. High-value systems must prioritize maintainability, security, resilience under load, and an effortless user flow.
                  </p>
                </div>
              </div>

              {/* Approach Pillars */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="soft-card p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-[#7130cf] dark:bg-purple-950/60 dark:text-purple-300">
                    <Check className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 font-display font-bold text-sm text-[var(--text)]">
                    Clarity over cleverness
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-soft)]">
                    Useful systems should be immediately understandable to the team and future maintainers.
                  </p>
                </div>

                <div className="soft-card p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-950/60 dark:text-pink-300">
                    <Layers className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 font-display font-bold text-sm text-[var(--text)]">
                    Craft in the details
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-soft)]">
                    Performance, accessibility, security, and edge-cases all belong inside the primary build.
                  </p>
                </div>

                <div className="soft-card p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 font-display font-bold text-sm text-[var(--text)]">
                    Learn in public
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-soft)]">
                    Every real-world project or production bug leaves behind an invaluable lesson.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Work Timeline preview */}
      <section className="site-section border-t border-[var(--line)] bg-[var(--surface-soft)]/40 py-20">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">About me</p>
              <h2 className="section-title text-[var(--text)]">
                Education, work, and what comes next
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentPage('experience');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary self-start sm:self-end"
            >
              <span>View the full timeline</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="relative mt-12 space-y-5 before:absolute before:bottom-5 before:left-[11px] before:top-4 before:w-px before:bg-[var(--line-strong)]">
            {TIMELINE_ITEMS.map(item => (
              <article key={item.id} className="relative pl-8 sm:pl-10">
                <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[var(--page-bg)] bg-gradient-to-br from-[#7130cf] to-purple-400 shadow-md shadow-[#7130cf]/20" />
                <div className="glass-card rounded-2xl p-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7130cf] dark:text-purple-300">
                    {item.badge}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#7130cf] dark:text-purple-300">
                    {item.organization}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">
                    {item.description}
                  </p>
                  {item.bullets && (
                    <ul className="mt-4 grid gap-2 text-xs text-[var(--text-soft)] sm:grid-cols-2">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
