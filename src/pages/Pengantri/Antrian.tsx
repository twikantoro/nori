import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from "@ionic/react"
import React from "react"
import { useSelector } from "react-redux"
import CardAntrian from "../../components/Pengantri/CardAntrian"
import PengantriTabBar from "../../components/PengantriTabBar"
import firebase from 'firebase'
import { getToken } from "../../config/firebaseConfig"
import Axios from "axios"

const AntrianPage: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const antrians = useSelector((state: any) => state.antrians)
  const state = useSelector((state: any) => state)

  console.log('state: ', state)
  return (
    <IonPage>
      <CardAntrian />
    </IonPage>
  )
}

export default AntrianPage