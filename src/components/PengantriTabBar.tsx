import React from 'react'
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { searchSharp, notificationsOutline, readerOutline, calendarOutline } from 'ionicons/icons'

const PengantriTabBar: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="antrian" href="/pengantri/antrian">
        <IonIcon icon={calendarOutline} />
        <IonLabel>Antrian</IonLabel>
      </IonTabButton>
      <IonTabButton tab="cari" href="/pengantri/cari">
        <IonIcon icon={searchSharp} />
        <IonLabel>Cari gerai</IonLabel>
      </IonTabButton>
      <IonTabButton tab="notifikasi" href="/pengantri/notifikasi">
        <IonIcon icon={notificationsOutline} />
        <IonLabel>Notifikasi</IonLabel>
      </IonTabButton>
      <IonTabButton tab="riwayat" href="/pengantri/riwayat">
        <IonIcon icon={readerOutline} />
        <IonLabel>Riwayat</IonLabel>
      </IonTabButton>
    </IonTabBar>
  )
}

export default PengantriTabBar