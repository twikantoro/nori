import React, { useState } from "react";
import { IonPage, IonHeader, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonRow, IonImg, IonGrid, IonCol, IonButton, IonToolbar } from "@ionic/react";
import { signupUser, validateEmail } from "../config/firebaseConfig";
import { toast } from '../components/toast'
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function Signup() {
    if (validateEmail(email)) {
      await signupUser(email, password, function(response: any){
        toast(response)
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
          <IonRow>
            <IonCol>
              <p>Sudah punya akun? <Link to="/login">Login</Link></p>
            </IonCol>

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Signup