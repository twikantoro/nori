// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyB5Z9FXmzH-_Z15QDYNg6boA28ak3tRbPE",
  authDomain: "nori-api-24aca.firebaseapp.com",
  databaseURL: "https://nori-api-24aca.firebaseio.com",
  projectId: "nori-api-24aca",
  storageBucket: "nori-api-24aca.appspot.com",
  messagingSenderId: "914353176827",
  appId: "1:914353176827:web:62007b927ed004d487f05e",
  measurementId: "G-7DD8HNBMEV"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
