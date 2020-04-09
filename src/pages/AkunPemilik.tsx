import React, { useState, useEffect } from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonRefresher, IonRefresherContent, IonList, IonListHeader, IonItem, IonBadge, IonSelect, IonSelectOption, IonButtons, IonButton, IonLoading, IonGrid, IonRow, IonCol, IonInput, IonSpinner } from "@ionic/react"
import CardAntrian from "../components/CardAntrian"
import { useSelector, connect } from "react-redux"
import $ from 'jquery'
import axios from 'axios'
import queryString from 'query-string'
import apiSite from "../config/apiSite"
import { getToken, logoutUser } from "../config/firebaseConfig"

const AkunPemilik: React.FC = () => {
  //initiallizing page
  const [gettingPemilik, setGettingPemilik] = useState(true)
  const [isRegistered, setIsRegistered] = useState(false)

  //others
  const [busy, setBusy] = useState(false)
  const role = useSelector((state: any) => state.role)
  const [activeSegment, setActiveSegment] = useState('berlangsung')

  const switchViewTo = (view: any) => {
    window.location.href = "/" + view
  }

  async function getPemilik() {
    var params = {
      token: await getToken()
    }
    axios.get(apiSite + "/pemilik/me?" + queryString.stringify(params)).then((response) => {
      setGettingPemilik(false)
      console.log(response)
      if(!response.data==false){
        setIsRegistered(true)
      }
    })
  }

  async function daftarAkunPemilik() {
    setBusy(true)
    var params = { token: await getToken() }
    axios.get(apiSite + "/pemilik/register?" + queryString.stringify(params)).then(response => {
      setBusy(false)
      console.log(response)
    })
  }

  useEffect(() => {
    if (gettingPemilik) getPemilik()
  })

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
            <IonButton onClick={()=>{
              logoutUser(function(response: any){
                if(response==true) {
                  window.location.href = "/"
                }
              })
            }}>Logout</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={busy} />
        <span>Status akun:
          {gettingPemilik ? <IonSpinner /> : 'hoho'}
        </span>
        
        {!isRegistered && !gettingPemilik ? <>
          <p>Anda belum tedaftar sebagai pemilik</p>
          <IonButton onClick={() => { daftarAkunPemilik() }}>Daftarkan akun pemilik</IonButton>
          </> : ''}
        
      </IonContent>
    </>
  )
}

export default connect()(AkunPemilik)