import React from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react"
import { useSelector, connect } from "react-redux"
import CardRiwayat from "../components/CardRiwayat"

const DefaultRiwayatPage: React.FC = () => {

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Riwayat
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CardRiwayat />
      </IonContent>
    </>
  )
}

export default connect()(DefaultRiwayatPage)