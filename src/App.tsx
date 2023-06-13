import { ThemeProvider } from './layouts/themeprovider-layout';
import { PageRouter } from './router/page-router';

export default function App() {
  return (
    <ThemeProvider>
      <PageRouter />
    </ThemeProvider>
  );
}
