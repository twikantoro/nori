import React, { Component } from 'react'
import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonRow, IonCol, IonCardSubtitle, IonButton } from '@ionic/react'

const CardAntrian: React.FC = () => {
  return (
    <IonCard className="card-antrian">
      <IonItem>
        <IonAvatar slot="end">
          <img src="https://firebasestorage.googleapis.com/v0/b/nori-3744e.appspot.com/o/bilogohitam.png?alt=media&token=eb18963d-677b-488d-9955-f28eefaad12c" />
        </IonAvatar>
        <IonLabel>
          <h3>Bank Indonesia Solo</h3>
          <p>Tukar uang</p>
        </IonLabel>
      </IonItem>

      <IonCardContent>
        <IonRow>
          <IonCol>
            <IonCardSubtitle>No. Anda</IonCardSubtitle>
            <b>A-117</b>
          </IonCol>
          <IonCol>
            <IonCardSubtitle>No. Sekarang</IonCardSubtitle>
            <b>A-67</b>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCardSubtitle>Perkiraan Dipanggil</IonCardSubtitle>
            <b>Senin, 30 Februari | 12:34</b>
          </IonCol>
        </IonRow>

        <IonButton expand="block">
          Batal antri
              </IonButton>

      </IonCardContent>
    </IonCard>

  )
}

export default CardAntrian