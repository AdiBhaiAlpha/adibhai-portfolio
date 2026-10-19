import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ArrowUpRight, FolderGit2, Filter } from 'lucide-react';
import { ProjectState } from '../types';

export const ProjectsPage: React.FC = () => {
  const { projects, setSelectedProject, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStateFilter, setActiveStateFilter] = useState<'all' | ProjectState>('all');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 6;

  const stateTabs: { label: string; value: 'all' | ProjectState }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'In building', value: 'building' },
    { label: 'Planned', value: 'planned' },
    { label: 'Paused', value: 'paused' }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesState = activeStateFilter === 'all' || p.state === activeStateFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some(t => t.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q));
      return matchesState && matchesQuery;
    });
  }, [projects, activeStateFilter, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPageNum]);

  return (
    <div className="relative overflow-hidden">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-[var(--line)] py-16 sm:py-24 lg:py-28">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="site-container relative max-w-4xl">
          <p className="eyebrow">Project-first portfolio</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text)]">
            Things I design, build, and learn from.
          </h1>
          <p className="section-copy text-base sm:text-lg">
            Web products, business systems, e-commerce platforms, workforce tools, and the architectural reasoning behind them.
          </p>

          {/* Search and Filters */}
          <div className="mt-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-soft)]" />
              <input
                type="search"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPageNum(1);
                }}
                placeholder="Search projects, tags, frameworks..."
                className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-solid)]/80 py-3 pl-11 pr-4 text-sm text-[var(--text)] backdrop-blur-md outline-none focus:border-[#7130cf] transition"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {stateTabs.map(tab => {
                const isActive = activeStateFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setActiveStateFilter(tab.value);
                      setCurrentPageNum(1);
                    }}
                    className={`rounded-full border px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? 'border-[#7130cf] bg-[#7130cf]/10 text-[#7130cf] dark:bg-[#7130cf]/25 dark:text-purple-300'
                        : 'border-[var(--line)] bg-[var(--surface-solid)] text-[var(--text-soft)] hover:border-[#7130cf]/40'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="site-section py-16">
        <div className="site-container">
          {paginatedProjects.length === 0 ? (
            <div className="soft-card p-12 text-center">
              <FolderGit2 className="mx-auto h-12 w-12 text-[var(--text-soft)]" />
              <h3 className="mt-4 font-display text-lg font-bold text-[var(--text)]">
                No matching projects found
              </h3>
              <p className="mt-2 text-sm text-[var(--text-soft)]">
                Try searching for another keyword or clearing the filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveStateFilter('all');
                }}
                className="btn-primary mt-6 !px-4 !py-2 text-xs"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedProjects.map(project => (
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
                      {project.techStack.map(tech => (
                        <span
                          key={tech}
                          className="rounded-full bg-purple-50 dark:bg-purple-950/40 px-2.5 py-0.5 text-[10px] font-bold text-[#7130cf] dark:text-purple-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = currentPageNum === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPageNum(pageNum);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition cursor-pointer ${
                      isCurrent
                        ? 'bg-gradient-to-br from-[#7130cf] to-[#c026d3] text-white shadow-lg shadow-[#7130cf]/20'
                        : 'border border-[var(--line)] bg-[var(--surface-solid)] text-[var(--text-soft)] hover:border-[#7130cf]/40 hover:text-[#7130cf]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
