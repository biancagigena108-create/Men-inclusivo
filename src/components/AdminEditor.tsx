import React from 'react';
import { 
  Store, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  RefreshCw, 
  FileText, 
  Award, 
  Check, 
  X,
  AlertCircle
} from 'lucide-react';
import { Venue, MenuItem, AllergenType } from '../types/menu';
import { getPictogramComponent, Pictograms } from '../data/pictograms';
import { ALLERGENS } from '../data/allergens';

interface AdminEditorProps {
  venue: Venue;
  onUpdateVenue: (updatedVenue: Venue) => void;
  onOpenPrintModal: () => void;
  onOpenObleaModal: () => void;
  onResetVenue: () => void;
}

export const AdminEditor: React.FC<AdminEditorProps> = ({
  venue,
  onUpdateVenue,
  onOpenPrintModal,
  onOpenObleaModal,
  onResetVenue,
}) => {
  const [editingItem, setEditingItem] = React.useState<MenuItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = React.useState(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = React.useState(false);

  // Form state for editing or creating an item
  const [formName, setFormName] = React.useState('');
  const [formForeignTerm, setFormForeignTerm] = React.useState('');
  const [formForeignTranslation, setFormForeignTranslation] = React.useState('');
  const [formSimpleDesc, setFormSimpleDesc] = React.useState('');
  const [formIngredients, setFormIngredients] = React.useState('');
  const [formPrice, setFormPrice] = React.useState<number>(0);
  const [formCategory, setFormCategory] = React.useState('');
  const [formPictogram, setFormPictogram] = React.useState('cafe');
  const [formAllergens, setFormAllergens] = React.useState<AllergenType[]>([]);

  // Start editing item
  const startEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsCreatingNew(false);
    setFormName(item.name);
    setFormForeignTerm(item.foreignTerm || '');
    setFormForeignTranslation(item.foreignTranslation || '');
    setFormSimpleDesc(item.simpleDescription);
    setFormIngredients(item.ingredients.join(', '));
    setFormPrice(item.price);
    setFormCategory(item.category);
    setFormPictogram(item.pictogramName);
    setFormAllergens([...item.allergens]);
  };

  // Start creating new item
  const startCreate = () => {
    setEditingItem(null);
    setIsCreatingNew(true);
    setFormName('');
    setFormForeignTerm('');
    setFormForeignTranslation('');
    setFormSimpleDesc('');
    setFormIngredients('');
    setFormPrice(3500);
    setFormCategory(venue.categories[0]?.id || 'general');
    setFormPictogram('cafe');
    setFormAllergens([]);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const ingredientsList = formIngredients
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (isCreatingNew) {
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: formName.trim(),
        foreignTerm: formForeignTerm.trim() || undefined,
        foreignTranslation: formForeignTranslation.trim() || undefined,
        simpleDescription: formSimpleDesc.trim() || 'Descripción accesible en lectura fácil.',
        ingredients: ingredientsList,
        price: Number(formPrice) || 0,
        category: formCategory,
        pictogramName: formPictogram,
        imageUrl: '',
        imageAlt: `Imagen accesible de ${formName}`,
        allergens: formAllergens,
      };

      const updatedItems = [newItem, ...venue.items];
      onUpdateVenue({ ...venue, items: updatedItems });
    } else if (editingItem) {
      const updatedItems = venue.items.map((it) => {
        if (it.id === editingItem.id) {
          return {
            ...it,
            name: formName.trim(),
            foreignTerm: formForeignTerm.trim() || undefined,
            foreignTranslation: formForeignTranslation.trim() || undefined,
            simpleDescription: formSimpleDesc.trim(),
            ingredients: ingredientsList,
            price: Number(formPrice) || 0,
            category: formCategory,
            pictogramName: formPictogram,
            allergens: formAllergens,
          };
        }
        return it;
      });

      onUpdateVenue({ ...venue, items: updatedItems });
    }

    setEditingItem(null);
    setIsCreatingNew(false);
    setSavedSuccessMsg(true);
    setTimeout(() => setSavedSuccessMsg(false), 2500);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('¿Seguro que deseás eliminar este producto de la carta accesible?')) {
      const updated = venue.items.filter((i) => i.id !== id);
      onUpdateVenue({ ...venue, items: updated });
    }
  };

  const toggleAllergenInForm = (alg: AllergenType) => {
    setFormAllergens((prev) =>
      prev.includes(alg) ? prev.filter((a) => a !== alg) : [...prev, alg]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Portal del Comerciante
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs font-semibold text-stone-500">
              Cumplimiento de Ordenanza
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Gestión de Carta Accesible
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Administrá los platos, bebidas, precios, alérgenos y traducciones para mantener tu carta conforme a la ordenanza.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenPrintModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-stone-700" />
            <span>Carta Imprimible A4</span>
          </button>

          <button
            onClick={onOpenObleaModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-700" />
            <span>Oblea Municipal</span>
          </button>

          <button
            onClick={startCreate}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Plato / Bebida</span>
          </button>
        </div>
      </div>

      {savedSuccessMsg && (
        <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>¡Carta actualizada correctamente! Los cambios ya están reflejados en la vista del comensal.</span>
        </div>
      )}

      {/* Item Form Modal / Drawer */}
      {(isCreatingNew || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-300 p-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h2 className="text-lg font-black text-stone-900">
                {isCreatingNew ? 'Agregar Nuevo Plato o Bebida' : `Editar: ${editingItem?.name}`}
              </h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsCreatingNew(false);
                }}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4 py-4 text-xs">
              {/* Name */}
              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  Nombre en Español Claro (Art. 7.c) *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ej: Café con Leche, Pizza Muzzarella, etc."
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-sm text-stone-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Foreign Term & Translation (Art. 7.c) */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                <span className="font-bold text-stone-900 block">
                  Traducción de Términos Extranjeros (Artículo 7.c)
                </span>
                <p className="text-[11px] text-stone-500">
                  Si usás nombres en otros idiomas (ej: Croissant, Cappuccino, Spaghetti), es obligatorio incluir su traducción o explicación en español entre paréntesis.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                      Término Extranjero (Opcional):
                    </label>
                    <input
                      type="text"
                      value={formForeignTerm}
                      onChange={(e) => setFormForeignTerm(e.target.value)}
                      placeholder="Ej: Croissant, Bruschetta"
                      className="w-full p-2 border border-stone-300 rounded text-xs text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                      Traducción al Español entre paréntesis:
                    </label>
                    <input
                      type="text"
                      value={formForeignTranslation}
                      onChange={(e) => setFormForeignTranslation(e.target.value)}
                      placeholder="Ej: Medialuna francesa de manteca"
                      className="w-full p-2 border border-stone-300 rounded text-xs text-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-900 mb-1">Categoría</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-sm text-stone-900 focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {venue.categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-900 mb-1">
                    Precio en ARS ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="100"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-sm text-stone-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Pictogram Selection */}
              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  Pictograma Universal CAA (Art. 6º y 14º)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 p-2 bg-stone-50 rounded-lg border border-stone-200">
                  {Object.keys(Pictograms).map((picKey) => {
                    const Pic = Pictograms[picKey];
                    const isSelected = formPictogram === picKey;
                    return (
                      <button
                        type="button"
                        key={picKey}
                        onClick={() => setFormPictogram(picKey)}
                        className={`p-2 rounded-lg border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-600 bg-amber-100 text-amber-950 ring-2 ring-amber-500/30'
                            : 'border-stone-200 bg-white hover:bg-stone-100 text-stone-700'
                        }`}
                        title={picKey}
                      >
                        <Pic className="w-6 h-6" size={24} />
                        <span className="text-[9px] truncate w-full mt-1">{picKey}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Simple Description (Cognitive / Easy reading) */}
              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  Descripción en Lectura Fácil (Para TEA, afasia y discapacidad cognitiva)
                </label>
                <textarea
                  rows={2}
                  value={formSimpleDesc}
                  onChange={(e) => setFormSimpleDesc(e.target.value)}
                  placeholder="Explicá de forma directa cómo es el plato, temperatura e ingredientes principales..."
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-sm text-stone-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  Ingredientes separados por comas
                </label>
                <input
                  type="text"
                  value={formIngredients}
                  onChange={(e) => setFormIngredients(e.target.value)}
                  placeholder="Ej: Harina de trigo, queso mozzarella, tomate triturado, jamón cocido"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-sm text-stone-900"
                />
              </div>

              {/* Allergens selection */}
              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  Etiquetas de Alérgenos y Dietas
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(ALLERGENS) as AllergenType[]).map((alg) => {
                    const info = ALLERGENS[alg];
                    const active = formAllergens.includes(alg);
                    return (
                      <button
                        type="button"
                        key={alg}
                        onClick={() => toggleAllergenInForm(alg)}
                        className={`px-2.5 py-1 rounded-md border text-xs font-bold transition-colors cursor-pointer ${
                          active
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {info.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Producto</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Venue Items List */}
      <div className="my-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-stone-900">
            Productos en Carta ({venue.items.length})
          </h2>
          <button
            onClick={onResetVenue}
            className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer carta predeterminada</span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100 shadow-xs overflow-hidden">
          {venue.items.map((item) => {
            const Pic = getPictogramComponent(item.pictogramName);
            return (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-stone-200 shrink-0"
                    />
                  ) : null}
                  <div className="p-2 bg-stone-100 rounded-lg border border-stone-200 shrink-0">
                    <Pic className="w-8 h-8 text-stone-900" size={32} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-stone-900 truncate">
                        {item.name}
                      </h3>
                      {item.foreignTerm && (
                        <span className="text-[11px] text-amber-700 italic shrink-0">
                          ({item.foreignTerm})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 truncate max-w-md">
                      {item.simpleDescription}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                      <span>Categoría: {venue.categories.find(c => c.id === item.category)?.name || item.category}</span>
                      {item.allergens.length > 0 && (
                        <span>· {item.allergens.map(a => ALLERGENS[a]?.shortLabel).join(', ')}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-extrabold text-stone-900 tabular-nums">
                    ${item.price.toLocaleString('es-AR')}
                  </span>
                  <button
                    onClick={() => startEdit(item)}
                    className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                    title="Editar producto"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
