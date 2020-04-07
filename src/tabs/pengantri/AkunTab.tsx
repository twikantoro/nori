import { IonPage } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import React from "react"
import { useSelector } from "react-redux"
import { Link, Route } from "react-router-dom"
import Logout from "../../pages/Logout"
import AkunPage from "../../pages/AkunPage"

const AntrianTab: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)

  //console.log('state: ', state)
  return (
    <IonPage>
      <IonReactRouter>
        <Route exact path="/pengantri/akun" component={AkunPage} />
        <Route exact path="/pengantri/akun/logout" component={Logout}></Route>
      </IonReactRouter>
    </IonPage>
  )
}

export default AntrianTab