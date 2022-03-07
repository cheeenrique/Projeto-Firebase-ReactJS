import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY2ixjxixRmLGLXlDO5-521MakYgkfJu0",
  authDomain: "exercicioreactjsfirebase.firebaseapp.com",
  projectId: "exercicioreactjsfirebase",
  storageBucket: "exercicioreactjsfirebase.appspot.com",
  messagingSenderId: "1017376256072",
  appId: "1:1017376256072:web:f46c95c244aca5d3f7e87d",
  measurementId: "G-1C6DMNZCQV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
//const analytics = getAnalytics(app);

export default db;