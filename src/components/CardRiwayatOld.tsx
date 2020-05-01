import React, { Component, useState } from 'react'
import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonRow, IonCol, IonCardSubtitle, IonButton, IonIcon, IonItemDivider, IonBadge, IonAlert, IonSpinner, IonPopover } from '@ionic/react'
import { chevronUpSharp, chevronUpCircleOutline, chevronDownSharp, chevronBackSharp, star, starHalfSharp, starHalf, starOutline, addCircle, create, add, helpCircleOutline, helpCircle, closeOutline } from 'ionicons/icons'
import { useSelector } from 'react-redux'
import { isPlatform } from '@ionic/react'

interface OwnProps {
  gerai: string,
  subLayanan: string,
  prefix: string,
  slot: any,
  tanggal: string,
  waktu: string,
  bintang: string,
  status: string,
  kebuka: boolean
}

interface CardAntrianProps extends OwnProps { }

const CardRiwayat: React.FC<CardAntrianProps> = ({gerai,subLayanan,prefix,slot,tanggal,waktu,bintang,status,kebuka=false}) => {
  const [expanded, setExpanded] = useState(kebuka)
  const [stars, setStars] = useState(bintang)
  const [starsSet, setStarsSet] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [starsBusy, setStarsBusy] = useState(false)
  const [showPopover, setShowPopover] = useState(false)

  

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
  const submitStar = (stars: any) => {
    setStarsBusy(true)
    setStarsSet(true)
  }

  return (
    <IonCard className="card-antrian">
      <IonItem style={colorInherit} lines="none" className="ripple-transparent" onClick={(e: any) => expanded ? setExpanded(false) : setExpanded(true)}>
        <IonLabel>
          <h3><b>Bank Ngadirejo</b></h3>
          <p>Tukar Uang</p>
        </IonLabel>
        <IonBadge color="primary">Sukses</IonBadge>
      </IonItem>
      {expanded ?
        <div>
          <IonItemDivider style={heightlessItemDivider}></IonItemDivider>
          <IonCardContent>

            <IonRow>
              <IonCol>
                <IonCardSubtitle>Slot</IonCardSubtitle>
                <IonBadge color="warning shade">A-117</IonBadge>
              </IonCol>
              <IonCol>
                <IonCardSubtitle>Penilaian</IonCardSubtitle>
                {stars === '0' ?
                  <>
                    {starsBusy && stars === '0' ? <IonSpinner /> : '-'}
                  </> :
                  <><IonIcon icon={star} color="warning" />
                    <IonIcon icon={star} color="warning" />
                    <IonIcon icon={star} color="warning" />
                    <IonIcon icon={star} color="warning" />
                    <IonIcon icon={starOutline} color="warning" /></>}
              </IonCol>

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
                    <IonIcon icon={closeOutline} onClick={() => setShowPopover(false)}/>
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

          {stars!=='0' ? '' : <IonButton className="ion-margin" fill="solid" expand="block" color="primary" onClick={() => setShowAlert(true)}>Kasih bintang</IonButton>}

        </div>
        : ''}
      
      {expanded? '' : <>
      <IonItemDivider style={heightlessItemDivider} />
      <IonItem style={colorInherit} lines="none"><IonLabel style={width100}><p className="ion-text-center">1 April</p></IonLabel></IonItem></>}
      {/* {
  expanded ? <IonItem style={expandBtnStyle}>
    <IonButton className="ripple-transparent" fill="clear" expand="block" style={expandBtnStyle} onClick={(e: any) => expanded ? setExpanded(false) : setExpanded(true)}>
    <IonIcon icon={chevronUpSharp}></IonIcon>
    </IonButton>
  </IonItem> : ''
} */}

      {/* <IonItem className="ripple-transparent" style={expandBtnStyle} onClick={(e: any) => expanded ? setExpanded(false) : setExpanded(true)}>
        <IonLabel>Detail</IonLabel>
        <IonIcon icon={expanded ? chevronUpSharp : chevronDownSharp}></IonIcon>
      </IonItem> */}

      {/* {stars === 0 ? 
      <IonItem lines="none">
        
      </IonItem>
      : ''} */}

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Kasih bintang'}
        subHeader={'Bagaimana pengalaman anda?'}
        inputs={[
          {
            name: 'radio1',
            type: 'radio',
            label: 'Bagus (5)',
            value: '5',
            checked: true
          },
          {
            name: 'radio2',
            type: 'radio',
            label: 'Biasa (4)',
            value: '4'
          },
          {
            name: 'radio3',
            type: 'radio',
            label: 'Cukup (3)',
            value: '3'
          },
          {
            name: 'radio4',
            type: 'radio',
            label: 'Kecewa (2)',
            value: '2'
          },
          {
            name: 'radio5',
            type: 'radio',
            label: 'Benci (1)',
            value: '1'
          }
        ]}
        buttons={[
          {
            text: 'Batal',
            role: 'cancel',
          }, {
            text: 'OK',
            handler: (alertData) => {
              console.log('rated ' + alertData)
              submitStar(alertData)
            }
          }
        ]}
      ></IonAlert>

    </IonCard>
  )
}

export default CardRiwayat