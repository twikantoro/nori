import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { calendarOutline, duplicateOutline, notificationsOutline, personOutline, readerOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getCurrentUser } from '../config/firebaseConfig'
import { setPenggunaData, setTabRefresh } from '../redux/actions'
import AkunTab from './pengantri/AkunTab'
import AntrianTab from './pengantri/AntrianTab'
import CariTab from './pengantri/CariTab'
import NotifikasiTab from './pengantri/NotifikasiTab'
import RiwayatTab from './pengantri/RiwayatTab'

const Pengantri: React.FC = () => {
  const state = useSelector((state: any) => state)
  const pengantri = state.pengantri
  const dispatch = useDispatch()
  const pengguna = state.pengguna
  useEffect(() => {
    if (pengantri.id === '') {
      //
    }
    if (pengguna.uid === '') {
      hehe()
    }

  })

  async function hehe() {
    let currentUser = await getCurrentUser()
    console.log("cur user: ", currentUser)
    dispatch(setPenggunaData(currentUser))
  }

  const [lastClicked, setLastClicked] = useState('antrian')

  function refreshTab(tabname: any) {
    dispatch(setTabRefresh(tabname))
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact from="/pengantri" to="/pengantri/cari" />
        <Route path="/pengantri/antrian" render={() => <AntrianTab />} exact={true} />
        <Route path="/pengantri/cari" render={() => <CariTab />} exact={true} />
        <Route path="/pengantri/notifikasi" render={() => <NotifikasiTab />} exact={true} />
        <Route path="/pengantri/riwayat" render={() => <RiwayatTab />} exact={true} />
        <Route path="/pengantri/akun" render={() => <AkunTab />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" selectedTab="antrian">
        <IonTabButton tab="antrian" href="/pengantri/antrian"
          onClick={() => {
            if (lastClicked === 'antrian') refreshTab('antrian')
            setLastClicked('antrian')
          }}
          id="tab-antrian-btn">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Antrian</IonLabel>
        </IonTabButton>
        <IonTabButton tab="riwayat" href="/pengantri/riwayat" id="tab-riwayat-btn"
          onClick={() => {
            if (lastClicked === 'riwayat') refreshTab('riwayat')
            setLastClicked('riwayat')
          }}>
          <IonIcon icon={readerOutline} />
          <IonLabel>Riwayat</IonLabel>
        </IonTabButton>
        <IonTabButton tab="cari" href="/pengantri/cari" id="tab-reservasi-btn"
          onClick={() => {
            if (lastClicked === 'reservasi') refreshTab('reservasi')
            setLastClicked('reservasi')
          }}>
          <IonIcon icon={duplicateOutline} />
          <IonLabel>Reservasi</IonLabel>
        </IonTabButton>
        <IonTabButton tab="notifikasi" href="/pengantri/notifikasi" id="tab-notifikasi-btn"
          onClick={() => {
            if (lastClicked === 'notifikasi') refreshTab('notifikasi')
            setLastClicked('notifikasi')
          }}>
          <IonIcon icon={notificationsOutline} />
          <IonLabel>Notifikasi</IonLabel>
        </IonTabButton>
        <IonTabButton tab="akun" href="/pengantri/akun" id="tab-akun-btn"
          onClick={() => {
            if (lastClicked === 'akun') refreshTab('akun')
            setLastClicked('akun')
          }}>
          <IonIcon icon={personOutline} />
          <IonLabel>Akun</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Pengantri