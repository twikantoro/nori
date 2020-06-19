import React, { useEffect } from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { Switch, Redirect, Route } from 'react-router'
import { calendarOutline, hourglassOutline, personOutline } from 'ionicons/icons'
import AkunStaf from '../pages/AkunStaf'
import { useSelector, useDispatch } from 'react-redux'
import { setIsFetching, setPenggunaData, setIsFetchingUser, fetchStafAsync, setIsFetchingStaf, retrieveFcmToken } from '../redux/actions'
import { getCurrentUser, getToken } from '../config/firebaseConfig'
import BusyPage from '../pages/Busy'
import Platform from '../pages/Platform'
import firebase from '../config/firebaseConfig'
import AkunEdit from '../pages/AkunEdit'

const Staf: React.FC = () => {
  const state = useSelector((state: any) => state)
  const pengguna = state.pengguna
  const isFetchingUserLocal = state.isFetchingUser
  const dispatch = useDispatch()
  const staf = state.staf
  const isFetchingLocal = state.isFetching
  const isFetchingStafLocal = state.isFetchingStaf

  // const fcmTokenLocal = state.fcmToken
  useEffect(() => {
    // if (!fcmTokenLocal) {
    //   dispatch(retrieveFcmToken(''))
    // }
    //init pengguna
    if (pengguna.uid === '' && !isFetchingUserLocal) {
      dispatch(setIsFetchingUser(true))
      initiatePengguna()
    }
    //init staf
    if (staf.id === '' && !isFetchingStafLocal) {
      initiateStaf()
    }
  })

  async function initiatePengguna() {
    let currentUser = await getCurrentUser()
    dispatch(setPenggunaData(currentUser))
    dispatch(setIsFetchingUser(false))
  }

  async function initiateStaf() {
    dispatch(setIsFetchingStaf(true))
    dispatch(fetchStafAsync({
      token: await getToken(),
      id_pengguna: pengguna.id,
      email: firebase.auth().currentUser?.email
    }))
  }

  return (
    isFetchingUserLocal || isFetchingStafLocal ? <BusyPage /> :
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Redirect exact from="/staf" to="/staf/platform" />
          <Route exact path="/staf/akun" component={AkunStaf} />
          <Route exact path="/staf/akun/edit" component={AkunEdit} />
          <Route exact path="/staf/platform" component={Platform} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="platform" href="/staf/platform">
          <IonIcon icon={hourglassOutline} />
          <IonLabel>Platform</IonLabel>
        </IonTabButton>
        <IonTabButton tab="akun" href="/staf/akun">
          <IonIcon icon={personOutline} />
          <IonLabel>Akun</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Staf