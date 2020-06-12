import React, { useState } from 'react'
import { IonHeader, IonContent, IonToolbar, IonButtons, IonBackButton, IonTitle, IonItem, IonLabel, IonInput, IonButton, IonLoading } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import firebase, { getCurrentUser } from '../config/firebaseConfig'
import { toast } from '../components/toast'
import $ from 'jquery'
import { setUserState } from '../redux/actions'

const AkunEdit: React.FC = () => {
  const state = useSelector((state: any) => state)
  const pengguna = state.pengguna
  const user = firebase.auth().currentUser
  const [nama, setNama] = useState(user?.displayName)
  const [busy, setBusy] = useState(false)
  const dispatch = useDispatch()

  async function submitForm() {
    setBusy(true)
    user?.updateProfile({
      displayName: nama
    }).then(response => {
      //berhasil
      setBusy(false)
      //console.log("user",user)
      $('#btn-to-akun').click()
    }).catch(e => {
      toast("error: " + e)
    })
  }

  return (
    <>
      <IonButton id="btn-to-akun" className="ion-hide" routerLink={"/"+state.role+"/akun"} />
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
        <IonButton expand="block" onClick={() => submitForm()}>
          Submit
        </IonButton>
      </IonContent>
    </>
  )
}

export default AkunEdit