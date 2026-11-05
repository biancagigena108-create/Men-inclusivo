import React from 'react';
import { X, Volume2, Info, Printer } from 'lucide-react';
import { textToBrailleCells, textToBrailleString, BrailleCellData } from '../utils/braille';
import { speechService } from '../utils/speech';

interface BrailleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price?: number;
  description?: string;
}

export const BrailleModal: React.FC<BrailleModalProps> = ({
  isOpen,
  onClose,
  title,
  price,
  description,
}) => {
  if (!isOpen) return null;

  const fullText = price ? `${title} $${price}` : title;
  const brailleCells = textToBrailleCells(fullText);
  const brailleString = textToBrailleString(fullText);

  const speakDots = (cell: BrailleCellData) => {
    const activeDots: number[] = [];
    cell.dots.forEach((active, index) => {
      if (active) activeDots.push(index + 1);
    });

    const charName = cell.isNumberSign ? 'Prefijo numérico' : cell.char;
    const dotsText = activeDots.length > 0 
      ? `Puntos ${activeDots.join(', ')}` 
      : 'Celda en blanco';
    speechService.speak(`${charName}: ${dotsText}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="braille-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-300 p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold text-amber-700">
              Artículo 14º - Sistema Braille Oficial
            </span>
            <h2 id="braille-modal-title" className="text-xl font-bold text-stone-900">
              Transcripción Táctil en Braille
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Cerrar modal de Braille"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text and Braille string */}
        <div className="my-5 p-4 bg-stone-50 rounded-lg border border-stone-200">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            Texto Ordinario:
          </p>
          <p className="text-lg font-bold text-stone-900 mb-3">{fullText}</p>

          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
            Caracteres Braille Unicode (Lectura Táctil):
          </p>
          <div className="p-3 bg-white rounded border border-stone-300 flex items-center justify-between">
            <span className="text-3xl font-mono tracking-widest text-stone-950 select-all">
              {brailleString}
            </span>
            <button
              onClick={() => speechService.speak(`Transcripción Braille de: ${fullText}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded border border-amber-200 transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>Escuchar</span>
            </button>
          </div>
        </div>

        {/* Matrix decomposition: 6-dot matrix cell breakdown */}
        <div className="my-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Desglose Celda por Celda (Matriz 3×2)
              </h3>
              <p className="text-xs text-stone-600">
                Puntos 1, 2, 3 en columna izquierda y 4, 5, 6 en columna derecha. Tocá una celda para oír los puntos activos.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 max-h-64 overflow-y-auto p-3 bg-stone-100 rounded-lg border border-stone-200">
            {brailleCells.map((cell, idx) => (
              <button
                key={idx}
                onClick={() => speakDots(cell)}
                className="flex flex-col items-center justify-center p-2 bg-white rounded-md border border-stone-300 hover:border-amber-500 hover:shadow-xs transition-all cursor-pointer min-w-[48px]"
                title={`Carácter: ${cell.char}. Clic para oír puntos.`}
              >
                {/* 3x2 Matrix visual representation */}
                <div className="grid grid-cols-2 grid-rows-3 gap-1.5 p-1 bg-stone-50 rounded border border-stone-200">
                  {/* Dot 1 (top-left) */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      cell.dots[0] ? 'bg-stone-900 shadow-xs' : 'border border-stone-300 bg-white'
                    }`}
                  />
                  {/* Dot 4 (top-right) */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      cell.dots[3] ? 'bg-stone-900 shadow-xs' : 'border border-stone-300 bg-white'
                    }`}
                  />
                  {/* Dot 2 (mid-left) */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      cell.dots[1] ? 'bg-stone-900 shadow-xs' : 'border border-stone-300 bg-white'
                    }`}
                  />
                  {/* Dot 5 (mid-right) */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      cell.dots[4] ? 'bg-stone-900 shadow-xs' : 'border border-stone-300 bg-white'
                    }`}
                  />
                  {/* Dot 3 (bottom-left) */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      cell.dots[2] ? 'bg-stone-900 shadow-xs' : 'border border-stone-300 bg-white'
                    }`}
                  />
                  {/* Dot 6 (bottom-right) */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      cell.dots[5] ? 'bg-stone-900 shadow-xs' : 'border border-stone-300 bg-white'
                    }`}
                  />
                </div>

                <span className="text-xs font-bold text-stone-800 mt-1">
                  {cell.char === ' ' ? '␣' : cell.char}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {cell.brailleChar}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Technical specs per Art. 6º and Art. 14º */}
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <Info className="w-4 h-4 shrink-0 text-amber-700" />
            <span>Especificaciones Técnicas para Impresión Táctil (Art. 6º):</span>
          </div>
          <p>
            • Papel de gramaje óptimo (160g a 240g recomendado), tamaño estándar A4.
          </p>
          <p>
            • El relieve debe mantener altura mínima de 0.5mm para lectura por tacto con yemas de los dedos.
          </p>
          <p>
            • Cada comercio debe contar con al menos una copia física en cada mesa y barra de atención (Art. 7.a).
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 mt-4">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Hoja de Guía</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
