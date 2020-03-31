import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from '../components/toast';
import { loginUser, validateEmail } from "../config/firebaseConfig";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const dispatch = useDispatch()

  async function login() {
    if (validateEmail(email)) {
      setBusy(true)
      const res = await loginUser(email, password, function (response: any) {
        setBusy(false)
        toast(response)
        if (response.substring(0, 1) == 'B') {
          window.history.replaceState({}, '', '/pengantri')
          return (
            window.location.replace('/pengantri')
          )
        }
      })
    } else {
      toast('Masukkan email yang valid')
    }
  }

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>

      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading
          isOpen={busy}
        />
        <IonGrid>

          <IonList>
            <IonItem>
              <IonInput
                type="text"
                placeholder="Email"
                onIonChange={(e: any) => setEmail(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="password"
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
                onClick={login}
              >Login
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <p>Belum punya akun? <Link to="/signup">Signup</Link></p>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Login