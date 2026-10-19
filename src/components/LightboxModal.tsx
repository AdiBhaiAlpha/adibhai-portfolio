import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { lightbox, closeLightbox } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeLightbox]);

  if (!lightbox) return null;

  return (
    <div
      onClick={closeLightbox}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative flex max-h-[92vh] max-w-5xl flex-col items-center gap-3"
      >
        <button
          type="button"
          onClick={closeLightbox}
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>

        <img
          src={lightbox.url}
          alt={lightbox.caption || 'Project visual'}
          className="max-h-[82vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
        />

        {lightbox.caption && (
          <p className="max-w-3xl text-center text-sm font-medium text-white/80">
            {lightbox.caption}
          </p>
        )}
      </div>
    </div>
  );
};
