importScripts('../../firebase-messaging-sw.js')

console.log("script LOADED yay")

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});