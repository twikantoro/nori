import React from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonBadge, IonLabel, IonItemDivider, IonBackButton, IonButtons } from "@ionic/react"
import { useSelector, connect } from "react-redux"
import CardRiwayat from "../components/CardRiwayat"

const RiwayatDetailPage: React.FC = () => {

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/pengantri/riwayat"></IonBackButton>
          </IonButtons>
          <IonTitle>
            Riwayat
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CardRiwayat
          gerai="Gerai"
          subLayanan="Sub Layanan"
          prefix="A"
          slot="67"
          tanggal="30 Februari 2020"
          waktu="12:34"
          bintang="0"
          status="berhasil"
          kebuka={false}
        />
      </IonContent>
    </>
  )
}

export default connect()(RiwayatDetailPage)