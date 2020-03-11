import React from 'react'
import { IonPage, IonContent, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react'
import { home, homeSharp, search, searchSharp, notificationsCircleSharp, notificationsSharp, notificationsOff, notificationsOutline, person, analyticsSharp, reorderFourSharp, readerOutline, calendarSharp, calendarOutline } from 'ionicons/icons'
import { userInfo } from 'os'
import { Route, Redirect } from 'react-router'

const PengantriTabBar: React.FC = (match) => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="antrian" href="/tabs/antrian">
        <IonIcon icon={calendarOutline} />
        <IonLabel>Antrian</IonLabel>
      </IonTabButton>
      <IonTabButton>
        <IonIcon icon={searchSharp} />
        <IonLabel>Cari gerai</IonLabel>
      </IonTabButton>
      <IonTabButton>
        <IonIcon icon={notificationsOutline} />
        <IonLabel>Notifikasi</IonLabel>
      </IonTabButton>
      <IonTabButton>
        <IonIcon icon={readerOutline} />
        <IonLabel>Riwayat</IonLabel>
      </IonTabButton>
    </IonTabBar>
  )
}

export default PengantriTabBar