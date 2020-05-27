import { IonPage, IonButton, IonLoading } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Switch, Route, Redirect } from "react-router"
import CariPage from "../../pages/CariPage"
import GeraiView from "../../pages/GeraiView"
import LayananView from "../../pages/LayananView"
import { setTabRefresh, setSacredPath } from "../../redux/actions"
import $ from 'jquery'
import OrderView from "../../pages/OrderView"

const AntrianTab: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)
  const tabRefresh = state.tabRefresh
  const dispatch = useDispatch()
  const [busy, setBusy] = useState(false)
  const sacredPath = getPath()
  //console.log('state: ', state)

  function getPath() {
    var arr = window.location.href.split("/")
    arr.shift()
    arr.shift()
    arr.shift()
    // arr.shift()
    // arr.shift()
    return arr.join("/")
  }

  useEffect(() => {
    //console.log("tabRefresh:"+tabRefresh)
    if (tabRefresh === 'reservasi') {
      setBusy(true)
      //console.log("tryna refresh")
      $('#btn-cari-refresh').click()
      dispatch(setTabRefresh(''))
    } else {
      setBusy(false)
    }
    //updates last path in every tab
    let tab = window.location.href.split("/")[4]
    updateSacredPath(tab)
  })

  function updateSacredPath(tab: any) {
    if (state.sacredPath[tab] !== sacredPath) {
      dispatch(setSacredPath({
        tab: tab,
        path: sacredPath
      }))
      console.log("sacredpath: ", state.sacredPath)
    }
  }

  return (
    <IonPage>
      <IonReactRouter>
        <Switch>
          {/* <Redirect exact from="/pengantri/cari" to="/pengantri/cari/geraibaru" /> */}
          <Route exact path="/pengantri/cari" component={CariPage} />
          <Route exact path="/pengantri/cari/:id" component={GeraiView} />
          <Route exact path="/pengantri/cari/:id/:id" component={LayananView} />
          <Route exact path="/pengantri/cari/:id/:id/order" component={OrderView} />
        </Switch>
      </IonReactRouter>
      <IonButton className="ion-hide" id="btn-cari-refresh" routerLink="/pengantri/cari"></IonButton>
      <IonLoading isOpen={busy} />
    </IonPage>
  )
}

export default AntrianTab