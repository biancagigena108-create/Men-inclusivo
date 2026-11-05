import React from 'react';
import { Volume2, VolumeX, SlidersHorizontal, BookOpen, Layers, Store, MessageSquareQuote } from 'lucide-react';
import { speechService } from '../utils/speech';

interface NavbarProps {
  currentView: 'menu' | 'board' | 'guide' | 'admin';
  onNavigate: (view: 'menu' | 'board' | 'guide' | 'admin') => void;
  onOpenAccessibility: () => void;
  orderCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAccessibility,
  orderCount,
}) => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  React.useEffect(() => {
    return speechService.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand wordmark (single line, no pills) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('menu')}
              className="text-left group cursor-pointer focus:outline-none"
              aria-label="Ir al inicio de Menú Inclusivo"
            >
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
                Menú Inclusivo
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single line, whitespace-nowrap) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-600 shrink-0">
            <button
              onClick={() => onNavigate('menu')}
              className={`flex items-center gap-2 py-1 transition-colors hover:text-stone-900 whitespace-nowrap cursor-pointer ${
                currentView === 'menu' ? 'text-stone-900 border-b-2 border-stone-900' : ''
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Ver Carta</span>
            </button>

            <button
              onClick={() => onNavigate('board')}
              className={`flex items-center gap-2 py-1 transition-colors hover:text-stone-900 whitespace-nowrap cursor-pointer ${
                currentView === 'board' ? 'text-stone-900 border-b-2 border-stone-900' : ''
              }`}
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Tablero CAA</span>
              {orderCount > 0 && (
                <span className="text-xs font-bold text-amber-700">
                  ({orderCount})
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('guide')}
              className={`flex items-center gap-2 py-1 transition-colors hover:text-stone-900 whitespace-nowrap cursor-pointer ${
                currentView === 'guide' ? 'text-stone-900 border-b-2 border-stone-900' : ''
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Ordenanza & Guía</span>
            </button>

            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-2 py-1 transition-colors hover:text-stone-900 whitespace-nowrap cursor-pointer ${
                currentView === 'admin' ? 'text-stone-900 border-b-2 border-stone-900' : ''
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Gestión de Local</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Accessibility Panel & Audio Toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            {isSpeaking && (
              <button
                onClick={() => speechService.stop()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors"
                title="Detener lectura de voz"
              >
                <VolumeX className="w-4 h-4 animate-pulse" />
                <span className="hidden sm:inline">Detener voz</span>
              </button>
            )}

            <button
              onClick={onOpenAccessibility}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-stone-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer shadow-xs"
              aria-label="Abrir panel de ajustes de accesibilidad"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-800" />
              <span className="whitespace-nowrap">Accesibilidad</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-stone-100 text-xs font-semibold">
          <button
            onClick={() => onNavigate('menu')}
            className={`px-2 py-1 rounded cursor-pointer ${currentView === 'menu' ? 'text-amber-800 bg-amber-50 font-bold' : 'text-stone-600'}`}
          >
            Carta
          </button>
          <button
            onClick={() => onNavigate('board')}
            className={`px-2 py-1 rounded cursor-pointer flex items-center gap-1 ${currentView === 'board' ? 'text-amber-800 bg-amber-50 font-bold' : 'text-stone-600'}`}
          >
            <span>Tablero</span>
            {orderCount > 0 && <span className="font-bold text-amber-700">({orderCount})</span>}
          </button>
          <button
            onClick={() => onNavigate('guide')}
            className={`px-2 py-1 rounded cursor-pointer ${currentView === 'guide' ? 'text-amber-800 bg-amber-50 font-bold' : 'text-stone-600'}`}
          >
            Ordenanza
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className={`px-2 py-1 rounded cursor-pointer ${currentView === 'admin' ? 'text-amber-800 bg-amber-50 font-bold' : 'text-stone-600'}`}
          >
            Local
          </button>
        </div>
      </div>
    </header>
  );
};
