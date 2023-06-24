// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';
import { getDatabase, set, ref, update } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js';
// import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC7uWYg04_UA_J2h66rNurV7izK19Vjw0o',
  authDomain: 'macopad-5ba71.firebaseapp.com',
  projectId: 'macopad-5ba71',
  storageBucket: 'macopad-5ba71.appspot.com',
  messagingSenderId: '274228484089',
  appId: '1:274228484089:web:f9b78a037614075f20cf28',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const signinButton = document.getElementById('signin_button');
const signupButton = document.getElementById('signup_button');

signupButton.addEventListener('click', (e) => {
  let name = document.getElementById('name').value;
  let nohp = document.getElementById('nohp').value;
  let emailSignup = document.getElementById('email_signup').value;
  let passwordSignup = document.getElementById('pass_signup').value;

  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        name: name,
        nohp: nohp,
        email: email_signup,
        password: pass_signup,
      });
    })
    .then(() => {
      alert('User Telah Ditambahkan,Silahkan Sign In');
      location.href = 'https://macopad.herokuapp.com/index.html';
    })
    .catch((error) => {
      alert(error);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
});

signinButton.addEventListener('click', (e) => {
  let emailSignin = document.getElementById('email_signin').value;
  let passwordSignin = document.getElementById('psw_signin').value;
  signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      let lgDate = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
      })
        .then(() => {
          // Data saved successfully!
          //   alert("user telah sukses login");
          location.href = 'https://macopad.herokuapp.com/dashboard.html';
        })
        .catch((error) => {
          //the write failed
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  signOut(auth)
    .then(() => {})
    .catch((error) => {});
});
