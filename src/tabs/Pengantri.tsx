import { IonIcon, IonLabel, IonLoading, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { calendarOutline, duplicateOutline, notificationsOutline, personOutline, readerOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { getCurrentUser, getToken } from '../config/firebaseConfig'
import AkunPage from '../pages/AkunPage'
import AntrianPage from '../pages/AntrianPage'
import CariPage from '../pages/CariPage'
import GeraiView from '../pages/GeraiView'
import LayananView from '../pages/LayananView'
import Logout from '../pages/Logout'
import NotifikasiPage from '../pages/NotifikasiPage'
import OrderView from '../pages/OrderView'
import RiwayatPage from '../pages/RiwayatPage'
import { getOrCreatePengantri, setIsFetching, setPenggunaData, setTabRefresh } from '../redux/actions'

const Pengantri: React.FC = () => {
  const state = useSelector((state: any) => state)
  const pengantri = state.pengantri
  const dispatch = useDispatch()
  const pengguna = state.pengguna
  const isFetchingLocal = state.isFetching
  useEffect(() => {
    if (pengantri.id === '' && !isFetchingLocal) {
      dispatch(setIsFetching(true))
      fetchPengantri()
    }
    if (pengguna.uid === '') {
      hehe()
    }
  })

  async function fetchPengantri() {
    dispatch(getOrCreatePengantri({ token: await getToken() }))
  }

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
        <Switch>
          <Redirect exact from="/pengantri" to="/pengantri/antrian" />
          <Route path="/pengantri/antrian" render={() => <AntrianPage />} exact={true} />
          <Route path="/pengantri/cari" render={() => <CariPage />} exact={true} />
          <Route exact path="/pengantri/cari/:id" component={GeraiView} />
          <Route exact path="/pengantri/cari/:id/:id" component={LayananView} />
          <Route exact path="/pengantri/cari/:id/:id/:tanggal" component={LayananView} />
          <Route path="/pengantri/notifikasi" render={() => <NotifikasiPage />} exact={true} />
          <Route path="/pengantri/riwayat" render={() => <RiwayatPage />} exact={true} />
          <Route path="/pengantri/akun" render={() => <AkunPage />} exact={true} />
          <Route exact path="/pengantri/akun/logout" component={Logout}></Route>
        </Switch>
      </IonRouterOutlet>
      <IonLoading isOpen={isFetchingLocal} />
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