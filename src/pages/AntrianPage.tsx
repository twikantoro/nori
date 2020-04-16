import React, { useState, useEffect } from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonRefresher, IonRefresherContent, IonList } from "@ionic/react"
import CardAntrian from "../components/CardAntrian"
import { useSelector, connect } from "react-redux"
import $ from 'jquery'

const DefaultAntrianPage: React.FC = () => {
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
            Antrian
          </IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={activeSegment}
            onIonChange={(e) => swithSegmentTo(e.detail.value)}>
            <IonSegmentButton value="berlangsung">
              <IonLabel>Berlangsung</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="mendatang">
              <IonLabel>Mendatang</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <div id="segment-berlangsung" className="customSegments">
            {antrians.map(function (curr: any) {
              return curr.status !== 'dipesan' ? (
                <CardAntrian
                  key={curr.id}
                  gerai={curr.gerai}
                  subLayanan={curr.subLayanan}
                  prefix={curr.prefix}
                  slot={curr.slot}
                  current={curr.current}
                  tanggal="12 April 2020"
                  waktu={curr.perkiraan}
                  status={curr.status}
                />
              ) : ''
            })}
          </div>
          <div id="segment-mendatang" className="customSegments" style={hidden}>
            {antrians.map(function (curr: any) {
              return curr.status == 'dipesan' ? (
                <CardAntrian
                  key={curr.id}
                  gerai={curr.gerai}
                  subLayanan={curr.subLayanan}
                  prefix={curr.prefix}
                  slot={curr.slot}
                  current={curr.current}
                  tanggal="12 April 2020"
                  waktu={curr.perkiraan}
                  status={curr.status}
                />
              ) : ''
            })}
          </div>
        
      </IonContent>
    </>
  )
}

export default connect()(DefaultAntrianPage)