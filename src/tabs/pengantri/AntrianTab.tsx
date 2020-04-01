import { IonPage, IonContent } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import React from "react"
import { useSelector } from "react-redux"
import { Route } from "react-router-dom"
import DefaultAntrianPage from "../../pages/AntrianPage"

const AntrianTab: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)

  //console.log('state: ', state)
  return (
    <IonPage>
      <IonReactRouter>
        <Route exact path="/pengantri/antrian" component={DefaultAntrianPage} />
      </IonReactRouter>
    </IonPage>
  )
}

export default AntrianTab