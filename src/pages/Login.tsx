import React from "react";
import { IonPage, IonHeader, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonRow, IonImg, IonGrid, IonCol, IonButton } from "@ionic/react";

const Login: React.FC = () => {
  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Login</IonTitle>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>

            <IonList>
              <IonItem>
                <IonInput type="text" placeholder="Username"></IonInput>
              </IonItem>
              <IonItem>
                <IonInput type="password" placeholder="Password"></IonInput>
              </IonItem>
            </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Login</IonButton>
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