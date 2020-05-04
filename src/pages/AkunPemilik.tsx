import React, { useState, useEffect } from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonRefresher, IonRefresherContent, IonList, IonListHeader, IonItem, IonBadge, IonSelect, IonSelectOption, IonButtons, IonButton, IonLoading, IonGrid, IonRow, IonCol, IonInput, IonSpinner, IonItemDivider, IonIcon } from "@ionic/react"
import CardAntrian from "../components/CardAntrian"
import { useSelector, connect } from "react-redux"
import $ from 'jquery'
import axios from 'axios'
import queryString from 'query-string'
import apiSite from "../config/apiSite"
import { getToken, logoutUser } from "../config/firebaseConfig"
import { logOutOutline, trashOutline, addCircleOutline } from "ionicons/icons"

const AkunPemilik: React.FC = () => {
  //others
  const [busy, setBusy] = useState(false)
  const role = useSelector((state: any) => state.role)
  const [activeSegment, setActiveSegment] = useState('berlangsung')

  const switchViewTo = (view: any) => {
    window.location.href = "/" + view
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonSelect interface="popover" value={role} onIonChange={(e: any) => switchViewTo(e.target.value)}>
              <IonSelectOption value="pengantri">Pengantri</IonSelectOption>
              <IonSelectOption value="pemilik">Pemilik</IonSelectOption>
              <IonSelectOption value="staf">Staf</IonSelectOption>
            </IonSelect>

          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={busy} />
        <IonItemDivider mode="ios">Gerai</IonItemDivider>
        <IonItem routerLink="/pemilik/gerai/daftar" mode="md">
          <IonIcon icon={addCircleOutline}/>&nbsp;
          <IonLabel>
            <h3>Buat gerai baru</h3>
          </IonLabel>
        </IonItem>
        <IonItemDivider mode="ios">Logout</IonItemDivider>
        <IonItem onClick={() => {
          logoutUser(function (response: any) {
            if (response === true) {
              window.location.href = "/"
            }
          })
        }}>
          <IonIcon icon={logOutOutline} />&nbsp;
          <IonLabel>
            <h3>Logout</h3>
          </IonLabel>
        </IonItem>
      </IonContent>
    </>
  )
}

export default connect()(AkunPemilik)