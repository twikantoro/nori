import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonPage, IonTab } from "@ionic/react"
import React from "react"
import { useSelector } from "react-redux"
import CardAntrian from "../../components/CardAntrian"
import PengantriTabBar from "../../components/PengantriTabBar"
import firebase from 'firebase'
import { getToken } from "../../config/firebaseConfig"
import Axios from "axios"
import { IonReactRouter } from "@ionic/react-router"
import { Route } from "react-router-dom"

const AntrianTab: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)

  //console.log('state: ', state)
  return (
    <IonPage>
      <IonReactRouter>
        not
      </IonReactRouter>
    </IonPage>
  )
}

export default AntrianTab