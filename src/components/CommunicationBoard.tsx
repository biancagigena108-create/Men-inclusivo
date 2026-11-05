import React from 'react';
import { 
  Volume2, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  Share2
} from 'lucide-react';
import { OrderBoardItem, AccessibilitySettings } from '../types/menu';
import { getPictogramComponent, Pictograms } from '../data/pictograms';
import { speechService } from '../utils/speech';

interface CommunicationBoardProps {
  items: OrderBoardItem[];
  settings: AccessibilitySettings;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearBoard: () => void;
  onToggleNote: (id: string, note: string) => void;
  onBackToMenu: () => void;
}

const COMMON_REQUESTS = [
  { id: 'por_favor', label: 'Por favor', pictogram: 'por_favor', phrase: 'Por favor' },
  { id: 'sin_hielo', label: 'Sin hielo', pictogram: 'sin_hielo', phrase: 'Sin hielo, por favor' },
  { id: 'con_hielo', label: 'Con hielo', pictogram: 'con_hielo', phrase: 'Con cubitos de hielo, por favor' },
  { id: 'sin_sal', label: 'Sin sal', pictogram: 'sin_sal', phrase: 'Sin sal agregada, por favor' },
  { id: 'agua', label: 'Vaso de agua', pictogram: 'agua', phrase: '¿Me traés un vaso de agua, por favor?' },
  { id: 'servilletas', label: 'Servilletas', pictogram: 'servilletas', phrase: '¿Me traés servilletas, por favor?' },
  { id: 'para_comer_aca', label: 'Para comer acá', pictogram: 'para_comer_aca', phrase: 'Es para consumir acá en el local' },
  { id: 'para_llevar', label: 'Para llevar', pictogram: 'para_llevar', phrase: 'Es para llevar en paquete' },
  { id: 'la_cuenta', label: 'La cuenta', pictogram: 'la_cuenta', phrase: '¿La cuenta por favor?' },
  { id: 'gracias', label: 'Muchas gracias', pictogram: 'gracias', phrase: 'Muchas gracias' },
  { id: 'llamar_mozo', label: 'Llamar mozo', pictogram: 'llamar_mozo', phrase: 'Disculpá, ¿me atendés un momento por favor?' },
];

export const CommunicationBoard: React.FC<CommunicationBoardProps> = ({
  items,
  settings,
  onUpdateQuantity,
  onRemoveItem,
  onClearBoard,
  onToggleNote,
  onBackToMenu,
}) => {
  const [activeRequests, setActiveRequests] = React.useState<string[]>([]);
  const [isFullScreenView, setIsFullScreenView] = React.useState(false);
  const [copiedNotification, setCopiedNotification] = React.useState(false);

  const toggleQuickRequest = (req: typeof COMMON_REQUESTS[0]) => {
    setActiveRequests((prev) => {
      const exists = prev.includes(req.label);
      if (exists) {
        return prev.filter((r) => r !== req.label);
      } else {
        speechService.speak(req.phrase, settings.speechRate);
        return [...prev, req.label];
      }
    });
  };

  const calculateTotal = () => {
    return items.reduce((acc, curr) => acc + curr.menuItem.price * curr.quantity, 0);
  };

  const generateFullPhrase = () => {
    if (items.length === 0 && activeRequests.length === 0) {
      return 'No hay platos seleccionados en el tablero.';
    }

    const itemPhrases = items.map((i) => {
      const notes = i.notes.length > 0 ? ` (${i.notes.join(', ')})` : '';
      return `${i.quantity} ${i.menuItem.name}${notes}`;
    });

    let sentence = 'Hola. Quisiera pedir: ';
    if (items.length > 0) {
      sentence += itemPhrases.join(', ') + '.';
    }
    if (activeRequests.length > 0) {
      sentence += ' ' + activeRequests.join(', ') + '.';
    }
    sentence += ' Muchas gracias.';
    return sentence;
  };

  const handleSpeakAll = () => {
    const text = generateFullPhrase();
    speechService.speak(text, settings.speechRate);
  };

  const handleCopyOrder = () => {
    const text = generateFullPhrase();
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const QuieroIcon = Pictograms.quiero || Pictograms.cafe;

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-6 ${isFullScreenView ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : ''}`}>
      {/* Top Banner and Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMenu}
            className="p-2 rounded-lg border border-stone-300 hover:bg-stone-100 transition-colors cursor-pointer text-stone-700"
            title="Volver a la carta completa"
            aria-label="Volver a la carta"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                Tablero de Comunicación (CAA)
              </h1>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Herramienta visual para armar tu pedido y comunicarte con el personal sin barreras.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsFullScreenView(!isFullScreenView)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors cursor-pointer"
            title="Modo pantalla grande para mostrar al mozo"
          >
            {isFullScreenView ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullScreenView ? 'Salir de Pantalla Grande' : 'Mostrar al Mozo'}</span>
          </button>

          {items.length > 0 && (
            <button
              onClick={onClearBoard}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
              title="Vaciar tablero"
            >
              <Trash2 className="w-4 h-4" />
              <span>Vaciar</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Order Box with Large Audio Button */}
      {(items.length > 0 || activeRequests.length > 0) && (
        <div className="my-6 p-5 bg-amber-50/80 border-2 border-amber-300 rounded-2xl shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-1">
                Frase Completa para el Mozo / Camarero:
              </span>
              <p className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                "{generateFullPhrase()}"
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleSpeakAll}
                className="flex items-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer focus:ring-4 focus:ring-amber-300"
              >
                <Volume2 className="w-5 h-5" />
                <span>Hablar en Voz Alta</span>
              </button>

              <button
                onClick={handleCopyOrder}
                className="p-3 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl transition-colors cursor-pointer"
                title="Copiar texto del pedido"
              >
                <Share2 className="w-5 h-5 text-stone-600" />
              </button>
            </div>
          </div>
          {copiedNotification && (
            <p className="text-xs font-bold text-emerald-800 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Texto copiado al portapapeles.</span>
            </p>
          )}
        </div>
      )}

      {/* Items Section */}
      <section className="my-6">
        <h2 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
          <span>1. Platos y Bebidas Elegidas ({items.length})</span>
        </h2>

        {items.length === 0 ? (
          <div className="p-8 text-center bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl">
            <div className="w-16 h-16 mx-auto mb-3 text-stone-400">
              <QuieroIcon className="w-full h-full" size={64} />
            </div>
            <h3 className="text-base font-bold text-stone-800 mb-1">
              Tu tablero de pedidos está vacío
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto mb-4">
              Andá a la carta y tocá "Agregar a Pedido" en los platos o bebidas que quieras ordenar.
            </p>
            <button
              onClick={onBackToMenu}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Explorar la Carta
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => {
              const PictogramComp = getPictogramComponent(item.menuItem.pictogramName);
              const subtotal = item.menuItem.price * item.quantity;
              const formattedSubtotal = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                maximumFractionDigits: 0,
              }).format(subtotal);

              return (
                <div
                  key={item.id}
                  className="p-4 bg-white border-2 border-stone-200 rounded-xl shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    {/* Big Pictogram */}
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 shrink-0">
                      <PictogramComp className="w-12 h-12 text-amber-950" size={48} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-extrabold text-stone-900 leading-tight">
                          {item.menuItem.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                          title="Eliminar del tablero"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                        {item.menuItem.simpleDescription}
                      </p>

                      <div className="text-sm font-extrabold text-stone-900 tabular-nums mt-2">
                        {formattedSubtotal}
                        {item.quantity > 1 && (
                          <span className="text-xs font-normal text-stone-500 ml-1">
                            (${item.menuItem.price} c/u)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Custom notes */}
                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    {/* Quick note buttons */}
                    <div className="flex flex-wrap gap-1">
                      {['Sin sal', 'Sin hielo', 'Para llevar'].map((note) => {
                        const isNoteActive = item.notes.includes(note);
                        return (
                          <button
                            key={note}
                            onClick={() => onToggleNote(item.id, note)}
                            className={`px-2 py-0.5 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                              isNoteActive
                                ? 'bg-amber-600 text-white'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                            }`}
                          >
                            {note}
                          </button>
                        );
                      })}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-stone-50 p-1 rounded-lg border border-stone-200">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-white rounded text-stone-700 transition-colors cursor-pointer"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-bold text-stone-900 px-2 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-white rounded text-stone-700 transition-colors cursor-pointer"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick Communication Cards (Frases Clave) */}
      <section className="my-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              2. Frases y Necesidades Rápidas (CAA)
            </h2>
            <p className="text-xs text-stone-600">
              Tocá cualquier pictograma para agregarlo a tu mensaje o hablar inmediatamente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {COMMON_REQUESTS.map((req) => {
            const PictogramComp = Pictograms[req.pictogram] || Pictograms.cafe;
            const isSelected = activeRequests.includes(req.label);

            return (
              <button
                key={req.id}
                onClick={() => toggleQuickRequest(req)}
                className={`p-3 rounded-xl border-2 text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50 shadow-md ring-2 ring-amber-500/20'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50 shadow-xs'
                }`}
                title={req.phrase}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-800'}`}>
                  <PictogramComp className="w-8 h-8" size={32} />
                </div>
                <span className="text-xs font-bold text-stone-900 leading-tight">
                  {req.label}
                </span>
                <span className="text-[10px] text-stone-500 flex items-center gap-0.5">
                  <Volume2 className="w-3 h-3 text-amber-600" />
                  <span>Tocar para oír</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Total and Print Order */}
      {items.length > 0 && (
        <div className="mt-8 p-5 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Total Estimado de la Mesa
            </span>
            <span className="text-2xl font-black tabular-nums text-amber-400">
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                maximumFractionDigits: 0,
              }).format(calculateTotal())}
            </span>
            <span className="text-xs text-stone-400 block mt-0.5">
              Conforme a los precios oficiales de la carta ordinaria (Art. 5º).
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSpeakAll}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Reproducir Pedido Completo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
