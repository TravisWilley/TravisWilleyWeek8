import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// replace this firebase conFigvariable with your own
const firebaseConfig = {
  apiKey: 'AIzaSyAmozceDBatGvrM5sMR3U_kIrFtwUaMAL0',
  authDomain: 'week7-6900a.firebaseapp.com',
  projectId: 'week7-6900a',
  storageBucket: 'week7-6900a.appspot.com',
  messagingSenderId: '582849656351',
  appId: '1:582849656351:web:da1cc96f8a0b0d3d98872a',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
//