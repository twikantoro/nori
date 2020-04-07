import React, { useState, useEffect } from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonRefresher, IonRefresherContent, IonList, IonFab, IonFabButton, IonIcon, IonListHeader, IonItem } from "@ionic/react"
import CardAntrian from "../components/CardAntrian"
import { useSelector, connect } from "react-redux"
import $ from 'jquery'
import { arrowForwardCircle, addCircle, add, chevronForwardOutline } from "ionicons/icons"

const DefaultAntrianPage: React.FC = () => {
  const curl = '/pemilik/gerai'
  const antrians = useSelector((state: any) => state.antrians)
  const theState = useSelector((state: any) => state)
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

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Gerai
          </IonTitle>
        </IonToolbar>
        </IonHeader>
      <IonContent>
      <IonList mode="md">
        <IonItem button routerLink={curl+"/daftar"}>
          <IonLabel>
            Daftarkan gerai baru
          </IonLabel>
          <IonIcon icon={chevronForwardOutline} />
        </IonItem>
      </IonList>
      </IonContent>
      </>
  )
}

export default connect()(DefaultAntrianPage)