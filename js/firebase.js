const firebaseConfig = {
    apiKey: "AIzaSyC3J4lhzSdQ5y9uiqM5R1j4AOSRYpXGFPc",
    authDomain: "codevelopment-8f24d.firebaseapp.com",
    projectId: "codevelopment-8f24d",
    storageBucket: "codevelopment-8f24d.appspot.com",
    messagingSenderId: "415267163412",
    appId: "1:415267163412:web:3dd7b8ff7a4efc51dac601",
    measurementId: "G-C7QSYS4GFH"
};


firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();