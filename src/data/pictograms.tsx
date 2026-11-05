import React from 'react';

/**
 * Universal AAC / CAA (Augmentative and Alternative Communication) Pictograms
 * Built with bold, high-contrast strokes and clear iconic recognition
 * Designed for TEA, cognitive diversity, aphasia, and language barrier accessibility.
 */

interface PictogramProps {
  className?: string;
  size?: number;
}

export const Pictograms: Record<string, React.FC<PictogramProps>> = {
  // Food & Drink items
  cafe: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 18h24v14a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8V18z" fill="currentColor" fillOpacity="0.12" />
      <path d="M32 22h5a4 4 0 0 1 0 8h-5" />
      <path d="M6 42h28" strokeWidth="3" />
      <path d="M14 12c0-3 2-4 2-6" strokeWidth="2.5" />
      <path d="M20 12c0-3 2-4 2-6" strokeWidth="2.5" />
      <path d="M26 12c0-3 2-4 2-6" strokeWidth="2.5" />
    </svg>
  ),

  te: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 20h22v12a7 7 0 0 1-7 7H17a7 7 0 0 1-7-7V20z" fill="currentColor" fillOpacity="0.12" />
      <path d="M32 23h5a3.5 3.5 0 0 1 0 7h-5" />
      <path d="M21 10v6" strokeWidth="2" strokeDasharray="2 2" />
      <rect x="18" y="15" width="6" height="7" rx="1" fill="currentColor" fillOpacity="0.3" />
      <path d="M8 42h26" strokeWidth="3" />
    </svg>
  ),

  medialuna: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 34c2-12 12-22 24-22 5 0 8 2 10 5-6 1-13 7-14 14-1 6 3 10 7 13-6 2-17 0-27-10z" fill="currentColor" fillOpacity="0.15" />
      <path d="M16 26c4-3 9-5 14-4" strokeWidth="2" />
      <path d="M20 31c3-2 6-3 10-2" strokeWidth="2" />
    </svg>
  ),

  tostado: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 38 38 6h4v32H6z" fill="currentColor" fillOpacity="0.15" />
      <path d="M6 38 38 6" strokeWidth="3" />
      <path d="M14 38 38 14" strokeWidth="2" strokeDasharray="2 3" />
      <path d="M38 6v32H6" strokeWidth="3" />
      <circle cx="28" cy="24" r="2" fill="currentColor" />
      <circle cx="33" cy="29" r="1.5" fill="currentColor" />
    </svg>
  ),

  pizza: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 12c14-6 28-6 32 0L24 44 8 12z" fill="currentColor" fillOpacity="0.15" />
      <path d="M8 12c14-6 28-6 32 0" strokeWidth="3.5" />
      <path d="M10 16c12-5 24-5 28 0" strokeWidth="2" />
      <circle cx="24" cy="22" r="2.5" fill="currentColor" />
      <circle cx="20" cy="32" r="2" fill="currentColor" />
      <circle cx="28" cy="30" r="2" fill="currentColor" />
      <path d="M8 12 24 44 40 12" strokeWidth="3" />
    </svg>
  ),

  empanada: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 32c0-14 16-24 36-16 0 16-16 24-36 16z" fill="currentColor" fillOpacity="0.15" />
      <path d="M6 32c4-3 10-5 18-5s14 2 18 5" strokeWidth="2" />
      <path d="M6 32c-1-2 0-5 2-6 2-1 4 0 5 1 2-2 5-2 7 0 2-2 5-2 7 0 2-2 5-2 7 0 2-2 5-2 7 0 2 2 1 5 1 7" strokeWidth="2.5" />
    </svg>
  ),

  milanesa: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="24" cy="26" rx="17" ry="11" fill="currentColor" fillOpacity="0.15" />
      <ellipse cx="24" cy="26" rx="17" ry="11" strokeWidth="3" />
      <path d="M14 23l4 6M22 21l4 7M30 23l4 6" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 41h32" strokeWidth="3" />
      {/* Lemon slice */}
      <path d="M34 14a6 6 0 0 0-8-2l4 7z" fill="currentColor" fillOpacity="0.25" strokeWidth="2" />
    </svg>
  ),

  hamburguesa: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Top bun */}
      <path d="M10 20c0-7 6-12 14-12s14 5 14 12H10z" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      {/* Seeds */}
      <circle cx="18" cy="14" r="1" fill="currentColor" />
      <circle cx="24" cy="12" r="1" fill="currentColor" />
      <circle cx="30" cy="14" r="1" fill="currentColor" />
      {/* Lettuce / Cheese */}
      <path d="M8 25c2 2 4 0 6 2s4 0 6 2 4 0 6 2 4 0 6 2 4 0 6 2" strokeWidth="2" />
      {/* Patty */}
      <rect x="8" y="28" width="32" height="6" rx="3" fill="currentColor" fillOpacity="0.3" strokeWidth="2.5" />
      {/* Bottom bun */}
      <path d="M10 38h28c0 4-6 6-14 6s-14-2-14-6z" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
    </svg>
  ),

  papas_fritas: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 20l3 22h14l3-22H14z" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      <path d="M18 20V8l4-2v14" strokeWidth="2.5" />
      <path d="M23 20V6l4 2v12" strokeWidth="2.5" />
      <path d="M28 20V10l4-1v11" strokeWidth="2.5" />
      <path d="M13 20V12l4 2v6" strokeWidth="2.5" />
    </svg>
  ),

  pasta: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 26c0 10 7 16 16 16s16-6 16-16H8z" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      <path d="M14 26c0-6 4-10 10-10s10 4 10 10" strokeWidth="2.5" />
      <path d="M18 26c0-3 3-5 6-5s6 2 6 5" strokeWidth="2" />
      <path d="M24 6v8" strokeWidth="3" />
      <path d="M21 8h6" strokeWidth="2" />
    </svg>
  ),

  helado: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Cone */}
      <path d="M16 26l8 18 8-18H16z" fill="currentColor" fillOpacity="0.2" strokeWidth="3" />
      <path d="M18 31l10 5M20 37l6 3" strokeWidth="1.5" />
      {/* Ice cream scoops */}
      <circle cx="24" cy="18" r="9" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      <path d="M15 24c2 2 4 1 6 2s4 1 6 2 4 0 6-2" strokeWidth="2" />
    </svg>
  ),

  gaseosa: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 16l3 26h14l3-26H14z" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      <path d="M12 16h24" strokeWidth="3" />
      {/* Straw */}
      <path d="M26 6l4-2 3 12" strokeWidth="2.75" />
      <circle cx="21" cy="26" r="1.5" fill="currentColor" />
      <circle cx="27" cy="32" r="1.5" fill="currentColor" />
      <circle cx="23" cy="36" r="1" fill="currentColor" />
    </svg>
  ),

  agua: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14l2.5 28h13l2.5-28H15z" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      <path d="M17 26c2 1 4-1 6 0s4 2 6 0" strokeWidth="2.5" />
      {/* Water droplet */}
      <path d="M24 6c-3 4-4 6-4 8a4 4 0 0 0 8 0c0-2-1-4-4-8z" fill="currentColor" fillOpacity="0.3" strokeWidth="2" />
    </svg>
  ),

  cerveza: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="12" y="16" width="20" height="26" rx="3" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      <path d="M32 20h5a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-5" strokeWidth="3" />
      {/* Foam */}
      <path d="M10 16c0-3 3-5 6-4 2-3 6-3 8-1 2-2 5-1 6 2 2 0 4 2 4 4H10z" fill="currentColor" fillOpacity="0.3" strokeWidth="2.5" />
    </svg>
  ),

  postre: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 38 40 38 36 22 12 22z" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      <path d="M8 38h32" strokeWidth="3.5" />
      <path d="M12 22c0-5 5-9 12-9s12 4 12 9" strokeWidth="2.5" />
      <circle cx="24" cy="9" r="3" fill="currentColor" />
      <path d="M24 6c2-3 4-3 5-3" strokeWidth="2" />
    </svg>
  ),

  ensalada: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 24c0 10 7 16 16 16s16-6 16-16H8z" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      <path d="M14 24c-2-6 2-10 6-10 3 0 4 2 4 2s2-4 5-4c5 0 8 5 5 12" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
      <circle cx="28" cy="18" r="2" fill="currentColor" />
    </svg>
  ),

  // Action / Communication Board Pictograms
  quiero: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 24h18m-6-6l6 6-6 6" strokeWidth="3.5" />
      <path d="M38 12v24" strokeWidth="3" />
      <circle cx="10" cy="24" r="3" fill="currentColor" />
    </svg>
  ),

  por_favor: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Two hands gently meeting */}
      <path d="M14 36c4-10 7-18 10-24 1-2 3-2 4 0 3 6 6 14 10 24" fill="currentColor" fillOpacity="0.12" strokeWidth="3" />
      <path d="M24 12v24" strokeWidth="2.5" strokeDasharray="3 3" />
      <path d="M10 40h28" strokeWidth="3.5" />
    </svg>
  ),

  gracias: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Smiling face giving thanks */}
      <circle cx="24" cy="24" r="18" fill="currentColor" fillOpacity="0.12" strokeWidth="3" />
      <circle cx="18" cy="20" r="2" fill="currentColor" />
      <circle cx="30" cy="20" r="2" fill="currentColor" />
      <path d="M16 28c3 4 13 4 16 0" strokeWidth="3" />
    </svg>
  ),

  la_cuenta: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 8h24v32l-4-3-4 3-4-3-4 3-4-3-4 3V8z" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      <path d="M18 16h12" strokeWidth="2.5" />
      <path d="M18 22h12" strokeWidth="2.5" />
      <path d="M18 28h8" strokeWidth="2.5" />
      <circle cx="30" cy="28" r="1.5" fill="currentColor" />
    </svg>
  ),

  sin_hielo: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Ice cube */}
      <path d="M16 16l16-6 8 4-16 6-8-4z" strokeWidth="2.5" />
      <path d="M16 16v14l16 6V22" strokeWidth="2.5" />
      <path d="M40 14v14l-8 4" strokeWidth="2.5" />
      {/* Prohibition line */}
      <circle cx="24" cy="24" r="18" stroke="#ef4444" strokeWidth="3.5" />
      <path d="M11 11l26 26" stroke="#ef4444" strokeWidth="3.5" />
    </svg>
  ),

  con_hielo: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 18l14-6 10 5-14 6-10-5z" fill="currentColor" fillOpacity="0.2" strokeWidth="3" />
      <path d="M14 18v16l14 6V24" strokeWidth="3" />
      <path d="M38 17v16l-10 7" strokeWidth="3" />
      <circle cx="24" cy="24" r="18" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  ),

  sin_sal: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Salt shaker */}
      <path d="M18 16h12l3 22H15l3-22z" fill="currentColor" fillOpacity="0.15" strokeWidth="2.5" />
      <path d="M19 16c0-3 2-5 5-5s5 2 5 5" strokeWidth="2.5" />
      <circle cx="22" cy="24" r="1" fill="currentColor" />
      <circle cx="26" cy="24" r="1" fill="currentColor" />
      <circle cx="24" cy="28" r="1" fill="currentColor" />
      {/* Prohibition */}
      <circle cx="24" cy="24" r="18" stroke="#ef4444" strokeWidth="3.5" />
      <path d="M11 11l26 26" stroke="#ef4444" strokeWidth="3.5" />
    </svg>
  ),

  servilletas: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="10" y="22" width="28" height="18" rx="2" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      {/* Folded napkin sticking out */}
      <path d="M16 22l8-14 8 14H16z" fill="currentColor" fillOpacity="0.25" strokeWidth="2.5" />
      <path d="M24 8v14" strokeWidth="2" />
    </svg>
  ),

  para_llevar: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 16l4 24h20l4-24H10z" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      {/* Handle */}
      <path d="M18 16v-6a6 6 0 0 1 12 0v6" strokeWidth="3" />
    </svg>
  ),

  para_comer_aca: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Table and plate */}
      <path d="M6 24h36" strokeWidth="3.5" />
      <path d="M12 24v16M36 24v16" strokeWidth="3" />
      <ellipse cx="24" cy="20" rx="10" ry="4" fill="currentColor" fillOpacity="0.2" strokeWidth="2.5" />
      {/* Fork & knife */}
      <path d="M8 12v8M40 12v8" strokeWidth="2.5" />
    </svg>
  ),

  llamar_mozo: ({ className = 'w-10 h-10', size }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="24" cy="14" r="6" fill="currentColor" fillOpacity="0.15" strokeWidth="3" />
      <path d="M14 38v-8a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v8" strokeWidth="3" />
      {/* Raised hand */}
      <path d="M34 24l6-10 4 2-5 9" strokeWidth="2.5" />
    </svg>
  ),
};

export function getPictogramComponent(name: string): React.FC<PictogramProps> {
  const normalized = name.toLowerCase().replace(/\s+/g, '_');
  return Pictograms[normalized] || Pictograms.cafe;
}
