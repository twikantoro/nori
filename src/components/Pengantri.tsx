import React from 'react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
//import antrianPage from '../pages/antrianPage'
import PengantriTabBar from './PengantriTabBar'
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonApp } from '@ionic/react'
import { useSelector } from 'react-redux'
import AntrianPage from '../pages/Pengantri/Antrian'
import CariPage from '../pages/Pengantri/Cari'
import NotifikasiPage from '../pages/Pengantri/Notifikasi'
import RiwayatPage from '../pages/Pengantri/Riwayat'

const Pengantri: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/pengantri" render={() => <Redirect to="/pengantri/antrian" />} />
        <Route exact path="/pengantri/antrian" component={AntrianPage} />
        <Route exact path="/pengantri/cari" component={CariPage} />
        <Route exact path="/pengantri/notifikasi" component={NotifikasiPage} />
        <Route exact path="/pengantri/Riwayat" component={RiwayatPage} />
      </IonReactRouter>

    </IonApp>
  )
}

export default Pengantri