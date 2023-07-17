export interface Theme {
    colors: Record<string, string>;
    fontRef: string;
    activeTheme: string;
    toggleTheme: () => void;
    fontScaler: () => void;
}