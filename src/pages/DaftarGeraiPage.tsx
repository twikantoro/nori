import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLoading, IonGrid, IonInput, IonRow, IonCol, IonButton } from "@ionic/react"
import { chevronForwardOutline, logoGoogle } from "ionicons/icons"
import $ from 'jquery'
import React, { useState } from "react"
import { connect, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const DefaultAntrianPage: React.FC = () => {
  const theState = useSelector((state: any) => state)
  const [nama,setNama] = useState('')
  //console.log(antrians)
  const shown = { display: 'block' }
  const hidden = { display: 'none' }



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
      <h1 className="ion-text-center">Daftar gerai</h1>
        
        <p className="ion-text-center"></p>
        
        <IonGrid>

          <IonList>
            <IonItem>
              <IonInput
                type="text"
                placeholder="Nama Gerai"
                onIonChange={(e: any) => setNama(e.target.value)}
              />
            </IonItem>
            
            
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton
                type="submit"
                expand="block"
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