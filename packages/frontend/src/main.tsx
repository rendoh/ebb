import './feature/auth/init';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthGuard from './feature/auth/AuthGuard';

ReactDOM.render(
  <React.StrictMode>
    <AuthGuard>
      <App />
    </AuthGuard>
  </React.StrictMode>,
  document.getElementById('root'),
);
