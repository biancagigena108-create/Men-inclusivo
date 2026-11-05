import React from 'react';
import { 
  Store, 
  Search, 
  Filter, 
  Sparkles, 
  Volume2, 
  FileText, 
  Award, 
  MapPin, 
  Phone, 
  Clock, 
  Check, 
  ChevronRight,
  Info,
  UtensilsCrossed,
  Printer
} from 'lucide-react';
import { 
  Venue, 
  MenuItem, 
  OrderBoardItem, 
  AccessibilitySettings, 
  AllergenType 
} from './types/menu';
import { SAMPLE_VENUES } from './data/sampleVenues';
import { ALLERGENS } from './data/allergens';
import { Navbar } from './components/Navbar';
import { MenuCard } from './components/MenuCard';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { CommunicationBoard } from './components/CommunicationBoard';
import { BrailleModal } from './components/BrailleModal';
import { PrintableMenuModal } from './components/PrintableMenuModal';
import { ObleaModal } from './components/ObleaModal';
import { OrdinanceGuide } from './components/OrdinanceGuide';
import { AdminEditor } from './components/AdminEditor';
import { speechService } from './utils/speech';

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 16,
  theme: 'standard',
  fontFamily: 'atkinson',
  speechRate: 0.95,
  highlightPictograms: false,
  simplifiedView: false,
  audioAutoplayDescription: false,
};

export default function App() {
  // Venues state
  const [venues, setVenues] = React.useState<Venue[]>(() => {
    const saved = localStorage.getItem('mi_venues_data');
    if (saved) {
      try {
        const parsed: Venue[] = JSON.parse(saved);
        // Hydrate existing venues with new photography if image was empty
        return parsed.map((v) => {
          const sample = SAMPLE_VENUES.find((sv) => sv.id === v.id);
          if (!sample) return v;
          return {
            ...v,
            items: v.items.map((it) => {
              const sampleItem = sample.items.find((si) => si.id === it.id);
              if (sampleItem && sampleItem.imageUrl) {
                return {
                  ...it,
                  name: sampleItem.name,
                  foreignTerm: sampleItem.foreignTerm,
                  foreignTranslation: sampleItem.foreignTranslation,
                  simpleDescription: sampleItem.simpleDescription,
                  imageUrl: sampleItem.imageUrl,
                  imageAlt: sampleItem.imageAlt,
                };
              }
              return it;
            }),
          };
        });
      } catch (e) {
        console.error(e);
      }
    }
    return SAMPLE_VENUES;
  });

  const [currentVenueId, setCurrentVenueId] = React.useState<string>(SAMPLE_VENUES[0].id);

  // Settings state
  const [settings, setSettings] = React.useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('mi_accessibility_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  // Communication board items
  const [orderItems, setOrderItems] = React.useState<OrderBoardItem[]>(() => {
    const saved = localStorage.getItem('mi_order_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  // UI Navigation & Filters
  const [currentView, setCurrentView] = React.useState<'menu' | 'board' | 'guide' | 'admin'>('menu');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedAllergen, setSelectedAllergen] = React.useState<AllergenType | 'all'>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Modals
  const [isAccessibilityOpen, setIsAccessibilityOpen] = React.useState(false);
  const [brailleItem, setBrailleItem] = React.useState<MenuItem | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = React.useState(false);
  const [isObleaModalOpen, setIsObleaModalOpen] = React.useState(false);

  // Persistence
  React.useEffect(() => {
    localStorage.setItem('mi_venues_data', JSON.stringify(venues));
  }, [venues]);

  React.useEffect(() => {
    localStorage.setItem('mi_accessibility_settings', JSON.stringify(settings));
  }, [settings]);

  React.useEffect(() => {
    localStorage.setItem('mi_order_items', JSON.stringify(orderItems));
  }, [orderItems]);

  const currentVenue = venues.find((v) => v.id === currentVenueId) || venues[0];

  // Font class mapping
  const getFontFamilyClass = () => {
    switch (settings.fontFamily) {
      case 'verdana':
        return 'font-[Verdana,Geneva,sans-serif]';
      case 'helvetica':
        return 'font-[Helvetica,Arial,sans-serif]';
      case 'opendyslexic':
        return 'font-sans font-medium tracking-wide';
      case 'atkinson':
      default:
        return 'font-sans';
    }
  };

  // Theme container classes
  const getThemeContainerClass = () => {
    switch (settings.theme) {
      case 'high-contrast-yellow':
        return 'bg-black text-yellow-300 min-h-screen';
      case 'high-contrast-white':
        return 'bg-black text-white min-h-screen';
      case 'sensory-calm':
        return 'bg-slate-100 text-slate-800 min-h-screen';
      case 'standard':
      default:
        return 'bg-stone-50 text-stone-900 min-h-screen';
    }
  };

  // Add item to AAC communication board
  const handleAddToBoard = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.menuItem.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id: `order-${Date.now()}`, menuItem: item, quantity: 1, notes: [] }];
    });

    speechService.speak(`Agregado al pedido: ${item.name}`, settings.speechRate);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemoveOrderItem = (id: string) => {
    setOrderItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleToggleNote = (id: string, note: string) => {
    setOrderItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const hasNote = i.notes.includes(note);
          return {
            ...i,
            notes: hasNote ? i.notes.filter((n) => n !== note) : [...i.notes, note],
          };
        }
        return i;
      })
    );
  };

  // Filter items
  const filteredItems = currentVenue.items.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedAllergen !== 'all' && !item.allergens.includes(selectedAllergen)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.simpleDescription.toLowerCase().includes(q);
      const matchIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(q));
      const matchForeign = item.foreignTerm?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchIngredients && !matchForeign) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className={`${getThemeContainerClass()} ${getFontFamilyClass()} transition-colors flex flex-col`}>
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        orderCount={orderItems.reduce((acc, i) => acc + i.quantity, 0)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'board' ? (
          <CommunicationBoard
            items={orderItems}
            settings={settings}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveOrderItem}
            onClearBoard={() => setOrderItems([])}
            onToggleNote={handleToggleNote}
            onBackToMenu={() => setCurrentView('menu')}
          />
        ) : currentView === 'guide' ? (
          <OrdinanceGuide />
        ) : currentView === 'admin' ? (
          <AdminEditor
            venue={currentVenue}
            onUpdateVenue={(updated) => {
              setVenues((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
            }}
            onOpenPrintModal={() => setIsPrintModalOpen(true)}
            onOpenObleaModal={() => setIsObleaModalOpen(true)}
            onResetVenue={() => {
              const original = SAMPLE_VENUES.find((v) => v.id === currentVenue.id);
              if (original) {
                setVenues((prev) => prev.map((v) => (v.id === original.id ? original : v)));
              }
            }}
          />
        ) : (
          /* MENU VIEW (Customer facing accessible reader) */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Top Venue Switcher Strip */}
            <div className="mb-6 p-4 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs rounded-2xl border border-stone-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider shrink-0">
                  Comercio Gastronómico:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {venues.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setCurrentVenueId(v.id);
                        setSelectedCategory('all');
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        currentVenueId === v.id
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions: Print & Badge */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                  title="Generar carta A4 imprimible con Braille y cartel de mesa"
                >
                  <Printer className="w-4 h-4 text-stone-700" />
                  <span className="whitespace-nowrap">Imprimir Carta A4</span>
                </button>

                <button
                  onClick={() => setIsObleaModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer"
                  title="Ver oblea oficial municipal (Art. 8º)"
                >
                  <Award className="w-4 h-4 text-amber-700" />
                  <span className="whitespace-nowrap">Oblea Oficial</span>
                </button>
              </div>
            </div>

            {/* Venue Profile Header Banner */}
            <header className="mb-6 pb-6 border-b border-stone-200/80">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700 mb-1">
                    <span>{currentVenue.businessTypeLabel}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-stone-500 font-mono">Reg. {currentVenue.adhesionNumber}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                    {currentVenue.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{currentVenue.address}, {currentVenue.city}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{currentVenue.openingHours}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{currentVenue.phone}</span>
                    </span>
                  </div>
                </div>

                {/* Read aloud all items button */}
                <div className="shrink-0">
                  <button
                    onClick={() => {
                      const introText = `Bienvenido a ${currentVenue.name}. En nuestra carta inclusiva encontrarás ${currentVenue.items.length} productos organizados en ${currentVenue.categories.length} categorías.`;
                      speechService.speak(introText, settings.speechRate);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    <span>Escuchar Bienvenida del Local</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Filter and Search Bar */}
            <div className="space-y-4 mb-6">
              {/* Category Segmented Tabs (Buttons per frontend design guidelines) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  Todos los Platos ({currentVenue.items.length})
                </button>
                {currentVenue.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search and Allergen Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar plato, ingrediente o bebida..."
                    className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Dietary / Allergen Filter Dropdown / Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <span className="text-[11px] font-bold text-stone-500 uppercase shrink-0">
                    Dieta:
                  </span>
                  <button
                    onClick={() => setSelectedAllergen('all')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      selectedAllergen === 'all'
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Cualquiera
                  </button>
                  {(['sin_tacc', 'sin_lactosa', 'vegano', 'vegetariano'] as AllergenType[]).map((alg) => (
                    <button
                      key={alg}
                      onClick={() => setSelectedAllergen(alg)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                        selectedAllergen === alg
                          ? 'bg-amber-600 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {ALLERGENS[alg].shortLabel}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Menu Cards Grid */}
            {filteredItems.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 my-8">
                <UtensilsCrossed className="w-12 h-12 mx-auto text-stone-400 mb-2" />
                <h3 className="text-base font-bold text-stone-800">
                  No se encontraron platos con los filtros aplicados
                </h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  Probá seleccionando otra categoría o borrando el término de búsqueda.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedAllergen('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-stone-800"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  const orderEntry = orderItems.find((o) => o.menuItem.id === item.id);
                  return (
                    <MenuCard
                      key={item.id}
                      item={item}
                      settings={settings}
                      onOpenBraille={(it) => setBrailleItem(it)}
                      onAddToBoard={handleAddToBoard}
                      inBoardCount={orderEntry?.quantity || 0}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="text-sm font-extrabold text-stone-900 dark:text-white">
                Menú Inclusivo · Cartas Accesibles con Pictogramas y Braille
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                Basado en el Proyecto de Ordenanza Municipal de Vicuña Mackenna (Córdoba).
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-stone-600 dark:text-stone-400">
              <button
                onClick={() => setCurrentView('guide')}
                className="hover:text-stone-900 dark:hover:text-white cursor-pointer"
              >
                Ordenanza Municipal y Marco Legal
              </button>
              <span>·</span>
              <button
                onClick={() => setIsPrintModalOpen(true)}
                className="hover:text-stone-900 dark:hover:text-white cursor-pointer"
              >
                Carta Imprimible A4
              </button>
              <span>·</span>
              <button
                onClick={() => setIsObleaModalOpen(true)}
                className="hover:text-stone-900 dark:hover:text-white cursor-pointer"
              >
                Oblea de Adhesión (Art. 8º)
              </button>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 text-center">
            Garantizando autonomía personal para personas con TEA, discapacidad visual, cognitiva, afasia y barreras idiomáticas · Ley Nacional Nº 26.378 · Ley Nº 27.044.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AccessibilityToolbar
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        settings={settings}
        onUpdateSettings={(newVals) => setSettings((prev) => ({ ...prev, ...newVals }))}
        onReset={() => setSettings(DEFAULT_SETTINGS)}
      />

      <BrailleModal
        isOpen={!!brailleItem}
        onClose={() => setBrailleItem(null)}
        title={brailleItem?.name || ''}
        price={brailleItem?.price}
        description={brailleItem?.simpleDescription}
      />

      <PrintableMenuModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        venue={currentVenue}
      />

      <ObleaModal
        isOpen={isObleaModalOpen}
        onClose={() => setIsObleaModalOpen(false)}
        venue={currentVenue}
      />
    </div>
  );
}
