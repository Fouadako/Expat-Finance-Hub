import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LanguageProvider } from '@/lib/i18n';
import { Layout } from '@/components/Layout';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import IKE from '@/pages/IKE';
import IKZE from '@/pages/IKZE';
import Compare from '@/pages/Compare';
import Calculator from '@/pages/Calculator';
import Expats from '@/pages/Expats';
import FAQ from '@/pages/FAQ';
import Book from '@/pages/Book';
import About from '@/pages/About';
import { Route, Switch, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

/** Page registry — each entry renders at its path AND at /ru<path> and /ua<path>. */
const pages = [
  { path: '/', component: Home },
  { path: '/ike', component: IKE },
  { path: '/ikze', component: IKZE },
  { path: '/compare', component: Compare },
  { path: '/calculator', component: Calculator },
  { path: '/expats', component: Expats },
  { path: '/faq', component: FAQ },
  { path: '/book', component: Book },
  { path: '/about', component: About },
] as const;

function Router() {
  return (
    <Layout>
      <Switch>
        {pages.flatMap(({ path, component: Component }) => {
          // "/ru" and "/ua" are the language-prefix equivalents of "/"
          const ruPath = path === '/' ? '/ru' : `/ru${path}`;
          const uaPath = path === '/' ? '/ua' : `/ua${path}`;
          return [
            <Route key={path} path={path} component={Component} />,
            <Route key={ruPath} path={ruPath} component={Component} />,
            <Route key={uaPath} path={uaPath} component={Component} />,
          ];
        })}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          {/* LanguageProvider must be inside WouterRouter to use useLocation */}
          <LanguageProvider>
            <TooltipProvider>
              <Router />
              <Toaster />
            </TooltipProvider>
          </LanguageProvider>
        </WouterRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
