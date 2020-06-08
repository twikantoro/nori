import React, { useState, useEffect } from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonRefresher, IonRefresherContent, IonList, IonPage, IonSpinner } from "@ionic/react"
import CardAntrian from "../components/CardAntrian"
import { useSelector, connect, useDispatch } from "react-redux"
import $ from 'jquery'
import { db, getTanggalHariIni } from "../config/firebaseConfig"
import { setPesanans } from "../redux/actions"

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
    //firestore, listen to all my antrian
    // db.collection('pesanan').where('id_pengantri', '==', state.pengantri.id).onSnapshot(response => {
    //   //run once
    //   if (!dbInitiated) {
    //     setdbInitiated(true)
    //     let pesanans = new Array(0)
    //     response.forEach(doc => {
    //       let pesanan = doc.data()
    //       pesanan.id = doc.id
    //       if (pesanan.tanggal < tanggalHariIni) {

    //       } else {
    //         pesanans = pesanans.concat(pesanan)
    //         setBerlangsungZero(true)
    //         if (pesanan.tanggal == tanggalHariIni) {
    //           setBerlangsungZero(false)
    //         }
    //         setMendatangZero(true)
    //         if (pesanan.tanggal > tanggalHariIni) {
    //           setMendatangZero(false)
    //         }
    //       }
    //     })
    //     dispatch(setPesanans(pesanans))
    //     setListening(true)
    //     console.log("once", state.pesanans)
    //   }
    //   //listening
    //   response.docChanges().forEach(change => {
    //     if (change.type === 'added') {
    //       var newPesanan = change.doc.data()
    //       newPesanan.id = change.doc.id
    //       dispatch(setPesanans(state.pesanans.concat(newPesanan)))
    //     }
    //     if (change.type === 'removed') {
    //       var deletedPesanan = { ...change.doc.data(), id: change.doc.id }
    //       var newPesanans = new Array(0)
    //       state.pesanans.forEach((pes: any) => {
    //         if (pes.id !== deletedPesanan.id) {
    //           newPesanans = newPesanans.concat(pes)
    //         }
    //       })
    //       dispatch(setPesanans(newPesanans))
    //     }
    //     console.log("change", state.pesanans)
    //   })
    // })
  })

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
      </IonContent>
    </>
  )
}

export default connect()(DefaultAntrianPage)