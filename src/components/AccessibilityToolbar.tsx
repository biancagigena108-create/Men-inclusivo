import React from 'react';
import { X, Check, Volume2, Type, Eye, Sparkles, RefreshCw } from 'lucide-react';
import { AccessibilitySettings, AccessibilityTheme, FontFamilyChoice } from '../types/menu';

interface AccessibilityToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onReset: () => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-stone-300 p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h2 id="accessibility-panel-title" className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-600" />
              <span>Ajustes de Accesibilidad</span>
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Conforme a los estándares de diseño universal y Art. 6º de la Ordenanza Municipal.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar ajustes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 py-4">
          {/* 1. Font Size */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2">
              Tamaño de Letra (Mínimo 14pt según Art. 6º):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { size: 14, label: '14px (Estándar)' },
                { size: 18, label: '18px (Grande)' },
                { size: 22, label: '22px (Muy Grande)' },
                { size: 26, label: '26px (Máxima)' },
              ].map(({ size, label }) => (
                <button
                  key={size}
                  onClick={() => onUpdateSettings({ fontSize: size })}
                  className={`p-2.5 text-center rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    settings.fontSize === size
                      ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/30'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span className="block text-base">{size}</span>
                  <span className="text-[10px] font-medium text-stone-500">{label.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Color Theme / Contrast */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2">
              Modo de Contraste y Perfil Visual:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: 'standard' as AccessibilityTheme,
                  name: 'Estándar Limpio',
                  desc: 'Fondo cálido de alto contraste equilibrado',
                  preview: 'bg-stone-50 text-stone-900 border-stone-300',
                },
                {
                  id: 'high-contrast-yellow' as AccessibilityTheme,
                  name: 'Alto Contraste Amarillo',
                  desc: 'Fondo negro con texto amarillo (Baja visión)',
                  preview: 'bg-black text-yellow-300 border-yellow-400',
                },
                {
                  id: 'high-contrast-white' as AccessibilityTheme,
                  name: 'Alto Contraste Inverso',
                  desc: 'Fondo negro absoluto con texto blanco puro',
                  preview: 'bg-black text-white border-white',
                },
                {
                  id: 'sensory-calm' as AccessibilityTheme,
                  name: 'Calma Sensorial (TEA)',
                  desc: 'Bajo estímulo visual, reduce sobrecarga cognitiva',
                  preview: 'bg-slate-100 text-slate-800 border-slate-300',
                },
              ].map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => onUpdateSettings({ theme: themeOption.id })}
                  className={`p-3 rounded-lg border text-left flex items-start justify-between transition-all cursor-pointer ${
                    settings.theme === themeOption.id
                      ? 'border-amber-600 ring-2 ring-amber-500/30'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border ${themeOption.preview}`} />
                      <span className="text-xs font-bold text-stone-900">{themeOption.name}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">{themeOption.desc}</p>
                  </div>
                  {settings.theme === themeOption.id && (
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Typography Choice */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2">
              Tipografía Legible (Art. 6º):
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'atkinson' as FontFamilyChoice, name: 'Atkinson Hyperlegible', note: 'Para baja visión' },
                { id: 'verdana' as FontFamilyChoice, name: 'Verdana (Art. 6º)', note: 'Letra amplia y clara' },
                { id: 'helvetica' as FontFamilyChoice, name: 'Helvética / Sans', note: 'Universal y limpia' },
                { id: 'opendyslexic' as FontFamilyChoice, name: 'OpenDyslexic / Gruesa', note: 'Apoyo para dislexia' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => onUpdateSettings({ fontFamily: f.id })}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    settings.fontFamily === f.id
                      ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-500'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900">{f.name}</p>
                  <p className="text-[10px] text-stone-500">{f.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Speech Rate */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>Velocidad de Lectura por Voz:</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { rate: 0.8, label: '0.8x (Pausada)' },
                { rate: 1.0, label: '1.0x (Normal)' },
                { rate: 1.2, label: '1.2x (Rápida)' },
              ].map(({ rate, label }) => (
                <button
                  key={rate}
                  onClick={() => onUpdateSettings({ speechRate: rate })}
                  className={`p-2 text-center rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    settings.speechRate === rate
                      ? 'border-amber-600 bg-amber-50 text-amber-900'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Extra Toggles */}
          <div className="pt-2 border-t border-stone-200 space-y-3">
            <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-stone-50">
              <div>
                <span className="text-xs font-bold text-stone-900 block">Resaltar Pictogramas CAA</span>
                <span className="text-[11px] text-stone-500">Aumenta el contraste y trazo de los pictogramas</span>
              </div>
              <input
                type="checkbox"
                checked={settings.highlightPictograms}
                onChange={(e) => onUpdateSettings({ highlightPictograms: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-stone-50">
              <div>
                <span className="text-xs font-bold text-stone-900 block">Vista Simplificada</span>
                <span className="text-[11px] text-stone-500">Oculta información secundaria para evitar sobrecarga</span>
              </div>
              <input
                type="checkbox"
                checked={settings.simplifiedView}
                onChange={(e) => onUpdateSettings({ simplifiedView: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer valores predeterminados</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Aplicar y Volver
          </button>
        </div>
      </div>
    </div>
  );
};
