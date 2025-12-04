export interface ConverterCategory {
  id: string;
  name: string;
  description: string;
  icon: string; // Material symbol name
  path: string;
  color?: string; // Optional accent color class
}

export interface CurrencyOption {
  code: string;
  name: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
