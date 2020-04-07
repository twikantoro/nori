import { IonPage } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import React from "react"
import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import GeraiPage from "../../pages/GeraiPage"
import DaftarGeraiPage from "../../pages/DaftarGeraiPage"

const GeraiTab: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)

  //console.log('state: ', state)
  return (
    <IonPage>
      <IonReactRouter>
        <Redirect to="/pemilik/gerai/daftar" from="/" />
        <Route exact path="/pemilik/gerai" component={GeraiPage}></Route>
        <Route exact path="/pemilik/gerai/daftar" component={DaftarGeraiPage}></Route>
      </IonReactRouter>
    </IonPage>
  )
}

export default GeraiTab