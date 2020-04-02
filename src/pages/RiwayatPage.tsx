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
        <CardRiwayat 
          gerai="Bank Ngadirejo"
          subLayanan="Bayar utang"
          prefix="A"
          slot="117"
          tanggal="2 April 2020"
          waktu="12:35"
          bintang="0"
          status="sukses"
          kebuka={true}
        />
        <CardRiwayat 
          gerai="Bank Ngadirejo"
          subLayanan="Bayar utang"
          prefix="A"
          slot="117"
          tanggal="2 April 2020"
          waktu="12:35"
          bintang="5"
          status="sukses"
          kebuka={false}
        />
        <CardRiwayat 
          gerai="Bank Ngadirejo"
          subLayanan="Bayar utang"
          prefix="A"
          slot="117"
          tanggal="2 April 2020"
          waktu="12:35"
          bintang="5"
          status="sukses"
          kebuka={false}
        />
      </IonContent>
    </>
  )
}

export default connect()(DefaultRiwayatPage)