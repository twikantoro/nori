import React, { useState, useEffect } from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonRefresher, IonRefresherContent, IonList, IonListHeader, IonItem, IonBadge, IonSelect, IonSelectOption, IonButtons, IonButton } from "@ionic/react"
import CardAntrian from "../components/CardAntrian"
import { useSelector, connect } from "react-redux"
import $ from 'jquery'
import { logoutUser } from "../config/firebaseConfig"

const DefaultAkunPage: React.FC = () => {
  const antrians = useSelector((state: any) => state.antrians)
  const theState = useSelector((state: any) => state)
  const role = useSelector((state: any) => state.role)
  const [activeSegment, setActiveSegment] = useState('berlangsung')
  //console.log(antrians)
  const shown = { display: 'block' }
  const hidden = { display: 'none' }

  const swithSegmentTo = (segment: any) => {
    setActiveSegment(segment)
    //console.log(activeSegment)
    $('.customSegments').hide()
    $('#segment-' + segment).show()
  }

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
        <IonButton onClick={() => {
          logoutUser(function (response: any) {
            if (response == true) {
              window.location.href = "/"
            }
          })
        }}>Logout</IonButton>
      </IonContent>
    </>
  )
}

export default connect()(DefaultAkunPage)