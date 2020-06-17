import React, { useState } from 'react'
import { IonHeader, IonContent, IonToolbar, IonButtons, IonBackButton, IonTitle, IonItem, IonLabel, IonInput, IonButton, IonLoading, IonRefresher, IonRefresherContent } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import firebase, { getCurrentUser, logoutUser } from '../config/firebaseConfig'
import { toast } from '../components/toast'
import $ from 'jquery'
import { setUserState } from '../redux/actions'

const AkunEdit: React.FC = () => {
  const state = useSelector((state: any) => state)
  const pengguna = state.pengguna
  const user = firebase.auth().currentUser
  const [nama, setNama] = useState(user?.displayName)
  const [busy, setBusy] = useState(false)
  const [email, setEmail] = useState(user?.email ? user?.email : '')
  const dispatch = useDispatch()

  async function submitForm() {
    setBusy(true)
    user?.updateEmail(email).then(respon => {
      user?.updateProfile({
        displayName: nama
      }).then(response => {
        //berhasil
        setBusy(false)
        //console.log("user",user)
        $('#btn-to-akun').click()
      }).catch(e => {
        setBusy(false)
        toast("error: " + e.message)
      })
    }).catch(e => {
      setBusy(false)
      console.log(e.message)
      toast("Sudah lama sejak terakhir kali anda login. Anda akan diarahkan ke halaman login")
      setTimeout(() =>
        logoutUser(function (response: any) {
          if (response === true) {
            window.location.href = "/"
          }
        }), 2000)
    })

  }

  return (
    <>
      <IonButton id="btn-to-akun" className="ion-hide" routerLink={"/" + state.role + "/akun"} />
      <IonLoading isOpen={busy} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/pengantri/akun"></IonBackButton>
          </IonButtons>
          <IonTitle>Edit akun</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(r) => { setTimeout(() => r.detail.complete(), 1) }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonItem lines="none">
          <b>Nama:</b>&nbsp;
              <IonInput
            type="text"
            placeholder="Nama singkat"
            onIonChange={(e: any) => setNama(e.target.value)}
            required
            value={nama}
          />
        </IonItem>
        <IonItem lines="none">
          <b>Email:</b>&nbsp;
              <IonInput
            type="text"
            placeholder="user@nori.id"
            onIonChange={(e: any) => setEmail(e.target.value)}
            required
            value={email}
          />
        </IonItem>
        {/* <IonItem lines="none">
          <b>Foto profil:</b>&nbsp;

        </IonItem>
        <input className="ion-padding-horizontal" type="file" accept="image/*;capture=camera" /> */}
        <IonButton className="ion-margin" expand="block" onClick={() => submitForm()}>
          Submit
        </IonButton>
      <div className="custom-filler"></div></IonContent>
    </>
  )
}

export default AkunEdit