import React from 'react'
import { IonHeader, IonButtons, IonBackButton, IonTitle, IonContent, IonToolbar } from '@ionic/react'

const OrderView: React.FC = () => {
  let urlArray = window.location.href.split("/")
  let kodeGerai = urlArray[5]
  let kodeLayanan = urlArray[6]
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref={"/pengantri/cari/" + kodeGerai + "/" + kodeLayanan}></IonBackButton>
          </IonButtons>
          <IonTitle>Pilih waktu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

      </IonContent>
    </>
  )
}

export default OrderView