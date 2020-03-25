import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react"
import React from "react"
import PengantriTabBar from "../../components/PengantriTabBar"

const NotifikasiPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              Notifikasi
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>You have no notifs</p>
      </IonContent>
      <PengantriTabBar />
    </IonPage>
  )
}

export default NotifikasiPage