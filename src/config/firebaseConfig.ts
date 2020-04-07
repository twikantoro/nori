import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Replace this with your own config details
var apiSite = "http://localhost:5000"

var config = {
  apiKey: "AIzaSyB5Z9FXmzH-_Z15QDYNg6boA28ak3tRbPE",
  authDomain: "nori-api-24aca.firebaseapp.com",
  databaseURL: "https://nori-api-24aca.firebaseio.com",
  projectId: "nori-api-24aca",
  storageBucket: "nori-api-24aca.appspot.com",
  messagingSenderId: "914353176827",
  appId: "1:914353176827:web:62007b927ed004d487f05e",
  measurementId: "G-7DD8HNBMEV"

};
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

function arrayToGet(array: any) {
  var encoded = ''
  for (var key in array) {
    encoded += key + '=' + array[key] + '&'
  }
  return encoded
}

export function validateEmail(email: string) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export async function loginUser(email: string, password: string, callback: Function) {
  const res = await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (response) {
      console.log(response)
      callback('Berhasil')
    })
    .catch(function (response) {
      console.log(response)
      if (response.code == 'auth/user-not-found') {
        callback('User tidak ditemukan')
      } else if (response.code == 'auth/wrong-password') {
        callback('Password salah')
      } else {
        callback('Anda sedang offline')
      }
      //callback('Kombinasi email dan password salah')
    })

}

export async function signupUserOld(email: string, password: string, callback: Function) {
  var params = {
    email: email,
    password: password
  }
  var encoded = arrayToGet(params)
  axios.get(apiSite + '/api/pengguna/create?' + encoded)
    .then(function (response) {
      // handle success
      console.log(response);
      if (response.data.code == 'auth/email-already-exists') {
        callback('Email sudah terdaftar')
      } else {
        callback('Berhasil! Silahkan login')
      }
    })
    .catch(function (error) {
      callback('Anda sedang offline')
    })
    .then(function () {
      // always executed
    });
}

export async function signupUser(email: string, password: string, callback: Function) {
  firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{
    callback('Berhasil')
    document.location.href="/login"
  }).catch((error)=>{
    if(error=='Error: The email address is already in use by another account.'){
      callback('Email sudah terdaftar')
    } else {
      callback('Terjadi kesalahan')
    }
  })
}

export function logoutUser() {
  firebase.auth().signOut()
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resolve(user)
      } else {
        resolve(null)
      }
      unsubscribe()
    })
  })
}

export function getToken() {
  return new Promise((resolve, reject) => {
    firebase.auth().currentUser?.getIdToken(true).then(function (idToken) {
      resolve(idToken)
    }).catch(function (error) {
      reject(error)
    })
  })
}

export function isPemilik(callback: Function) {
  getToken().then(function(result){
    axios.get(apiSite + '/api/pemilik/ami?token=' + result,{
      withCredentials: false
    }).then(function(result){
      callback(result)
    })
  })
}

export function isStaf(callback: Function) {
  getToken().then(function(result){
    axios.get(apiSite + '/api/staf/ami?token=' + result).then(function(result){
      callback(result)
    })
  })
}

export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider()

export default firebase