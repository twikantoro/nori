import React from 'react'
import { IonPage, IonContent } from '@ionic/react'
import { useSelector } from 'react-redux'

const ErrorPage: React.FC = () => {
  const error = useSelector((state: any) => state.error)
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h3>Error</h3>
        <p>{error}</p>
      </IonContent>
    </IonPage>
  )
}

export default ErrorPage