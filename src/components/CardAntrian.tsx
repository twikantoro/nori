import React, { Component } from 'react'
import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonRow, IonCol, IonCardSubtitle, IonButton } from '@ionic/react'

interface OwnProps {
  gerai: string,
  subLayanan: string,
  prefix: string,
  slot: any,
  current: any,
  perkiraan: string
}

interface CardAntrianProps extends OwnProps { }

const CardAntrian: React.FC<CardAntrianProps> = ({ gerai, subLayanan, prefix, slot, current, perkiraan }) => {
  return (
    <IonCard className="card-antrian">
      <IonItem>
        <IonAvatar slot="end">
          <img src="https://firebasestorage.googleapis.com/v0/b/nori-3744e.appspot.com/o/bilogohitam.png?alt=media&token=eb18963d-677b-488d-9955-f28eefaad12c" />
        </IonAvatar>
        <IonLabel>
          <h3>{gerai}</h3>
          <p>{subLayanan}</p>
        </IonLabel>
      </IonItem>

      <IonCardContent>
        <IonRow>
          <IonCol>
            <IonCardSubtitle>No. Anda</IonCardSubtitle>
            <b>{prefix}-{slot}</b>
          </IonCol>
          <IonCol>
            <IonCardSubtitle>No. Sekarang</IonCardSubtitle>
            <b>{prefix}-{current}</b>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCardSubtitle>Perkiraan Dipanggil</IonCardSubtitle>
            <b>{perkiraan}</b>
          </IonCol>
        </IonRow>

      </IonCardContent>
    </IonCard>

  )
}

export default CardAntrian