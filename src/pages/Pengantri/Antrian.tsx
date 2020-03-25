import { useSelector } from "react-redux"
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonAvatar, IonFabList, IonList, IonButton, IonButtons } from "@ionic/react"
import React from "react"
import PengantriTabBar from "../../components/PengantriTabBar"
import { wifi } from "ionicons/icons"
import CardAntrian from "../../components/Pengantri/CardAntrian"

const AntrianPage: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  return (
    <IonPage>
      <IonHeader>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              Antrian
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonHeader>
      <IonContent>
        <CardAntrian />
      </IonContent>
      <PengantriTabBar />
    </IonPage>
  )
}

export default AntrianPage