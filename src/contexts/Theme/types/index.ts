export type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: Theme[];
};

export type Theme = {
  name: string;
  icon: string;
};

export type ThemeType = 'light' | 'dark' | 'auto';
