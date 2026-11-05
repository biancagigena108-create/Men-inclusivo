import React from 'react';
import { Volume2, Plus, Maximize2, X, AlertCircle } from 'lucide-react';
import { MenuItem, AccessibilitySettings } from '../types/menu';
import { getPictogramComponent } from '../data/pictograms';
import { ALLERGENS } from '../data/allergens';
import { textToBrailleString } from '../utils/braille';
import { speechService } from '../utils/speech';

interface MenuCardProps {
  item: MenuItem;
  settings: AccessibilitySettings;
  onOpenBraille: (item: MenuItem) => void;
  onAddToBoard: (item: MenuItem) => void;
  inBoardCount?: number;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  settings,
  onOpenBraille,
  onAddToBoard,
  inBoardCount = 0,
}) => {
  const [isPhotoZoomed, setIsPhotoZoomed] = React.useState(false);
  const PictogramComp = getPictogramComponent(item.pictogramName);
  const brailleShort = textToBrailleString(item.name);

  // Formatting price
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(item.price);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    const translationText = item.foreignTranslation ? `, traducción: ${item.foreignTranslation}` : '';
    const allergensText = item.allergens.length > 0 
      ? `. Contiene o es apto para: ${item.allergens.map(a => ALLERGENS[a]?.shortLabel).join(', ')}` 
      : '';
    const textToRead = `${item.name}${translationText}. Precio: ${formattedPrice}. ${item.simpleDescription}${allergensText}`;
    speechService.speak(textToRead, settings.speechRate);
  };

  // Determine CSS classes according to active theme
  const getCardThemeClasses = () => {
    switch (settings.theme) {
      case 'high-contrast-yellow':
        return 'bg-black text-yellow-300 border-2 border-yellow-400 shadow-none';
      case 'high-contrast-white':
        return 'bg-black text-white border-2 border-white shadow-none';
      case 'sensory-calm':
        return 'bg-slate-50 text-slate-800 border border-slate-300 shadow-none';
      default:
        return 'bg-white text-stone-900 border border-stone-200 shadow-xs hover:shadow-md';
    }
  };

  const getSubtleThemeClasses = () => {
    switch (settings.theme) {
      case 'high-contrast-yellow':
        return 'text-yellow-200 border-yellow-500/40';
      case 'high-contrast-white':
        return 'text-stone-300 border-stone-700';
      case 'sensory-calm':
        return 'text-slate-600 border-slate-200';
      default:
        return 'text-stone-600 border-stone-200';
    }
  };

  const getPictogramBoxTheme = () => {
    switch (settings.theme) {
      case 'high-contrast-yellow':
        return 'bg-yellow-400 text-black border-2 border-yellow-300';
      case 'high-contrast-white':
        return 'bg-white text-black border-2 border-white';
      case 'sensory-calm':
        return 'bg-blue-50 text-blue-900 border border-blue-200';
      default:
        return 'bg-white text-stone-900 border border-stone-300 shadow-sm';
    }
  };

  return (
    <>
      <article
        className={`rounded-2xl overflow-hidden flex flex-col justify-between transition-all relative ${getCardThemeClasses()}`}
        style={{
          fontSize: `${settings.fontSize}px`,
          lineHeight: 1.45,
        }}
      >
        {/* Top: High Resolution Food Photography (Art. 7.b) */}
        {item.imageUrl ? (
          <div className="relative w-full h-48 sm:h-52 bg-stone-100 overflow-hidden group">
            <img
              src={item.imageUrl}
              alt={item.imageAlt || `Fotografía de ${item.name}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              onClick={() => setIsPhotoZoomed(true)}
              loading="lazy"
            />
            {/* Dark gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* CAA Pictogram Badge Overlay (Top Left) */}
            <div
              className={`absolute top-3 left-3 p-2 rounded-xl flex items-center justify-center ${getPictogramBoxTheme()} ${
                settings.highlightPictograms ? 'ring-2 ring-amber-500 scale-105' : ''
              }`}
              title={`Pictograma CAA de ${item.name}`}
            >
              <PictogramComp className="w-8 h-8" size={32} />
            </div>

            {/* Zoom affordance & Temperature */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <button
                onClick={() => setIsPhotoZoomed(true)}
                className="p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-xs transition-colors cursor-pointer"
                title="Ver foto en tamaño completo"
                aria-label={`Ampliar foto de ${item.name}`}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Dish title over subtle scrim */}
            <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
              <h3 className="font-extrabold text-lg text-white drop-shadow-md leading-tight">
                {item.name}
              </h3>
            </div>
          </div>
        ) : (
          /* Fallback styled container with pictogram */
          <div className="p-4 bg-amber-50/70 border-b border-stone-200 flex items-center justify-between">
            <div className={`p-2.5 rounded-xl ${getPictogramBoxTheme()}`}>
              <PictogramComp className="w-10 h-10" size={40} />
            </div>
            <h3 className="font-extrabold text-base tracking-tight flex-1 ml-3 text-stone-900">
              {item.name}
            </h3>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Foreign Term Translation (Art. 7.c) */}
            {item.foreignTerm && (
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">
                <span className="italic font-bold">{item.foreignTerm}</span>
                {' '}
                <span className="font-normal">
                  ({item.foreignTranslation || 'traducción al español'})
                </span>
              </p>
            )}

            {/* Unicode Braille string preview */}
            <div
              className="text-stone-500 text-xs font-mono mb-3 select-all cursor-pointer hover:text-stone-900 transition-colors flex items-center justify-between"
              onClick={() => onOpenBraille(item)}
              title="Transcripción en caracteres Braille. Clic para ver celdas."
            >
              <div>
                <span className="opacity-75">Braille: </span>
                <span className="tracking-widest font-bold text-stone-900 dark:text-stone-100">{brailleShort}</span>
              </div>
              <button
                type="button"
                className="text-[11px] font-sans font-bold text-amber-700 hover:underline"
              >
                Ver celdas (Art. 14º)
              </button>
            </div>

            {/* Simple Description for cognitive / aphasia accessibility */}
            <p className={`text-xs sm:text-sm leading-relaxed ${getSubtleThemeClasses()}`}>
              {item.simpleDescription}
            </p>

            {/* Ingredients list (simplified) */}
            {!settings.simplifiedView && item.ingredients.length > 0 && (
              <div className="mt-3 pt-2 border-t border-stone-200/60 text-xs">
                <span className="font-bold opacity-80">Ingredientes: </span>
                <span className="opacity-90">{item.ingredients.join(', ')}.</span>
              </div>
            )}

            {/* Allergens badges */}
            {item.allergens.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-stone-200/60">
                {item.allergens.map((alg) => {
                  const info = ALLERGENS[alg];
                  if (!info) return null;
                  return (
                    <span
                      key={alg}
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-300"
                      title={info.description}
                    >
                      <span>{info.shortLabel}</span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom row: Price, Speech and Add to Communication Board */}
          <div className="pt-4 mt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75 block">
                Precio Oficial
              </span>
              <span className="text-xl font-black tabular-nums tracking-tight">
                {formattedPrice}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Quick Speech Button */}
              <button
                onClick={handleSpeak}
                className="p-2.5 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-800 transition-colors cursor-pointer flex items-center gap-1 focus:ring-2 focus:ring-amber-500"
                aria-label={`Escuchar descripción de ${item.name}`}
                title="Escuchar descripción en voz alta"
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span className="sr-only">Escuchar</span>
              </button>

              {/* Add to Board Button */}
              <button
                onClick={() => onAddToBoard(item)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer focus:ring-2 focus:ring-amber-500 ${
                  inBoardCount > 0
                    ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-xs'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
                aria-label={`Agregar ${item.name} al tablero de pedido CAA`}
              >
                <Plus className="w-4 h-4" />
                <span>{inBoardCount > 0 ? `En Pedido (${inBoardCount})` : 'Agregar'}</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Lightbox / Zoom Modal for inspecting dish details & textures */}
      {isPhotoZoomed && item.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={item.imageUrl}
                alt={item.imageAlt || item.name}
                className="w-full h-full max-h-[70vh] object-contain"
              />
              <button
                onClick={() => setIsPhotoZoomed(false)}
                className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                aria-label="Cerrar imagen ampliada"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-stone-900">{item.name}</h3>
                <p className="text-xs text-stone-600 mt-1">{item.simpleDescription}</p>
                {item.ingredients.length > 0 && (
                  <p className="text-xs text-stone-500 mt-1">
                    <strong>Ingredientes:</strong> {item.ingredients.join(', ')}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-black text-amber-700 tabular-nums">
                  {formattedPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
