import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, ExternalLink, Github, CheckCircle2, Layers, Calendar, ZoomIn } from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const { selectedProject, setSelectedProject, openLightbox } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProject]);

  if (!selectedProject) return null;

  return (
    <div
      onClick={() => setSelectedProject(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-solid)] shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Cover Image banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Badges on cover */}
          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {selectedProject.state}
              </span>
              {selectedProject.category && (
                <span className="rounded-full bg-purple-500/80 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  {selectedProject.category}
                </span>
              )}
            </div>
            {selectedProject.publishedDate && (
              <span className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                <Calendar className="h-3.5 w-3.5" />
                {selectedProject.publishedDate}
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-[var(--text)]">
              {selectedProject.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-soft)]">
              {selectedProject.fullOverview || selectedProject.description}
            </p>
          </div>

          {/* Key Features */}
          {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] p-5">
              <h4 className="flex items-center gap-2 font-display text-sm font-bold text-[var(--text)]">
                <Layers className="h-4 w-4 text-[#7130cf]" />
                Key Capabilities &amp; Architecture
              </h4>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 text-xs sm:text-sm text-[var(--text-soft)]">
                {selectedProject.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Screenshots Gallery preview */}
          {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-soft)] mb-3">
                Visual Gallery &bull; Click to Enlarge
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedProject.screenshots.map((sUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => openLightbox(sUrl, `${selectedProject.title} - View ${idx + 1}`)}
                    className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--line)] cursor-pointer"
                  >
                    <img
                      src={sUrl}
                      alt={`Screenshot ${idx + 1}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                      <ZoomIn className="h-6 w-6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-soft)] mb-2.5">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.techStack.map(tech => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-3 py-1 text-xs font-semibold text-[var(--text)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-6">
            <div className="flex flex-wrap gap-3">
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !px-5 !py-2.5 text-sm"
                >
                  <span>Open Live Demo</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {selectedProject.repo && (
                <a
                  href={selectedProject.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !px-5 !py-2.5 text-sm"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="btn-secondary !px-4 !py-2 text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
