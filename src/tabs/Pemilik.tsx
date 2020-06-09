import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonPage, IonContent, IonGrid, IonRow, IonSpinner } from '@ionic/react'
import { businessOutline, personOutline } from 'ionicons/icons'
import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import AkunTab from './pemilik/AkunTab'
import GeraiTab from './pemilik/GeraiTab'
import Logout from '../pages/Logout'
import Axios from 'axios'
import { getToken, getCurrentUser } from '../config/firebaseConfig'
import apiSite from '../config/apiSite'
import queryString, { stringify } from 'query-string'
import { toast } from '../components/toast'
import { useSelector, useDispatch } from 'react-redux'
import Busy from '../pages/Busy'
import { setPemilikData, setGerais, setPemilikBelongings, setError, setPenggunaData } from '../redux/actions'
import PemilikRegisterPage from '../pages/PemilikRegisterPage'
import GeraiPage from '../pages/GeraiPage'
import AkunPemilik from '../pages/AkunPemilik'
import DaftarGeraiPage from '../pages/DaftarGeraiPage'
import EditKlasterPage from '../pages/EditKlasterPage'
import EditLayananPage from '../pages/EditLayananPage'
import TambahLayananPage from '../pages/TambahLayanan'
import TambahKlasterPage from '../pages/TambahKlaster'
import GeraiEditPage from '../pages/GeraiEditPage'

const Pemilik: React.FC = () => {
  //state
  const isRegistered = useSelector((state: any) => state.pemilik.isRegistered)
  const id_pemilik = useSelector((state: any) => state.pemilik.id_pemilik)
  //local
  const [gettingPemilik, setGettingPemilik] = useState(true)
  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state)

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
        setBusy(false)
        dispatch(setPemilikData({
          id: '',
          isRegistered: false
        }))
      }
      //setBusy(false)
    }).catch(error => {
      //setBusy(false)
      toast('terjadi kesalahan:' + error)
      console.log(error)
      dispatch(setError(error))
      //window.location.href = '/error'
    })
  }
  async function loadBelongings(id_pemilik: any) {
    //console.log("loadingbelonging")
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

  useEffect(() => {
    // console.log("busy",busy)
    // console.log("isreg",isRegistered)
    if (state.pengguna.uid === '') {
      hehe()
    }
  })

  async function hehe() {
    let currentUser = await getCurrentUser()
    //console.log("cur user: ", currentUser)
    dispatch(setPenggunaData(currentUser))
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
              <Switch>
                <Redirect exact from="/pemilik" to="/pemilik/gerai" />
                <Route path="/pemilik/register" component={PemilikRegisterPage} exact />
                <Route exact path="/pemilik/gerai" component={GeraiPage}></Route>
                <Route exact path="/pemilik/gerai/daftar" component={DaftarGeraiPage}></Route>
                <Route exact path="/pemilik/gerai/:id/klaster/:id" component={EditKlasterPage} />
                <Route exact path="/pemilik/gerai/:id/layanan/:id" component={EditLayananPage} />
                <Route exact path="/pemilik/gerai/:id" component={GeraiPage} />
                <Route exact path="/pemilik/gerai/:id/tambahLayanan" component={TambahLayananPage} />
                <Route exact path="/pemilik/gerai/:id/tambahKlaster" component={TambahKlasterPage} />
                <Route exact path="/pemilik/gerai/:id/edit" component={GeraiEditPage} />
                <Route exact path="/pemilik/akun" component={AkunPemilik} />
                <Route exact path="/pemilik/akun/gerai/daftar" component={DaftarGeraiPage}></Route>
                <Route exact path="/pemilik/akun/logout" component={Logout}></Route>
                <Route path="/logout" render={() => <Logout />} exact={true} />
              </Switch>
            </IonRouterOutlet>
            <IonTabBar slot="bottom" selectedTab="antrian">
              <IonTabButton tab="gerai" href="/pemilik/gerai">
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