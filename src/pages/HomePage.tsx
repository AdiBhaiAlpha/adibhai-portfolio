import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PROFILE_INFO, TIMELINE_ITEMS } from '../data/initialData';
import { ArrowRight, Mail, Sparkles, FolderGit2, ArrowUpRight, CheckCircle2, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

export const HomePage: React.FC = () => {
  const { projects, setSelectedProject, setCurrentPage, language, openLightbox } = useApp();

  // Typewriter effect for header
  const typewriterText = language === 'bn' ? 'উদ্দেশ্যপূর্ণ প্রকল্পসমূহ।' : 'Projects with a purpose.';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (index <= typewriterText.length) {
        setDisplayedText(typewriterText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 65);
    return () => clearInterval(timer);
  }, [typewriterText]);

  // Featured / Selected work
  const selectedProjects = projects.filter(p => p.selectedWork || p.state === 'active').slice(0, 6);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20 lg:pb-32 lg:pt-24 border-b border-[var(--line)]">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="site-container relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
            <div>
              {/* Status Pill */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-solid)]/70 px-3.5 py-1.5 text-xs font-bold text-[var(--text-soft)] shadow-sm backdrop-blur-md">
                <span className="status-dot" />
                <span>{PROFILE_INFO.status}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-[var(--text)]">
                {language === 'bn'
                  ? 'আমি কার্যকরী ডিজিটাল সিস্টেম তৈরি করি এবং অভিজ্ঞতা ভাগ করি।'
                  : 'I build useful digital things and share what I learn.'}
              </h1>

              {/* Section Copy */}
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-soft)] sm:text-lg">
                {language === 'bn'
                  ? 'প্র্যাকটিক্যাল ওয়েব সিস্টেম আর্কিটেকচার, ফুল-স্ট্যাক সমাধান এবং পরিষ্কার ব্যবহারকারী অভিজ্ঞতায় আগ্রহী।'
                  : PROFILE_INFO.bio}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3.5">
                <button
                  onClick={() => {
                    setCurrentPage('projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-primary"
                >
                  <span>{language === 'bn' ? 'প্রকল্পগুলো দেখুন' : 'Explore Projects'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-secondary"
                >
                  <Mail className="h-4 w-4" />
                  <span>{language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Me'}</span>
                </button>
              </div>

              {/* Live Statistics */}
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[var(--line)] pt-6">
                <div>
                  <p className="font-display text-3xl font-extrabold text-[#7130cf] dark:text-purple-400">
                    {projects.length}
                  </p>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-[var(--text-soft)]">
                    Published Projects
                  </p>
                </div>
                <div className="h-8 w-px bg-[var(--line)] hidden sm:block" />
                <div>
                  <p className="font-display text-3xl font-extrabold text-[#7130cf] dark:text-purple-400">
                    {PROFILE_INFO.stats.yearsExperience}
                  </p>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-[var(--text-soft)]">
                    Years Coding
                  </p>
                </div>
                <div className="h-8 w-px bg-[var(--line)] hidden sm:block" />
                <div>
                  <p className="font-display text-3xl font-extrabold text-[#7130cf] dark:text-purple-400">
                    100%
                  </p>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-[var(--text-soft)]">
                    Client Focused
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Image Card */}
            <div className="mx-auto w-full max-w-md lg:max-w-none">
              <div className="glass-card overflow-hidden rounded-[2.5rem] p-3.5 shadow-2xl">
                <div
                  className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-slate-900 group cursor-pointer"
                  onClick={() => openLightbox(PROFILE_INFO.heroPhoto, PROFILE_INFO.name)}
                >
                  <img
                    src={PROFILE_INFO.heroPhoto}
                    alt={PROFILE_INFO.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                      Full Stack Developer
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold">{PROFILE_INFO.name}</h3>
                    <p className="text-xs text-white/80">{PROFILE_INFO.location} &bull; Remote &amp; Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="site-section py-20">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="section-title text-[var(--text)]">
                <span>{displayedText}</span>
                <span className="inline-block w-1 h-7 bg-[#7130cf] ml-1 animate-pulse align-middle" />
              </h2>
              <p className="section-copy">
                Not a logo wall. Each project is an actual production system, an experiment, or a workflow worth documenting.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentPage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary self-start sm:self-end"
            >
              <span>View all projects</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Projects Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map(project => (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="project-card glass-card group flex h-full flex-col overflow-hidden rounded-2xl p-3 cursor-pointer"
              >
                <div className="relative aspect-[1.35/1] overflow-hidden rounded-xl bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  
                  {/* Status Pill */}
                  <span className="absolute left-3 top-3 status-pill !border-white/20 !bg-white/80 !text-slate-800 backdrop-blur-md dark:!bg-slate-900/80 dark:!text-slate-100 text-[10px]">
                    <span className="status-dot" />
                    {project.state}
                  </span>

                  {project.selectedWork && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7130cf] backdrop-blur-md dark:bg-slate-900/80 dark:text-purple-300">
                      Selected
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-2.5 pb-2 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base sm:text-lg font-bold leading-tight text-[var(--text)] group-hover:text-[#7130cf] transition line-clamp-1">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-soft)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#7130cf]" />
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--text-soft)]">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {project.techStack.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="rounded-full bg-purple-50 dark:bg-purple-950/40 px-2.5 py-0.5 text-[10px] font-bold text-[#7130cf] dark:text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] text-[var(--text-soft)]">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The Path So Far / Timeline Preview */}
      <section className="site-section border-t border-[var(--line)] bg-[var(--surface-soft)]/40 py-20">
        <div className="site-container grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow">The path so far</p>
            <h2 className="section-title text-[var(--text)]">
              Where I came from &amp; where I’m going.
            </h2>
            <p className="section-copy">
              I am interested in the space between an idea and a dependable production system—the design trade-offs, bug fixes, performance tuning, and learning behind the polished release.
            </p>
            <button
              onClick={() => {
                setCurrentPage('experience');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary mt-8"
            >
              <span>View the full timeline</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="relative space-y-6 before:absolute before:bottom-5 before:left-[11px] before:top-4 before:w-px before:bg-[var(--line-strong)]">
            {TIMELINE_ITEMS.map((item, index) => (
              <article key={item.id} className="relative pl-8 sm:pl-10">
                <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[var(--page-bg)] bg-gradient-to-br from-[#7130cf] to-purple-400 shadow-md shadow-[#7130cf]/20" />
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7130cf] dark:text-purple-300">
                      {item.badge}
                    </span>
                    <span className="text-xs text-[var(--text-soft)] font-medium">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#7130cf] dark:text-purple-300">
                    {item.organization}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--text-soft)]">
                    {item.description}
                  </p>
                  {item.bullets && (
                    <ul className="mt-3 grid gap-1.5 text-xs text-[var(--text-soft)] sm:grid-cols-2">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-1.5">
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

      {/* LET'S BUILD Call to Action Banner */}
      <section className="site-section py-16 sm:py-24">
        <div className="site-container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#5b21b6] via-[#7130cf] to-[#c026d3] px-6 py-12 text-white shadow-2xl sm:px-12 sm:py-16 lg:px-16">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[32px] border-white/10 pointer-events-none" />
            <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full border-[24px] border-white/10 pointer-events-none" />

            <div className="relative grid items-center gap-10 md:grid-cols-[1.15fr_.85fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-white/70">
                  Ready to collaborate
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">
                  LET’S BUILD.
                </h2>
                <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-white/85">
                  Have an idea, an engineering problem, an e-commerce platform, or a collaboration in mind? Drop a message and let's bring it to life.
                </p>
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#7130cf] shadow-xl hover:bg-slate-50 transition hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Contact Me</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mx-auto w-full max-w-sm md:max-w-none">
                <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-xl backdrop-blur-md">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Workspace collaboration"
                    className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
