import { IonPage } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import React from "react"
import { useSelector } from "react-redux"
import { Route } from "react-router-dom"
import NotifikasiDefaultPage from "../../pages/NotifikasiPage"

const NotifikasiTab: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)

  //console.log('state: ', state)
  return (
    <IonPage>
      <IonReactRouter>
        <Route exact path="/pengantri/notifikasi" component={NotifikasiDefaultPage} />
      </IonReactRouter>
    </IonPage>
  )
}

export default NotifikasiTab
