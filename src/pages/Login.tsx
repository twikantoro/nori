import React, { useState } from "react";
import { IonPage, IonHeader, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonRow, IonImg, IonGrid, IonCol, IonButton, IonToolbar, IonLoading } from "@ionic/react";
import { loginUser, validateEmail } from "../config/firebaseConfig";
import { toast } from '../components/toast'
import { useDispatch } from "react-redux";
import { setUserState } from "../redux/actions";
import { Redirect } from "react-router";

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy]= useState(false)
  const dispatch = useDispatch()

  async function login(){
    if (validateEmail(email)) {
      setBusy(true)
      const res = await loginUser(email, password, function(response: any){
        setBusy(false)
        toast(response)
        if(response.substring(0,1) == 'B'){
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