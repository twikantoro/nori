import React from 'react'
import { IonPage, IonContent, IonGrid, IonRow, IonSpinner } from '@ionic/react'

const BusyPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-align-items-end height-50-percent">
            <IonSpinner name="dots" /></IonRow><IonRow></IonRow></IonGrid></IonContent></IonPage>
  )
} 
  
export default BusyPage
