import React, { useState } from 'react'
import { IonPage, IonContent, IonTitle, IonHeader, IonButton, IonLoading } from '@ionic/react'
import Axios from 'axios'
import apiSite from '../config/apiSite'
import { getToken } from '../config/firebaseConfig'
import { toast } from '../components/toast'
import queryString from 'query-string'

const PemilikRegisterPage : React.FC = () => {
  const [busy, setBusy] = useState(false)

  async function registerAkunPemilik() {
    setBusy(true)
    var params = {
      token: await getToken()
    }
    Axios.get(apiSite + "/pemilik/register?" + queryString.stringify(params)).then(response => {
      setBusy(false)
      console.log(response.data.id)
      toast("Berhasil. Mengalihkan...")
      window.location.href = "/pemilik"
    }).catch(error=>{
      setBusy(false)
      console.log(error)
    })
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonLoading isOpen={busy} />
        <div>
        <h1>Buat akun Pemilik</h1>
        <p>Anda belum mempunyai akun pemilik. Apakah anda ingin membuatnya?</p>
        <IonButton onClick={()=>registerAkunPemilik()}>Buat</IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default PemilikRegisterPage