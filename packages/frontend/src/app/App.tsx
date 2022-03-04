import { StrictMode, VFC } from 'react';
import Spinner from '../core/ui/Spinner';
import AuthGuard from '../feature/auth/AuthGuard';

const App: VFC = () => (
  <StrictMode>
    <AuthGuard>
      <Spinner />
    </AuthGuard>
  </StrictMode>
);

export default App;
