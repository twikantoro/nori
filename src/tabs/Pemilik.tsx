import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonPage, IonContent, IonGrid, IonRow, IonSpinner } from '@ionic/react'
import { businessOutline, personOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AkunTab from './pemilik/AkunTab'
import GeraiTab from './pemilik/GeraiTab'
import Logout from '../pages/Logout'
import Axios from 'axios'
import { getToken } from '../config/firebaseConfig'
import apiSite from '../config/apiSite'
import queryString, { stringify } from 'query-string'
import { toast } from '../components/toast'
import { useSelector, useDispatch } from 'react-redux'
import Busy from '../pages/Busy'
import { setPemilikData, setGerais, setPemilikBelongings, setError } from '../redux/actions'
import PemilikRegisterPage from '../pages/PemilikRegisterPage'

const Pemilik: React.FC = () => {
  //state
  const isRegistered = useSelector((state: any) => state.pemilik.isRegistered)
  const id_pemilik = useSelector((state: any) => state.pemilik.id_pemilik)
  //local
  const [gettingPemilik, setGettingPemilik] = useState(true)
  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()

  async function getPemilik() {
    setBusy(true)
    var params = {
      token: await getToken()
    }
    Axios.get(apiSite + "/pemilik/me?" + queryString.stringify(params)).then(response => {
      if (response.data !== false) {
        dispatch(setPemilikData({
          id: response.data,
          isRegistered: true
        }))
        var paramsNew = {
          token: params.token,
          id_pemilik: response.data
        }
        loadBelongings(response.data)
      } else {
        //setBusy(false)
        dispatch(setPemilikData({
          id: null,
          isRegistered: false
        }))
      }
      setBusy(false)
    }).catch(error => {
      setBusy(false)
      toast('terjadi kesalahan:'+error)
      console.log(error)
      dispatch(setError(error))
      //window.location.href = '/error'
    })
  }
  async function loadBelongings(id_pemilik: any) {
    setBusy(true)
    var params = {
      token: await getToken(),
      id_pemilik: id_pemilik
    }
    console.log("params", params)
    Axios.get(apiSite + "/pemilik/getAllBelongings?" + stringify(params)).then(response => {
      //handle all belongings
      dispatch(setPemilikBelongings(response.data))
    }).catch(e => {
      toast("Terjadi kesalahan")
    }).then(() => {
      setBusy(false)
    })
  }

  if (gettingPemilik) { getPemilik(); setGettingPemilik(false) }

  return busy ? (
    <Busy />
  ) : (
      !isRegistered ? (
        <PemilikRegisterPage />
      ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact from="/pemilik" to="/pemilik/gerai" />
              <Route path="/pemilik/register" component={PemilikRegisterPage} exact />
              <Route path="/pemilik/gerai" render={() => <GeraiTab />} exact={true} />
              <Route path="/pemilik/akun" render={() => <AkunTab />} exact={true} />
              <Route path="/logout" render={() => <Logout />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" selectedTab="antrian">
              <IonTabButton tab="gerai" href="/pemilik/gerai" selected>
                <IonIcon icon={businessOutline} />
                <IonLabel>Gerai</IonLabel>
              </IonTabButton>
              <IonTabButton tab="akun" href="/pemilik/akun">
                <IonIcon icon={personOutline} />
                <IonLabel>Akun</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )
    )
}

export default Pemilik