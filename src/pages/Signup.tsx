import React, { useState } from "react";
import { IonPage, IonHeader, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonRow, IonImg, IonGrid, IonCol, IonButton, IonToolbar, IonLoading } from "@ionic/react";
import { signupUser, validateEmail } from "../config/firebaseConfig";
import { toast } from '../components/toast'
import { Link, Redirect } from "react-router-dom";
import { render } from "@testing-library/react";

const Signup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy]= useState(false)

  async function Signup() {
    if (validateEmail(email)) {
      if (password.length<6){
        toast('Password minimal 6 karakter')
        return false
      }
      setBusy(true)
      await signupUser(email, password, function (response: any) {
        setBusy(false)
        if(response.substring(0,1)=='E'){
          toast(response)
        } else if(response.substring(0,3)=='Ber') {
          toast(response)
          //window.location.href = '/login'
        }
      })
    } else {
      toast('Masukkan email yang valid')
    }
  }

  return (
    <IonPage id="Signup-page">
      <IonHeader>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
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
                onClick={Signup}
              >Signup
              </IonButton>
            </IonCol>

          </IonRow>
          <IonRow className="ion-justify-content-center">
            
              <p>Sudah punya akun? <Link to="/login">Login</Link></p>
            

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Signup