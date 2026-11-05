import React from 'react';
import { X, Printer, Award, ShieldCheck, Heart } from 'lucide-react';
import { Venue } from '../types/menu';
import { generateQRCodeSvg } from '../utils/qrCode';
import { textToBrailleString } from '../utils/braille';

interface ObleaModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
}

export const ObleaModal: React.FC<ObleaModalProps> = ({
  isOpen,
  onClose,
  venue,
}) => {
  if (!isOpen) return null;

  const qrSvg = generateQRCodeSvg(window.location.href, 130);
  const brailleOblea = textToBrailleString('comercio inclusivo');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="oblea-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-300 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Artículo 8º de la Ordenanza Municipal
            </span>
            <h2 id="oblea-modal-title" className="text-xl font-black text-stone-900">
              Oblea Oficial de Comercio Inclusivo
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative summary */}
        <p className="text-xs text-stone-600 my-3">
          Esta oblea se exhibe en la puerta o vidriera del establecimiento para certificar ante los vecinos y visitantes que el local cuenta con cartas adaptadas con pictogramas y sistema Braille.
        </p>

        {/* PRINTABLE BADGE / OBLEA (Physical sticker layout) */}
        <div className="my-6 p-8 bg-gradient-to-br from-amber-50 via-white to-stone-50 border-4 border-amber-600 rounded-3xl shadow-lg text-center relative overflow-hidden print:border-4 print:shadow-none">
          {/* Decorative Corner Seals */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/10 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-600/10 rounded-tr-full pointer-events-none" />

          {/* Municipal Header */}
          <div className="mb-4">
            <p className="text-[11px] font-black tracking-widest text-stone-600 uppercase">
              Municipalidad de Vicuña Mackenna · Córdoba
            </p>
            <p className="text-xs font-bold text-stone-900">
              Secretaría de Desarrollo Social · Área de Bromatología
            </p>
          </div>

          {/* Central Badge Emblem */}
          <div className="w-20 h-20 mx-auto my-3 bg-amber-600 text-white rounded-2xl flex items-center justify-center shadow-md">
            <Award className="w-12 h-12" />
          </div>

          <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-800">
            Establecimiento Adherido
          </h3>

          <h1 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight my-1">
            {venue.name}
          </h1>

          <p className="text-xs font-semibold text-stone-600 mb-4">
            {venue.address} — {venue.city}
          </p>

          <div className="inline-block py-2 px-4 bg-stone-900 text-white rounded-xl font-black text-sm tracking-wide mb-5">
            COMERCIO GASTRONÓMICO INCLUSIVO
          </div>

          <p className="text-xs text-stone-800 font-bold max-w-md mx-auto mb-2">
            Disponemos de Carta Accesible con Pictogramas Universales (CAA) y Sistema Braille para personas con TEA, discapacidad visual, cognitiva o afasia.
          </p>

          <div className="font-mono text-sm tracking-widest font-bold text-stone-900 mb-6">
            {brailleOblea}
          </div>

          {/* Bottom validation block */}
          <div className="pt-4 border-t-2 border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <p className="text-[11px] font-bold text-stone-900">
                Registro Oficial: {venue.adhesionNumber}
              </p>
              <p className="text-[10px] text-stone-500">
                Conforme a la Ordenanza Municipal de Menú Inclusivo y Ley Nacional Nº 26.378
              </p>
            </div>

            <div className="w-20 h-20 bg-white p-1 rounded-lg border border-stone-300 shrink-0">
              <div
                dangerouslySetInnerHTML={{ __html: qrSvg }}
                className="w-full h-full flex items-center justify-center"
              />
            </div>
          </div>
        </div>

        {/* Modal actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Oblea Oficial</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
