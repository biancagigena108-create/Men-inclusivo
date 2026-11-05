import React from 'react';
import { X, Printer, QrCode, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Venue, MenuItem } from '../types/menu';
import { getPictogramComponent } from '../data/pictograms';
import { textToBrailleString } from '../utils/braille';
import { generateQRCodeSvg } from '../utils/qrCode';

interface PrintableMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
}

export const PrintableMenuModal: React.FC<PrintableMenuModalProps> = ({
  isOpen,
  onClose,
  venue,
}) => {
  const [printMode, setPrintMode] = React.useState<'menu' | 'stand'>('menu');

  if (!isOpen) return null;

  // Generate SVG QR code for venue
  const shareUrl = window.location.href;
  const qrSvg = generateQRCodeSvg(shareUrl, 160);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="printable-menu-title"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-stone-300 p-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Ordenanza Municipal Vicuña Mackenna
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs font-semibold text-stone-500">
                Artículos 2º, 6º y 7º
              </span>
            </div>
            <h2 id="printable-menu-title" className="text-xl font-black text-stone-900">
              Generador de Carta Imprimible y Carteles de Mesa
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Documento</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 py-3 border-b border-stone-100 shrink-0">
          <button
            onClick={() => setPrintMode('menu')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              printMode === 'menu'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Carta A4 Reglamentaria (Pictogramas + Braille)</span>
          </button>

          <button
            onClick={() => setPrintMode('stand')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              printMode === 'stand'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Cartel de Mesa y Barra con Código QR (Art. 7.a)</span>
          </button>
        </div>

        {/* Paper & Quality Compliance Notice */}
        <div className="py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-600 my-2 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Pautas de Confección (Art. 6º):</strong> Papel no brillante ni plastificado, alto gramaje (160g+), alto contraste, tipografía mínima de 14pt y celdas Braille para repujado táctil.
            </span>
          </div>
        </div>

        {/* Printable Preview Container */}
        <div className="flex-1 overflow-y-auto p-4 bg-stone-100 rounded-lg border border-stone-200">
          {printMode === 'menu' ? (
            /* PRINTABLE MENU PAGE (A4 emulation) */
            <div className="bg-white p-8 max-w-[210mm] mx-auto shadow-md border border-stone-300 print:shadow-none print:border-none print:p-0">
              {/* Header */}
              <div className="border-b-2 border-stone-900 pb-4 mb-6 flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-black text-stone-950 tracking-tight">
                    {venue.name}
                  </h1>
                  <p className="text-sm font-semibold text-stone-800">
                    {venue.address} — {venue.city}
                  </p>
                  <p className="text-xs text-stone-600">
                    Tel: {venue.phone} · Horarios: {venue.openingHours}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-stone-900 block border border-stone-900 px-2 py-0.5 rounded">
                    CARTA INCLUSIVA ACCESIBLE
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono block mt-1">
                    Reg. {venue.adhesionNumber}
                  </span>
                </div>
              </div>

              {/* Items grouped by category */}
              <div className="space-y-6">
                {venue.categories.map((category) => {
                  const categoryItems = venue.items.filter((i) => i.category === category.id);
                  if (categoryItems.length === 0) return null;

                  return (
                    <section key={category.id} className="pb-4 border-b border-stone-200">
                      <div className="flex items-center gap-2 mb-3 bg-stone-100 p-2 rounded border border-stone-300">
                        <h2 className="text-base font-extrabold text-stone-900 uppercase tracking-wide">
                          {category.name}
                        </h2>
                        <span className="text-xs font-mono text-stone-700">
                          [{textToBrailleString(category.name)}]
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {categoryItems.map((item) => {
                          const PictogramComp = getPictogramComponent(item.pictogramName);
                          const brailleCode = textToBrailleString(item.name);

                          return (
                            <div
                              key={item.id}
                              className="p-3 border-2 border-stone-800 rounded-lg flex items-start gap-3 bg-white"
                            >
                              {/* High contrast pictogram box */}
                              <div className="p-2 border-2 border-stone-900 rounded bg-stone-50 shrink-0">
                                <PictogramComp className="w-10 h-10 text-stone-950" size={40} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1">
                                  <h3 className="text-sm font-black text-stone-950 leading-tight">
                                    {item.name}
                                  </h3>
                                  <span className="text-sm font-black text-stone-950 tabular-nums shrink-0 ml-1">
                                    ${item.price}
                                  </span>
                                </div>

                                {item.foreignTerm && (
                                  <p className="text-[11px] text-stone-700 italic">
                                    {item.foreignTerm} ({item.foreignTranslation})
                                  </p>
                                )}

                                <p className="text-xs text-stone-800 mt-1 leading-snug">
                                  {item.simpleDescription}
                                </p>

                                {/* Braille embossed guidance line */}
                                <div className="mt-2 pt-1 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-600 font-mono">
                                  <span className="tracking-widest font-bold text-stone-950 select-all">
                                    {brailleCode}
                                  </span>
                                  <span className="text-[9px] uppercase font-sans font-semibold text-stone-400">
                                    Guía Braille
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>

              {/* Bottom Print Footer */}
              <div className="mt-8 pt-4 border-t-2 border-stone-900 text-center text-xs text-stone-600">
                <p className="font-semibold text-stone-900">
                  Carta adaptada bajo la Ordenanza de Menú Inclusivo — Municipalidad de Vicuña Mackenna.
                </p>
                <p className="text-[11px] mt-0.5">
                  Ley Nacional Nº 26.378 · Convención sobre los Derechos de las Personas con Discapacidad (Ley 27.044)
                </p>
              </div>
            </div>
          ) : (
            /* PRINTABLE TABLE QR STAND (Art. 7.a) */
            <div className="bg-white p-8 max-w-[148mm] mx-auto shadow-md border-2 border-stone-900 rounded-2xl text-center print:shadow-none print:border-2">
              <span className="inline-block text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-md mb-3">
                MESA Y BARRA ACCESIBLE · ART. 7º
              </span>

              <h1 className="text-2xl font-black text-stone-950 tracking-tight mb-1">
                {venue.name}
              </h1>
              <p className="text-xs text-stone-600 mb-6 font-semibold">
                {venue.address} — {venue.city}
              </p>

              {/* QR Code Container */}
              <div className="w-48 h-48 mx-auto p-4 bg-white border-4 border-stone-950 rounded-2xl flex items-center justify-center shadow-xs">
                <div
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                  className="w-full h-full flex items-center justify-center"
                />
              </div>

              <div className="my-6">
                <p className="text-base font-extrabold text-stone-950">
                  Escaneá con tu celular para abrir la Carta Inclusiva
                </p>
                <p className="text-xs text-stone-700 max-w-xs mx-auto mt-1">
                  Incluye lector de voz en español, pictogramas universales CAA y configuraciones para personas con TEA o baja visión.
                </p>
              </div>

              {/* Braille notice */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-300 text-xs text-stone-800 mb-6">
                <p className="font-bold text-stone-900 mb-0.5">
                  ¿Necesitás la carta física en Sistema Braille o Macrotipo?
                </p>
                <p className="text-stone-600">
                  Solicitásela con confianza a nuestro personal de atención. Está disponible en todas nuestras mesas.
                </p>
                <p className="font-mono text-sm tracking-widest font-bold text-stone-900 mt-2">
                  {textToBrailleString('carta braille disponible')}
                </p>
              </div>

              <div className="text-[10px] text-stone-400 border-t border-stone-200 pt-3">
                Comercio Adherido al Programa de Gastronomía Inclusiva · Registro {venue.adhesionNumber}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
