import './index.css';
import React, { ReactNode, useEffect, useState, VFC } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  Props as FirebaseAuthProps,
  StyledFirebaseAuth,
} from 'react-firebaseui';
import App from './App';

// public data
const firebaseConfig = {
  apiKey: 'AIzaSyD5WpLhE0LgjmxoHGyoGQ5Cv0znUcT14SM',
  authDomain: 'ebb-application.firebaseapp.com',
  projectId: 'ebb-application',
  storageBucket: 'ebb-application.appspot.com',
  messagingSenderId: '831459956538',
  appId: '1:831459956538:web:36e61edf85f9f725c4a203',
  measurementId: 'G-THW6D5J25L',
};

const app = firebase.initializeApp(firebaseConfig);

const uiConfig: FirebaseAuthProps['uiConfig'] = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function useAuthUser() {
  const [user, setUser] = useState<firebase.User | null | false>(false);
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setUser(user);
      });
    return () => unregisterAuthObserver();
  }, []);

  return user;
}

const AuthenticationGuard: VFC<{ children: ReactNode }> = ({ children }) => {
  const user = useAuthUser();
  if (user === false) return <div>Loading...</div>;
  if (user)
    return (
      <>
        <header
          style={{
            top: 0,
            left: 0,
            width: '100%',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'space-between',
            padding: 10,
            boxSizing: 'border-box',
          }}
        >
          <p>{user.displayName}</p>
          <button type="button" onClick={() => firebase.auth().signOut()}>
            Sign out
          </button>
        </header>
        {children}
      </>
    );
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />;
};

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationGuard>
      <App />
    </AuthenticationGuard>
  </React.StrictMode>,
  document.getElementById('root'),
);
