import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

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
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export const db = firebase.firestore()

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
      if (response.code === 'auth/user-not-found') {
        callback('User tidak ditemukan')
      } else if (response.code === 'auth/wrong-password') {
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
      if (response.data.code === 'auth/email-already-exists') {
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
  firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
    callback('Berhasil')
    document.location.href = "/login"
  }).catch((error) => {
    if (error === 'Error: The email address is already in use by another account.') {
      callback('Email sudah terdaftar')
    } else {
      callback('Terjadi kesalahan')
    }
  })
}

export function logoutUser(callback: any) {
  firebase.auth().signOut().then(() => {
    callback(true)
  })
}

export const penggunaData = firebase.auth().currentUser

export function getHari(kode: any) {
  let haris = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
  return haris[kode]
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
  // var date = Date.now()
  // var timestamp = Math.floor(date/1000)+3600
  // var lastUpdated = useSelector((state:any)=>state.tokenLastUpdated)
  return new Promise((resolve, reject) => {
    //if not expired
    // if(lastUpdated>=timestamp){
    //   resolve(useSelector((state:any)=>state.token))
    //   return true
    // }
    //if expired
    firebase.auth().currentUser?.getIdToken(true).then(function (idToken) {
      //console.log(idToken)
      resolve(idToken)
    }).catch(function (error) {
      reject(error)
    })
  })
}

export function isPemilik(callback: Function) {
  getToken().then(function (result) {
    axios.get(apiSite + '/api/pemilik/ami?token=' + result, {
      withCredentials: false
    }).then(function (result) {
      callback(result)
    })
  })
}

export function isStaf(callback: Function) {
  getToken().then(function (result) {
    axios.get(apiSite + '/api/staf/ami?token=' + result).then(function (result) {
      callback(result)
    })
  })
}

export function getDateDisplay(data: any) {
  let day = ""
  switch (data.hari) {
    case 0:
      day = "Senin"
      break;
    case 1:
      day = "Selasa"
      break;
    case 2:
      day = "Rabu"
      break;
    case 3:
      day = "Kamis"
      break;
    case 4:
      day = "Jumat"
      break;
    case 5:
      day = "Sabtu"
      break;
    case 6:
      day = "Minggu"
      break;
    default:
      break;
  }
  let month = ''
  switch (data.bulan) {
    case 0:
      month = "Januari"
      break;
    case 1:
      month = "Februari"
      break;
    case 2:
      month = "Maret"
      break;
    case 3:
      month = "April"
      break;
    case 4:
      month = "Mei"
      break;
    case 5:
      month = "Juni"
      break;
    case 6:
      month = "Juli"
      break;
    case 7:
      month = "Agustus"
      break;
    case 8:
      month = "September"
      break;
    case 9:
      month = "Oktober"
      break;
    case 10:
      month = "November"
      break;
    case 11:
      month = "Desember"
      break;
    default:
      break;
  }
  return day + ", " + data.tanggal + " " + month
}

export function getPerkiraan(data: any) {
  var jadwalArr = data.jadwal
  var jadwalHari = jadwalArr[data.hari]
  var decodedJadwal = decodeJadwal(jadwalHari)
  var durasi = parseInt(data.durasi)
  var slots = new Array(0)
  var slotNumber = 1
  decodedJadwal.forEach(sesi => {
    for (let i = sesi.mulai; i < sesi.selesai; i += durasi) {
      var newSlot = {
        mulai: minutesToTime(i),
        durasi: durasi,
        urutan: slotNumber
      }
      slots = slots.concat(newSlot)
      slotNumber++
    }
  })
  var perkiraan = ''
  slots.forEach(slot => {
    if (slot.urutan == data.slot) {
      perkiraan = slot.mulai
    }
  })
  return perkiraan
}

function decodeJadwal(jadwalHari: any) {
  var sesis = jadwalHari.split(",")
  var decodedSesis = new Array(0)
  sesis.forEach((sesi: any) => {
    var jamMulai = sesi.split("-")[0]
    var jamSelesai = sesi.split("-")[1]
    decodedSesis = decodedSesis.concat({
      mulai: timeToMinutes(jamMulai),
      selesai: timeToMinutes(jamSelesai)
    })
  })
  return decodedSesis
}

function timeToMinutes(time: any) {
  var hour = time.split(":")[0]
  var minute = time.split(":")[1]
  return parseInt(hour) * 60 + parseInt(minute)
}

function minutesToTime(minutes: any) {
  var hour = Math.floor(minutes / 60)
  var minute = minutes % 60
  var newhour = hour < 10 ? "0" + hour : hour
  var newminute = minute < 10 ? "0" + minute : minute
  return newhour + ":" + newminute
}

export function getTanggalHariIni() {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let newMonth = month < 10 ? "0" + month : month
  let day = date.getDate()
  let newDay = day < 10 ? "0" + day : day
  return parseInt(year.toString() + newMonth + newDay)
}

export function getTanggalDisplay(tanggal: any) {
  let tgl = tanggal.toString()
  let tahun = parseInt(tgl.substr(0, 4))
  let bulan = parseInt(tgl.substr(4, 2))
  let hari = parseInt(tgl.substr(6, 2))
  let date = new Date(tgl.substr(0, 4), bulan, hari - 2)
  let bulans = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  const options = { weekday: 'long' }
  let weekday = date.toLocaleDateString('id-id', options)
  return weekday + ", " + hari + " " + bulans[bulan - 1] + " " + tahun
}

export function getHariKode(tanggal: any) {
  let date = getDate(tanggal)
  let hariKode = date.getDay() - 1
  return hariKode < 0 ? hariKode + 7 : hariKode
}

function getDate(tanggal: any) {
  let tgl = tanggal.toString()
  let tahun = parseInt(tgl.substr(0, 4))
  let bulan = parseInt(tgl.substr(4, 2))
  let hari = parseInt(tgl.substr(6, 2))
  let date = new Date(tgl.substr(0, 4), bulan, hari - 2)
  return date
}

export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider()

export default firebase