import React from 'react'
import { IonHeader, IonButtons, IonBackButton, IonTitle, IonContent, IonToolbar, IonPage } from '@ionic/react'

const OrderView: React.FC = () => {
  let urlArray = window.location.href.split("/")
  let kodeGerai = urlArray[5]
  let kodeLayanan = urlArray[6]
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref={"/pengantri/cari/" + kodeGerai + "/" + kodeLayanan}></IonBackButton>
          </IonButtons>
          <IonTitle>Pilih waktu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

      <div className="custom-filler"></div></IonContent>
    </IonPage>
  )
}

export default OrderView