import { IonPage } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import React from "react"
import { useSelector } from "react-redux"
import { Link, Route } from "react-router-dom"
import Logout from "../../pages/Logout"
import AkunPage from "../../pages/AkunPage"
import AkunPemilik from "../../pages/AkunPemilik"

const AkunTab: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)

  //console.log('state: ', state)
  return (
    <IonPage>
      <IonReactRouter>
        <Route exact path="/pemilik/akun" component={AkunPemilik} />
        <Route exact path="/pemilik/akun/logout" component={Logout}></Route>
      </IonReactRouter>
    </IonPage>
  )
}

export default AkunTab