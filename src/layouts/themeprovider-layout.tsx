import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export const theme: MantineThemeOverride = {
  colors: {
    'primary-blue': [
      '#6308F7',
      '#6308F7',
      '#6308F7',
      '#6308F7',
      '#6308F7',
      '#6308F7',
      '#6308F7',
      '#6308F7',
      '#6308F7',
      '#6308F7',
    ],
  },
  colorScheme: 'light',
  fontFamily: 'Poppins, sans-serif',
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications position="top-right" autoClose={2000} />
      {children}
    </MantineProvider>
  );
}
