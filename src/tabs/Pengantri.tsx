import { IonApp, IonContent, IonTabBar, IonPage, IonHeader, IonToolbar, IonTitle, IonTabs, IonRouterOutlet, IonTabButton, IonIcon, IonLabel, IonTab } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AntrianTab from './pengantri/AntrianTab'
import CariTab from './pengantri/CariTab'
import NotifikasiTab from './pengantri/NotifikasiTab'
import RiwayatTab from './pengantri/RiwayatTab'
import AkunTab from './pengantri/AkunTab'
import { calendarOutline, searchSharp, notificationsOutline, readerOutline, personOutline, fileTrayFullOutline, duplicateOutline } from 'ionicons/icons'

const Pengantri: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact from="/pengantri" to="/pengantri/riwayat" />
        <Route path="/pengantri/antrian" render={() => <AntrianTab />} exact={true} />
        <Route path="/pengantri/cari" render={() => <CariTab />} exact={true} />
        <Route path="/pengantri/notifikasi" render={() => <NotifikasiTab />} exact={true} />
        <Route path="/pengantri/riwayat" render={() => <RiwayatTab />} exact={true} />
        <Route path="/pengantri/akun" render={() => <AkunTab />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" selectedTab="antrian">
        <IonTabButton tab="antrian" href="/pengantri/antrian" selected>
          <IonIcon icon={calendarOutline} />
          <IonLabel>Antrian</IonLabel>
        </IonTabButton>
        <IonTabButton tab="riwayat" href="/pengantri/riwayat">
          <IonIcon icon={readerOutline} />
          <IonLabel>Riwayat</IonLabel>
        </IonTabButton>
        <IonTabButton tab="cari" href="/pengantri/cari">
          <IonIcon icon={duplicateOutline} />
          <IonLabel>Cari gerai</IonLabel>
        </IonTabButton>
        <IonTabButton tab="notifikasi" href="/pengantri/notifikasi">
          <IonIcon icon={notificationsOutline} />
          <IonLabel>Notifikasi</IonLabel>
        </IonTabButton>
        <IonTabButton tab="akun" href="/pengantri/akun">
          <IonIcon icon={personOutline} />
          <IonLabel>Akun</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Pengantri