// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_API_KEY,
// 	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app, process.env.REACT_APP_BUCKET_URL);
// export default storage;



// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDjp4ZhIsGgx0umYFtPf65NRKKVqzr-G5M',
  authDomain: 'fx-crypto-spot.firebaseapp.com',
  projectId: 'fx-crypto-spot',
  storageBucket: 'fx-crypto-spot.appspot.com',
  messagingSenderId: '984182141921',
  appId: '1:984182141921:web:b57e5c59c809f298ab18a0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();

export default storage;
