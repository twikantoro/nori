import React, { Component, useState } from 'react'
import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonRow, IonCol, IonCardSubtitle, IonButton, IonIcon, IonItemDivider, IonBadge } from '@ionic/react'
import { chevronUpSharp, chevronUpCircleOutline, chevronDownSharp, chevronBackSharp } from 'ionicons/icons'
import { useSelector } from 'react-redux'

interface OwnProps {
  gerai: string,
  subLayanan: string,
  prefix: string,
  slot: any,
  current: any,
  perkiraan: string
}

interface CardAntrianProps extends OwnProps { }

const CardRiwayat: React.FC = () => {
  const [expanded, setExpanded] = useState(true)
  const heightlessItemDivider = {
    minHeight: '1px'
  }
  const width100 = {
    width: '100%'
  }
  const expandBtnStyle = {
    color: 'inherit',
    width: '100%'
  }

  return (
    <IonCard className="card-antrian">
      <IonItem lines="none" button className="ripple-transparent" onClick={(e: any) => expanded ? setExpanded(false) : setExpanded(true)}>
        <IonLabel>
          <h3>Bank Ngadirejo</h3>
          <p>Tukar Uang</p>
        </IonLabel>
        <IonBadge color="success">Sukses</IonBadge>
      </IonItem>
      {expanded ?
        <div>
      <IonItemDivider style={heightlessItemDivider}></IonItemDivider>
          <IonCardContent>

            <IonRow>
              <IonCol>
                <IonCardSubtitle>No. Anda</IonCardSubtitle>
                <b>prefix-slot</b>
              </IonCol>
              <IonCol>
                <IonCardSubtitle>No. Sekarang</IonCardSubtitle>
                <b>prefix-current</b>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonCardSubtitle>Perkiraan Dipanggil</IonCardSubtitle>
                <b>perkiraan</b>
              </IonCol>
            </IonRow>
            <IonButton fill="solid" expand="block" color="success shade">Tulis Review</IonButton>


          </IonCardContent>
        </div>
        : ''}
      <IonItemDivider style={heightlessItemDivider}></IonItemDivider>

{
  expanded ? <IonItem style={expandBtnStyle}>
    <IonButton className="ripple-transparent" fill="clear" expand="block" style={expandBtnStyle} onClick={(e: any) => expanded ? setExpanded(false) : setExpanded(true)}>
    <IonIcon icon={chevronUpSharp}></IonIcon>
    </IonButton>
  </IonItem> : ''
}

      {/* <IonItem className="ripple-transparent" style={expandBtnStyle} onClick={(e: any) => expanded ? setExpanded(false) : setExpanded(true)}>
        <IonLabel>Detail</IonLabel>
        <IonIcon icon={expanded ? chevronUpSharp : chevronDownSharp}></IonIcon>
      </IonItem> */}

    </IonCard>
  )
}

export default CardRiwayat