import { StrictMode, VFC } from 'react';
import AuthGuard from '../feature/auth/AuthGuard';

const App: VFC = () => (
  <StrictMode>
    <AuthGuard>
      <p>Hello, world!</p>
    </AuthGuard>
  </StrictMode>
);

export default App;
