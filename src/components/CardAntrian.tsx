import React, { Component, useState } from 'react'
import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonRow, IonCol, IonCardSubtitle, IonButton, IonBadge, IonIcon, IonItemDivider, IonSpinner, IonPopover } from '@ionic/react'
import { chevronUpCircleOutline, star, starOutline, closeOutline, helpCircle } from 'ionicons/icons'

interface OwnProps {
  gerai: string,
  subLayanan: string,
  prefix: string,
  slot: any,
  current: any,
  tanggal: any,
  waktu: string,
  status: any
}

interface CardAntrianProps extends OwnProps { }

const CardAntrian: React.FC<CardAntrianProps> = ({ gerai, subLayanan, prefix, slot, tanggal, waktu, status }) => {
  const [showPopover, setShowPopover] = useState(false)
  const [statusLocal, setStatusLocal] = useState(status)

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
  const popoverContent = {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '16px',
  }
  const colorInherit = {
    color: 'inherit'
  }

  return (
    <IonCard className="card-antrian">
      <IonItem style={colorInherit} lines="none" className="ripple-transparent">
        <IonLabel>
          <h3><b>Bank Ngadirejo</b></h3>
          <p>Tukar Uang</p>
        </IonLabel>
        {statusLocal === 'berlangsung' ?
          <IonBadge color="warning">Berlangsung</IonBadge> : (
            statusLocal === 'terlambat' ? 
            <IonBadge color="danger">Terlambat</IonBadge> :
            <IonBadge color="light">Dipesan</IonBadge>
          )
        }

      </IonItem>

      <IonItemDivider style={heightlessItemDivider}></IonItemDivider>
      <IonCardContent>

        <IonRow>
          <IonCol>
            <IonCardSubtitle>Slot Anda</IonCardSubtitle>
            <IonBadge color="primary">A-117</IonBadge>
          </IonCol>
          {statusLocal === 'berlangsung' ?
            <IonCol>
              <IonCardSubtitle>Berlangsung</IonCardSubtitle>
              <IonBadge color="warning">A-17</IonBadge>
            </IonCol> : (
              statusLocal === 'terlambat' ? 
              <IonCol>
              <IonCardSubtitle>Berlangsung</IonCardSubtitle>
              <IonBadge color="danger">A-118</IonBadge></IonCol> : ''
            )}

        </IonRow>
        <IonRow>
          <IonCol>
            <IonCardSubtitle>Tanggal</IonCardSubtitle>
                1 April 2020
              </IonCol>
          <IonCol>


            <IonPopover
              isOpen={showPopover}
              onDidDismiss={e => setShowPopover(false)}
            >
              <IonItem lines="none" style={colorInherit}>
                <IonLabel>
                  <b>Info</b>
                </IonLabel>
                <IonIcon icon={closeOutline} onClick={() => setShowPopover(false)} />
              </IonItem>
              <IonItemDivider style={heightlessItemDivider}></IonItemDivider>
              <div style={popoverContent}>
                <p>Waktu slot adalah perkiraan kapan anda akan dipanggil.</p>
                <p>Dalam pelaksanaannya, bisa saja lebih awal atau terjadi kemunduran.</p>
                <p>Jika nomor urut anda sudah dilampaui sebelum perkiraan dipanggil, anda tidak dikenakan penalti.
                Sebaliknya jika nomor urut anda sudah dilampaui ketika waktu sudah melebihi perkiraan, maka anda dikenakan penalti
                    </p>
              </div>
            </IonPopover><IonCardSubtitle
              onClick={() => setShowPopover(showPopover ? false : true)}
            >Waktu Slot <IonIcon icon={helpCircle} /></IonCardSubtitle>

                12:35
              </IonCol>
        </IonRow>

      </IonCardContent>



    </IonCard>
  )
}


export default CardAntrian