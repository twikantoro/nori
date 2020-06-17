import React, { useState, useEffect } from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonRefresher, IonRefresherContent, IonList, IonPage, IonSpinner } from "@ionic/react"
import CardAntrian from "../components/CardAntrian"
import { useSelector, connect, useDispatch } from "react-redux"
import $ from 'jquery'
import { db, getTanggalHariIni } from "../config/firebaseConfig"
import { setPesanans, setIsFetching, addKlasterIsComplete } from "../redux/actions"
import arraySort from 'array-sort'

const DefaultAntrianPage: React.FC = () => {
  const antrians = useSelector((state: any) => state.pesanans)
  const state = useSelector((state: any) => state)
  const [activeSegment, setActiveSegment] = useState('berlangsung')
  //console.log(antrians)
  const shown = { display: 'block' }
  const hidden = { display: 'none' }
  const tanggalHariIni = getTanggalHariIni()
  const dispatch = useDispatch()
  const pesanansLocal = state.pesanans
  const [listening, setListening] = useState(false)
  const [berlangsungZero, setBerlangsungZero] = useState(true)
  const [mendatangZero, setMendatangZero] = useState(true)
  const [dbInitiated, setdbInitiated] = useState(false)

  const swithSegmentTo = (segment: any) => {
    setActiveSegment(segment)
    //console.log(activeSegment)
    $('.customSegments').hide()
    $('#segment-' + segment).show()
  }

  useEffect(() => {
    //firestore listener
    if (!dbInitiated) {
      setdbInitiated(true)
      //console.log("id", state.pengantri.id)
      listenerManager('start')
    }
    //console.log("pesatte", state.pesanans)
  })

  function listenerManager(method: any) {
    let unsubscribe = db.collection('pesanan').where('id_pengantri', '==', state.pengantri.id).onSnapshot(snapshot => {
      setListening(true)
      //if (snapshot.empty) { console.log("empty") }
      setBerlangsungZero(true)
      setMendatangZero(true)
      var pesanans = new Array(0)
      snapshot.forEach(doc => {
        if (parseInt(doc.data().tanggal) >= tanggalHariIni) {
          var pesanan = doc.data()
          pesanan.id = doc.id
          pesanans = pesanans.concat(pesanan)
          //console.log("found", doc.data())
          //decide if zero or not
          if (pesanan.tanggal == tanggalHariIni) {
            setBerlangsungZero(false)
          } else {
            setMendatangZero(false)
          }
        }
      })
      //console.log("pes", pesanans)
      //sortir pesanan
      pesanans = arraySort(pesanans, 'status')
      dispatch(setPesanans(pesanans))

    })
    if (method === 'stop') {
      unsubscribe()
    }
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
              <IonLabel>Hari ini</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="mendatang">
              <IonLabel>Mendatang</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(r) => { listenerManager('stop'); listenerManager('start'); setTimeout(() => r.detail.complete(), 1) }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {!listening ? <div className="ion-padding"><IonSpinner /></div> :
          <>
            <div id="segment-berlangsung" className="customSegments">
              {berlangsungZero ? <div className="ion-padding">Anda tidak memiliki reservasi untuk hari ini</div>
                : antrians.map(function (curr: any) {
                  return getTanggalHariIni() == curr.tanggal ? (
                    <CardAntrian
                      key={curr.id}
                      props={curr}
                    />
                  ) : ''
                })}
            </div>
            <div id="segment-mendatang" className="customSegments" style={hidden}>
              {mendatangZero ? <div className="ion-padding">Anda tidak memiliki reservasi mendatang</div>
                : antrians.map(function (curr: any) {
                  return getTanggalHariIni() != curr.tanggal ? (
                    <CardAntrian
                      key={curr.id}
                      props={curr}
                    />
                  ) : ''
                })}
            </div>
          </>
        }
      <div className="custom-filler"></div></IonContent>
    </>
  )
}

export default connect()(DefaultAntrianPage)