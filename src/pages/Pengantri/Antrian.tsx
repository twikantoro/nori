import { useSelector } from "react-redux"
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react"
import React from "react"
import PengantriTabBar from "../../components/PengantriTabBar"

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
      <IonContent className="ion-padding">
        <p>Hello {username}</p>
      </IonContent>
      <PengantriTabBar />
    </IonPage>
  )
}

export default AntrianPage