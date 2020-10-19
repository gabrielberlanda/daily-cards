import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAlI6SLhJskjEspk_ITxSrd4zQNaf6ZqOI",
    authDomain: "daily-cards.firebaseapp.com",
    databaseURL: "https://daily-cards.firebaseio.com",
    projectId: "daily-cards",
    storageBucket: "daily-cards.appspot.com",
    messagingSenderId: "377817843767",
    appId: "1:377817843767:web:7693dab9c44972125e57b2",
    measurementId: "G-030HFQFR7J"
};

firebase.initializeApp(firebaseConfig);

export default firebase;