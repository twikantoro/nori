import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLoading, IonGrid, IonInput, IonRow, IonCol, IonButton } from "@ionic/react"
import { chevronForwardOutline, logoGoogle } from "ionicons/icons"
import $ from 'jquery'
import React, { useState } from "react"
import { connect, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import apiSite from "../config/apiSite"
import { getToken } from "../config/firebaseConfig"
import queryString from "query-string"

const DefaultAntrianPage: React.FC = () => {
  const theState = useSelector((state: any) => state)
  const [nama, setNama] = useState('')
  //console.log(antrians)
  const shown = { display: 'block' }
  const hidden = { display: 'none' }

  async function submitGerai () {
    const params = {
      token: await getToken(),
      nama: nama
    }
    axios.get(apiSite+"/gerais/create?"+queryString.stringify(params))
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/pemilik/gerai"></IonBackButton>
            <IonTitle>
              Daftar Gerai
          </IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonGrid>

          <IonList>
            <IonItem>
              <IonInput
                type="text"
                placeholder="Nama Gerai"
                onIonChange={(e: any) => setNama(e.target.value)}
              />
            </IonItem>
            <iframe
              src="https://www.google.com/maps/embed/v1/search?key=AIzaSyB5Z9FXmzH-_Z15QDYNg6boA28ak3tRbPE&q=record+stores+in+Seattle">
            </iframe>
            
          </IonList>

          <IonRow>
              <IonCol>
                <IonButton
                  type="submit"
                  expand="block"
                  onClick={submitGerai}
                >Daftarkan
              </IonButton>
              </IonCol>
            </IonRow>
        </IonGrid>
      </IonContent>
      </>
  )
}

export default connect()(DefaultAntrianPage)