import React from 'react'
import { IonPage, IonHeader, IonContent, IonAlert, IonBadge, IonImg } from '@ionic/react'
import { useSelector } from 'react-redux'

const antrianPage: React.FC = () => {
  const username = useSelector((state:any) => state.user.username)
  return (
    <IonPage className="ion-padding">
      <div className="nori-logo-big">
        {/* <IonImg src='assets/logo/full-transparent.png' /> */}
      </div>
      <IonContent>
        <p>Hello {username}</p>
      </IonContent>
    </IonPage>
  )
}

export default antrianPage