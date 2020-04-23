import { IonPage } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import React from "react"
import { useSelector } from "react-redux"
import { Route, Redirect, Switch } from "react-router-dom"
import GeraiPage from "../../pages/GeraiPage"
import DaftarGeraiPage from "../../pages/DaftarGeraiPage"
import GeraiDetailPemilik from "../../pages/GeraiDetailPemilik"
import TambahLayananPage from "../../pages/TambahLayanan"
import TambahKlasterPage from "../../pages/TambahKlaster"

const GeraiTab: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)

  //console.log('state: ', state)
  return (
    <IonPage>
      <IonReactRouter>
        <Switch>
          {/* <Redirect to="/pemilik/gerai/daftar" from="/" /> */}
          <Route exact path="/pemilik/gerai" component={GeraiPage}></Route>
          <Route exact path="/pemilik/gerai/daftar" component={DaftarGeraiPage}></Route>
          <Route exact path="/pemilik/gerai/:id" component={GeraiPage} />
          <Route exact path="/pemilik/gerai/:id/tambahLayanan" component={TambahLayananPage} />
          <Route exact path="/pemilik/gerai/:id/tambahKlaster" component={TambahKlasterPage} />
        </Switch>
      </IonReactRouter>
    </IonPage>
  )
}

export default GeraiTab