import { useSelector } from "react-redux"
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonAvatar, IonFabList, IonList, IonButton, IonButtons } from "@ionic/react"
import React from "react"
import PemilikTabBar from "../../components/PemilikTabBar"
import Gerais from "../../components/Pemilik/Gerais"

const GeraiPage: React.FC = () => {
  const state = useSelector((state:any) => state)
  console.log(state)
  return (
    <IonPage>
      <IonHeader>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              Dashboard
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonHeader>
      <IonContent>
        <Gerais />
      </IonContent>
      <PemilikTabBar />
    </IonPage>
  )
}

export default GeraiPage