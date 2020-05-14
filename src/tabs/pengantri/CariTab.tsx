import { IonPage, IonButton, IonLoading } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Switch, Route, Redirect } from "react-router"
import CariPage from "../../pages/CariPage"
import GeraiView from "../../pages/GeraiView"
import LayananView from "../../pages/LayananView"
import { setTabRefresh } from "../../redux/actions"
import $ from 'jquery'

const AntrianTab: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)
  const tabRefresh = state.tabRefresh
  const dispatch = useDispatch()
  const [busy, setBusy] = useState(false)
  //console.log('state: ', state)

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
  })

  return (
    <IonPage>
      <IonReactRouter>
        <Switch>
          {/* <Redirect exact from="/pengantri/cari" to="/pengantri/cari/geraibaru" /> */}
          <Route exact path="/pengantri/cari" component={CariPage} />
          <Route exact path="/pengantri/cari/:id" component={GeraiView} />
          <Route exact path="/pengantri/cari/:id/:id" component={LayananView} />
        </Switch>
      </IonReactRouter>
      <IonButton className="ion-hide" id="btn-cari-refresh" routerLink="/pengantri/cari"></IonButton>
      <IonLoading isOpen={busy} />
    </IonPage>
  )
}

export default AntrianTab