import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, IonIcon, IonRefresher, IonRefresherContent } from "@ionic/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from '../components/toast';
import firebase, { loginUser, validateEmail, providerGoogle, providerFacebook } from "../config/firebaseConfig";
import { Link } from "react-router-dom";
import { logoFacebook, logoGoogle, eyeOutline, eyeOffOutline } from "ionicons/icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
  const dispatch = useDispatch()
  const colorInherit = {
    color: "inherit"
  }

  async function login() {
    if (validateEmail(email)) {
      setBusy(true)
      const res = await loginUser(email, password, function (response: any) {
        setBusy(false)
        toast(response)
        if (response.substring(0, 1) === 'B') {
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

  async function loginWithGoogle2() {
    firebase.auth().signInWithRedirect(providerGoogle).then(function (result) {
      toast('Berhasil')
      document.location.href = "/pengantri"
    }).catch(e => {
      toast(e)
    })

  }

  function loginWithGoogle() {
    setBusy(true)
    firebase.auth().signInWithPopup(providerGoogle).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var credential = result.credential;
      // The signed-in user info.
      var user = result.user;
      // ...
      toast('Berhasil')
      document.location.href = "/pengantri"
    }).catch(function (error) {
      setBusy(false)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      toast(errorMessage)
    });
  }

  async function loginWithFacebook() {
    firebase.auth().signInWithPopup(providerFacebook).then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential;
      // The signed-in user info.
      var user = result.user;
      // ...
      toast('Berhasil')
      document.location.href = "/"
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }

  return (
    <IonPage id="login-page">
      {/* <IonHeader>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>

      </IonHeader> */}

      <IonContent className="ion-padding" style={colorInherit}>
        <IonRefresher slot="fixed" onIonRefresh={() => window.location.href = window.location.href}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <h1 className="ion-text-center">Login</h1>

        <p className="ion-text-center"></p>
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
                type={passwordShown ? 'text' : 'password'}
                placeholder="Password"
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
              <IonIcon size="small" icon={!passwordShown ? eyeOutline : eyeOffOutline} 
                onClick={()=>setPasswordShown(!passwordShown)}
              />
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton
                type="submit"
                expand="block"
                onClick={login}
              >Masuk
              </IonButton>
            </IonCol>
          </IonRow>

          <p className="ion-text-center">Atau</p>
          {/* <IonButton color="facebook" className="no-text-transform" expand="block" onClick={()=>loginWithFacebook()}>
            <IonIcon icon={logoFacebook} slot="start" />
             Login dengan Facebook</IonButton> */}
          <IonButton mode="md" color="justwhite" className="no-text-transform custom-login-text-google" expand="block" onClick={() => loginWithGoogle2()}>
            {/* <IonIcon icon={logoGoogle} slot="start" /> */}
            <img src="/assets/img/google-logo.png" className="custom-login-pic-google" />
            Masuk dengan Google</IonButton>
          <IonRow className="ion-justify-content-center">
            <p>Atau <Link to="/signup">daftar</Link> dengan email</p>
          </IonRow>
        </IonGrid>
        <div className="custom-filler"></div></IonContent>
    </IonPage>
  )
}

export default Login
