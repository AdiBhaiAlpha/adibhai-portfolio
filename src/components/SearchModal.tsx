import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, FolderGit2, ArrowRight } from 'lucide-react';
import { Project } from '../types';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, projects, setSelectedProject } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const filteredProjects = trimmed
    ? projects.filter(
        p =>
          p.title.toLowerCase().includes(trimmed) ||
          p.description.toLowerCase().includes(trimmed) ||
          (p.techStack && p.techStack.some(t => t.toLowerCase().includes(trimmed))) ||
          (p.category && p.category.toLowerCase().includes(trimmed))
      )
    : projects.slice(0, 5);

  const handleSelect = (project: Project) => {
    setSelectedProject(project);
    setSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-solid)] shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[var(--line)] px-4 py-3.5">
          <Search className="h-5 w-5 text-[var(--text-soft)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search projects by title, stack (Laravel, React, PHP), or keyword..."
            className="w-full bg-transparent px-3 text-base text-[var(--text)] outline-none placeholder:text-[var(--text-soft)]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[var(--text-soft)] hover:text-[var(--text)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center rounded border border-[var(--line)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-soft)] ml-2">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[var(--line)]">
          {filteredProjects.length === 0 ? (
            <div className="py-12 text-center text-sm text-[var(--text-soft)]">
              No matching projects or notes found for "<span className="font-semibold">{query}</span>".
            </div>
          ) : (
            <div>
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--text-soft)]">
                {trimmed ? `Found ${filteredProjects.length} results` : 'Suggested Projects'}
              </p>
              {filteredProjects.map(proj => (
                <div
                  key={proj.id}
                  onClick={() => handleSelect(proj)}
                  className="group flex items-center justify-between gap-4 rounded-xl p-3 text-left transition hover:bg-[#7130cf]/5 dark:hover:bg-[#7130cf]/10 cursor-pointer"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#7130cf] dark:bg-purple-950/40 dark:text-purple-300">
                      <FolderGit2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display text-sm font-semibold text-[var(--text)] group-hover:text-[#7130cf] transition truncate">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-[var(--text-soft)] line-clamp-1 mt-0.5">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {proj.techStack.slice(0, 3).map(tech => (
                          <span
                            key={tech}
                            className="rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[9px] font-semibold text-[var(--text-soft)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[var(--text-soft)] group-hover:text-[#7130cf] group-hover:translate-x-1 transition shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[var(--line)] bg-[var(--surface-soft)] px-4 py-2.5 text-xs text-[var(--text-soft)]">
          <span>Search projects, architecture notes, and technology stacks</span>
          <button
            onClick={() => setSearchOpen(false)}
            className="text-xs font-semibold text-[#7130cf] hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
