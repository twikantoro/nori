import { IonPage } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import React from "react"
import { useSelector } from "react-redux"
import { Switch, Route } from "react-router"
import CariPage from "../../pages/CariPage"

const AntrianTab: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)

  //console.log('state: ', state)
  return (
    <IonPage>
      <IonReactRouter>
        <Switch>
          <Route exact path="/pengantri/cari" component={CariPage} />
        </Switch>
      </IonReactRouter>
    </IonPage>
  )
}

export default AntrianTab