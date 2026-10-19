import React from 'react';
import { useApp } from '../context/AppContext';
import { TIMELINE_ITEMS } from '../data/initialData';
import { Briefcase, GraduationCap, Code2, Award, ArrowRight } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const skills = [
    { category: 'Backend Architecture', items: ['PHP 8.x', 'Laravel 11 & 12', 'MySQL', 'REST APIs', 'Authentication / RBAC', 'Database Indexing'] },
    { category: 'Frontend & UI', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Alpine.js', 'Responsive Mobile Design'] },
    { category: 'Infrastructure & Tools', items: ['Git & GitHub', 'Redis', 'Docker (Local)', 'Stripe & Local Gateways', 'Cron Task Schedulers'] },
    { category: 'Service & Systems', items: ['Workforce Management', 'Point of Sale (POS)', 'E-Commerce Engines', 'Incident Reporting'] }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-[var(--line)] py-16 sm:py-24 lg:py-28">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="site-container relative max-w-4xl">
          <p className="eyebrow">Career &amp; Learning Journey</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text)]">
            Experience &amp; Milestones
          </h1>
          <p className="section-copy text-base sm:text-lg">
            A comprehensive look at systems engineered, education completed, and hands-on production experience.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="site-section py-16 sm:py-20">
        <div className="site-container max-w-4xl">
          <div className="relative space-y-8 before:absolute before:bottom-5 before:left-[11px] before:top-4 before:w-px before:bg-[var(--line-strong)]">
            {TIMELINE_ITEMS.map(item => (
              <article key={item.id} className="relative pl-8 sm:pl-10">
                <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[var(--page-bg)] bg-gradient-to-br from-[#7130cf] to-purple-400 shadow-md shadow-[#7130cf]/20" />
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 dark:bg-purple-950 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#7130cf] dark:text-purple-300">
                      {item.badge}
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-soft)]">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#7130cf] dark:text-purple-300 mt-1">
                    {item.organization}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">
                    {item.description}
                  </p>

                  {item.bullets && (
                    <ul className="mt-4 grid gap-2 text-xs sm:text-sm text-[var(--text-soft)] sm:grid-cols-2">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#7130cf]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tags && (
                    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--line)] pt-4">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-[var(--text)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Core Technical Stack Grid */}
          <div className="mt-20">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">
              Core Technical Competencies
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {skills.map(group => (
                <div key={group.category} className="glass-card rounded-2xl p-6">
                  <h3 className="font-display text-base font-bold text-[#7130cf] dark:text-purple-300 mb-3">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(s => (
                      <span
                        key={s}
                        className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3 py-1.5 text-xs font-medium text-[var(--text)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-16 text-center">
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary !px-7 !py-3.5 text-sm"
            >
              <span>Work Together on a Project</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
