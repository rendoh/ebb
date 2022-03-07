import { StrictMode, VFC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthGuard from '../feature/auth/AuthGuard';
import Home from './routes/Home';

const queryClient = new QueryClient();

const App: VFC = () => (
  <StrictMode>
    <AuthGuard>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </AuthGuard>
  </StrictMode>
);

export default App;
