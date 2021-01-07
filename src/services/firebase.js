import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDlQdpIlToRGwTlQW7SYlhgY-G4HFYfQUk",
  authDomain: "blog-9992f.firebaseapp.com",
  databaseURL: "https://blog-9992f-default-rtdb.firebaseio.com/",
  projectId: "blog-9992f",
  storageBucket: "blog-9992f.appspot.com",
  messagingSenderId: "1080382927027",
  appId: "1:1080382927027:web:3f498a1b2a291144ee40c6",
  measurementId: "G-T85PH6Q32C",
};
const connectToFirebase = firebase.initializeApp(config);
export const auth = connectToFirebase.auth();
export const db = connectToFirebase.firestore();
export default connectToFirebase;
