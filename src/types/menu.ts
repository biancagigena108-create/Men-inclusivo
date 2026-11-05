export type AllergenType = 
  | 'sin_tacc' // Gluten Free
  | 'sin_lactosa' // Lactose Free
  | 'vegano' // Vegan
  | 'vegetariano' // Vegetarian
  | 'con_mani' // Peanuts/Tree nuts
  | 'sin_huevo' // Egg free
  | 'sin_azucar'; // Sugar free / Diabetic friendly

export type PictogramCategory = 
  | 'bebida'
  | 'comida_caliente'
  | 'comida_fria'
  | 'postre'
  | 'desayuno'
  | 'snack'
  | 'picante'
  | 'cubiertos'
  | 'porcion';

export interface AllergenInfo {
  id: AllergenType;
  label: string;
  shortLabel: string;
  iconName: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  // Foreign term translation per Art. 7.c (e.g. Croissant -> Medialuna de manteca francesa)
  foreignTerm?: string;
  foreignTranslation?: string;
  // Simple reading description for cognitive accessibility & aphasia
  simpleDescription: string;
  // Detailed ingredients list
  ingredients: string[];
  price: number;
  category: string;
  pictogramName: string;
  pictogramSvg?: string;
  imageUrl: string;
  imageAlt: string;
  allergens: AllergenType[];
  temperature?: 'caliente' | 'frio' | 'natural';
  isSpecialty?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  pictogram: string;
  description: string;
}

export interface Venue {
  id: string;
  name: string;
  businessType: 'cafeteria' | 'restaurante' | 'pizzeria' | 'heladeria' | 'bar';
  businessTypeLabel: string;
  address: string;
  city: string; // e.g. Vicuña Mackenna, Córdoba
  phone: string;
  openingHours: string;
  adhesionNumber: string; // Registro de Adhesión Ordenanza Municipal
  categories: MenuCategory[];
  items: MenuItem[];
}

export type AccessibilityTheme = 
  | 'standard' 
  | 'high-contrast-yellow' // Yellow on Black (Low vision)
  | 'high-contrast-white'  // White on Black
  | 'sensory-calm';        // Soft pastel blue/gray for TEA sensory overload

export type FontFamilyChoice = 
  | 'atkinson'
  | 'verdana'
  | 'helvetica'
  | 'opendyslexic';

export interface AccessibilitySettings {
  fontSize: number; // 14, 18, 22, 26
  theme: AccessibilityTheme;
  fontFamily: FontFamilyChoice;
  speechRate: number; // 0.8, 1.0, 1.2
  highlightPictograms: boolean;
  simplifiedView: boolean; // Hide non-essential chrome, focus on images & pictograms
  audioAutoplayDescription: boolean;
}

export interface OrderBoardItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  notes: string[]; // e.g., "Sin hielo", "Sin sal", "Bien cocido"
}
