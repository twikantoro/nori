import { IonApp, IonContent, IonTabBar, IonPage, IonHeader, IonToolbar, IonTitle, IonTabs, IonRouterOutlet, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AntrianPage from '../pages/Pengantri/Antrian'
import CariPage from '../pages/Pengantri/Cari'
import NotifikasiPage from '../pages/Pengantri/Notifikasi'
import RiwayatPage from '../pages/Pengantri/Riwayat'
import PengantriTabBar from './PengantriTabBar'
import { calendarOutline, searchSharp, notificationsOutline, readerOutline } from 'ionicons/icons'

const Pengantri: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/pengantri" render={() => <Redirect to="/pengantri/antrian" />} />
        <Route exact path="/pengantri/antrian" component={AntrianPage} />
        <Route exact path="/pengantri/cari" component={CariPage} />
        <Route exact path="/pengantri/notifikasi" component={NotifikasiPage} />
        <Route exact path="/pengantri/Riwayat" component={RiwayatPage} />

      </IonRouterOutlet>
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
    </IonTabs>
  )
}

export default Pengantri