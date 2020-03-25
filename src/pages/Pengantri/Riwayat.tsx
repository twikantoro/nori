import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react"
import React from "react"
import PengantriTabBar from "../../components/PengantriTabBar"

const RiwayatPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              Riwayat transaksi
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Hallo</p>
      </IonContent>
      <PengantriTabBar />
    </IonPage>
  )
}

export default RiwayatPage