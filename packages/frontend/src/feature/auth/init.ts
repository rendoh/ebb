import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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

if (process.env.NODE_ENV === 'development') {
  app.auth().useEmulator('http://localhost:9099');
}
