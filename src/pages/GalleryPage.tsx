import React from 'react';
import { useApp } from '../context/AppContext';
import { ZoomIn, BookOpen, Sparkles, Terminal } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { openLightbox } = useApp();

  const galleryItems = [
    {
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      caption: 'Code Architecture: Clean Laravel Controller & Model Relationship Setup',
      tag: 'Backend Architecture'
    },
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      caption: 'Analytical Dashboards: Metrics, Conversion Funnels & Cashflow Verification',
      tag: 'Analytics & Dashboards'
    },
    {
      url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      caption: 'Team Collaboration: Shift Management & Onboarding Workflows',
      tag: 'Operations'
    },
    {
      url: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80',
      caption: 'E-commerce Checkout: Stripe & Multi-gateway integration flows',
      tag: 'Fintech / Checkout'
    },
    {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      caption: 'High-Throughput Reseller API Dispatch Engine testing',
      tag: 'API Performance'
    },
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      caption: 'Data Security & Integrity: Role-based permissions auditing',
      tag: 'Security Audits'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-[var(--line)] py-16 sm:py-24 lg:py-28">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="site-container relative max-w-4xl">
          <p className="eyebrow">Notes from the process</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text)]">
            Building in Public.
          </h1>
          <p className="section-copy text-base sm:text-lg">
            Snapshots, interface studies, architecture notes, and the moments that happen between release days.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="site-section py-16 sm:py-20">
        <div className="site-container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(item.url, item.caption)}
                className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-solid)] shadow-md transition hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur-md">
                      <ZoomIn className="h-4 w-4" />
                      View Image
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {item.tag}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed text-[var(--text)]">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
