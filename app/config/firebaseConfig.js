// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB5iVZ5CV5igzhVgenoSSurAZ0i0rq3frE',
  authDomain: 'tecno-market.firebaseapp.com',
  projectId: 'tecno-market',
  messagingSenderId: '777187985018',
  appId: '1:777187985018:web:7afa195f720ca2c6941dc3',
  storageBucket: 'gs://tecno-market.appspot.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

const auth = getAuth();
auth.languageCode = 'es';

const storage = getStorage(app);

export { auth, storage };
