import { AllergenInfo, AllergenType } from '../types/menu';

export const ALLERGENS: Record<AllergenType, AllergenInfo> = {
  sin_tacc: {
    id: 'sin_tacc',
    label: 'Sin TACC (Libre de Gluten)',
    shortLabel: 'Sin TACC',
    iconName: 'WheatOff',
    description: 'Apto para personas con celiaquía o intolerancia al gluten. Sin Trigo, Avena, Cebada ni Centeno.',
  },
  sin_lactosa: {
    id: 'sin_lactosa',
    label: 'Sin Lactosa / Sin Lácteos',
    shortLabel: 'Sin Lactosa',
    iconName: 'MilkOff',
    description: 'Preparado sin leche, crema ni derivados lácteos.',
  },
  vegano: {
    id: 'vegano',
    label: '100% Vegano',
    shortLabel: 'Vegano',
    iconName: 'Leaf',
    description: 'Elaborado exclusivamente con ingredientes de origen vegetal.',
  },
  vegetariano: {
    id: 'vegetariano',
    label: 'Vegetariano',
    shortLabel: 'Vegetariano',
    iconName: 'Salad',
    description: 'Sin carnes rojas, aves ni pescados.',
  },
  con_mani: {
    id: 'con_mani',
    label: 'Contiene Maní / Frutos Secos',
    shortLabel: 'Con Maní',
    iconName: 'AlertTriangle',
    description: 'Precaución por alérgenos de maní, nueces, almendras o frutos secos.',
  },
  sin_huevo: {
    id: 'sin_huevo',
    label: 'Sin Huevo',
    shortLabel: 'Sin Huevo',
    iconName: 'EggOff',
    description: 'No contiene huevo ni derivados.',
  },
  sin_azucar: {
    id: 'sin_azucar',
    label: 'Sin Azúcar Agregada',
    shortLabel: 'Sin Azúcar',
    iconName: 'Sparkles',
    description: 'Apto para personas con diabetes o que evitan el azúcar común.',
  },
};
