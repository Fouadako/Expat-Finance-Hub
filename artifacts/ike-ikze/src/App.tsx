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
import { Route, Switch, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ike" component={IKE} />
        <Route path="/ikze" component={IKZE} />
        <Route path="/compare" component={Compare} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/expats" component={Expats} />
        <Route path="/faq" component={FAQ} />
        <Route path="/book" component={Book} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <LanguageProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
