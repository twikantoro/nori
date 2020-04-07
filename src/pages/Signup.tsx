import React, { useState } from "react";
import { IonPage, IonHeader, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonRow, IonImg, IonGrid, IonCol, IonButton, IonToolbar, IonLoading } from "@ionic/react";
import { signupUser, validateEmail } from "../config/firebaseConfig";
import { toast } from '../components/toast'
import { Link, Redirect } from "react-router-dom";
import { render } from "@testing-library/react";

const Signup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nama, setNama] = useState('')
  const [busy, setBusy] = useState(false)

  async function Signup() {
    if (validateEmail(email)) {
      if (password.length < 6) {
        toast('Password minimal 6 karakter')
        return false
      }
      setBusy(true)
      await signupUser(email, password, function (response: any) {
        setBusy(false)
        console.log(response)
        // if (response.substring(0, 1) == 'E') {
        //   toast(response)
        // } else if (response.substring(0, 3) == 'Ber') {
        //   toast(response)
        // }
      })
    } else {
      toast('Masukkan email yang valid')
    }
  }

  return (
    <IonPage id="Signup-page">

      <IonContent className="ion-padding">
        <h1 className="ion-text-center">Daftar</h1>
        <IonLoading
          isOpen={busy}
        />
        <IonGrid>

          <IonList>
            {/* <IonItem>
              <IonInput
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                onIonChange={(e: any) => setNama(e.target.value)}
              />
            </IonItem> */}
            <IonItem>
              <IonInput
                type="text"
                name="email"
                placeholder="Email"
                onIonChange={(e: any) => setEmail(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="password"
                name="password"
                placeholder="Password"
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton
                type="submit"
                expand="block"
                onClick={Signup}
              >Daftar
              </IonButton>
            </IonCol>

          </IonRow>
          <IonRow className="ion-justify-content-center">

            <p>Sudah punya akun? <Link to="/login">Masuk</Link></p>


          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Signup