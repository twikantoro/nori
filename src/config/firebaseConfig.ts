import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import axios from 'axios'
import { call } from 'ionicons/icons';
import { useState } from 'react';

// Replace this with your own config details
var apiSite = "https://nori-api.herokuapp.com"

var config = {
  apiKey: "AIzaSyChHRpSmiJXoCCCeZFbRwi-fg3KWXMvVvc",
  authDomain: "nori-3744e.firebaseapp.com",
  databaseURL: "https://nori-3744e.firebaseio.com",
  projectId: "nori-3744e",
  storageBucket: "nori-3744e.appspot.com",
  messagingSenderId: "1013448863939",
  appId: "1:1013448863939:web:942a30be0c724778487276",
  measurementId: "G-7V4KB43HWN"
};
firebase.initializeApp(config);

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
      if (response.code == 'auth/user-not-found'){
        callback('User tidak ditemukan')
      } else if(response.code == 'auth/wrong-password') {
        callback('Password salah')
      }
      //callback('Kombinasi email dan password salah')
    })

}

export async function signupUser(email: string, password: string, callback: Function) {
  var params = {
    email: email,
    password: password
  }
  var encoded = arrayToGet(params)
  axios.get(apiSite + '/users/create?' + encoded)
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
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

export function logoutUser() {
  firebase.auth().signOut()
}

export function getCurrentUser() {
  return new Promise ((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        resolve(user)
      } else {
        resolve(null)
      }
      unsubscribe()
    })
  })
}