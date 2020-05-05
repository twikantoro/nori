import { IonPage } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import React from "react"
import { useSelector } from "react-redux"
import { Route, Switch } from "react-router-dom"
import DaftarGeraiPage from "../../pages/DaftarGeraiPage"
import EditKlasterPage from "../../pages/EditKlasterPage"
import GeraiEditPage from "../../pages/GeraiEditPage"
import GeraiPage from "../../pages/GeraiPage"
import TambahKlasterPage from "../../pages/TambahKlaster"
import TambahLayananPage from "../../pages/TambahLayanan"
import EditLayananPage from "../../pages/EditLayananPage"

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
          <Route exact path="/pemilik/gerai/:id/klaster/:id" component={EditKlasterPage} />
          <Route exact path="/pemilik/gerai/:id/layanan/:id" component={EditLayananPage} />
          <Route exact path="/pemilik/gerai/:id" component={GeraiPage} />
          <Route exact path="/pemilik/gerai/:id/tambahLayanan" component={TambahLayananPage} />
          <Route exact path="/pemilik/gerai/:id/tambahKlaster" component={TambahKlasterPage} />
          <Route exact path="/pemilik/gerai/:id/edit" component={GeraiEditPage} />
        </Switch>
      </IonReactRouter>
    </IonPage>
  )
}

export default GeraiTab
