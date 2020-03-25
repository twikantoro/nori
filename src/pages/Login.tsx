import React, { useState } from "react";
import { IonPage, IonHeader, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonRow, IonImg, IonGrid, IonCol, IonButton, IonToolbar } from "@ionic/react";
import { loginUser, validateEmail } from "../config/firebaseConfig";
import { toast } from '../components/toast'
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  async function login(){
    if (validateEmail(email)) {
      const res = await loginUser(email, password, function(response: any){
        toast(response)
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
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Login