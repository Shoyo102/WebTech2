import "firebase/database";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyACIngcwOOJKVM75Hue9HjksQgoHpjEsW4",
  authDomain: "activity-2-d1f33.firebaseapp.com",
  projectId: "activity-2-d1f33",
  storageBucket: "activity-2-d1f33.appspot.com",
  messagingSenderId: "415121468867",
  appId: "1:415121468867:web:4cbdea371168c02d58a176"
};

const app = initializeApp(firebaseConfig);
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();