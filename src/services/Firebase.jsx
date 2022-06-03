import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB0IkLyZQ5OfE6ByAYkFHMntxw_45GBv2w",
  authDomain: "pc-acg-bd572.firebaseapp.com",
  projectId: "pc-acg-bd572",
  storageBucket: "pc-acg-bd572.appspot.com",
  messagingSenderId: "317104316352",
  appId: "1:317104316352:web:f49d70cd2c560ae7223225"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)