import { IonAvatar, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from '@ionic/react'
import { chevronBackSharp, chevronDownSharp, settingsSharp } from 'ionicons/icons'
import React, { useState } from 'react'

const CardAntrian: React.FC = () => {
  const [layananExpanded, setLayananExpanded] = useState(false)
  var layanans = [
    {
      nama: "Tukar uang",
      kode: "tukaruang"
    }, {
      nama: "Ambil uang pensiun",
      kode: "pensiun"
    }
  ]

  const LayananIcon: React.FC = () => {
    return layananExpanded ? <IonIcon slot="end" icon={chevronDownSharp}></IonIcon> : <IonIcon slot="end" icon={chevronBackSharp}></IonIcon>
  }

  const Layanans: React.FC = () => {
    return (
      <div>
        {
          layanans.map(obj => {
            return (
              <IonItem key={obj.kode} button href={"/layanans/"+obj.kode}>
                <IonLabel>{obj.nama}</IonLabel>
              </IonItem>
            )
          })
        }
      </div>
    )
  }

  return (
    <IonCard className="card-antrian">
      <IonItem>
        <IonAvatar slot="start">
          <img src="https://firebasestorage.googleapis.com/v0/b/nori-3744e.appspot.com/o/bilogohitam.png?alt=media&token=eb18963d-677b-488d-9955-f28eefaad12c" />
        </IonAvatar>
        <IonLabel>
          <h3>Bank Indonesia Solo</h3>
          <p>Buka pukul 07.30</p>
        </IonLabel>
        <IonIcon slot="end" icon={settingsSharp}></IonIcon>
      </IonItem>

      <IonCardContent>
        <IonRow>
          <IonCol>
            <IonCardSubtitle>Jumlah Layanan</IonCardSubtitle>
            <b>2</b>
          </IonCol>
          <IonCol>
            <IonCardSubtitle>Jumlah Staf</IonCardSubtitle>
            <b>5</b>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCardSubtitle>Alamat</IonCardSubtitle>
            <p>Jl. Jend. Sudirman No.15, Kp. Baru, Kec. Ps. Kliwon, Kota Surakarta, Jawa Tengah 57133</p>
          </IonCol>
        </IonRow>
        <IonItem button
          onClick={(e: any) => layananExpanded ? setLayananExpanded(false) : setLayananExpanded(true)}
        >
          <IonLabel><b>Layanan</b></IonLabel>
          <LayananIcon />
        </IonItem>
        <IonGrid>
        {
          layananExpanded ? <Layanans /> : ''
        }
        </IonGrid>
        
      </IonCardContent>

    </IonCard>

  )
}

export default CardAntrian