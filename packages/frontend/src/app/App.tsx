import { StrictMode, VFC } from 'react';
import AuthGuard from '../feature/auth/AuthGuard';

const App: VFC = () => (
  <StrictMode>
    <AuthGuard>
      <div>Hello, world!</div>
    </AuthGuard>
  </StrictMode>
);

export default App;
