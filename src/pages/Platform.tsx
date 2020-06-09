import React, { useState, useEffect } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItemDivider, IonButton, IonVirtualScroll, IonInfiniteScroll, IonInfiniteScrollContent, IonRow, IonButtons, IonSelectOption, IonSelect, IonItem, IonLabel, IonCard, IonCardContent, IonCol, IonSpinner } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsFetchingGerai, fetchGeraiForStaf, bukaKLasterAsync, setIsFetching, pesananSelesai } from '../redux/actions'
import { getToken, db, getTanggalHariIni } from '../config/firebaseConfig'
import ReactLiveTime from 'react-live-time'
import TimeDisplay from '../components/TimeDisplay'

const Platform: React.FC = () => {
  const state = useSelector((state: any) => state)
  const employed = state.staf.id_gerai ? true : false
  const gerai = useSelector((state: any) => state.geraiForStaf)
  const dispatch = useDispatch()
  const isFetchingGeraiLocal = state.isFetchingGerai
  const [chosenKlaster, setChosenKlaster] = useState('')
  const [dbInitiated, setdbInitiated] = useState(false)
  const [listening, setListening] = useState(false)
  var currKlaster = { id: '' }
  const [initiated, setInitiated] = useState(false)
  const [currKlasterID, setCurrKlasterID] = useState('')
  const [jumlahAnt, setJumlahAnt] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const isFetchingLocal = state.isFetching
  const [currAntID, setCurrAntID] = useState('')
  const [currAntSlot, setCurrAntSlot] = useState('')
  const [currAntPrefix, setCurrAntPrefix] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (employed && !gerai.id && !isFetchingGeraiLocal) {
      //dispatch(setIsFetchingGerai(true))
      initFetch()
    }
    //if ready, run once 
    if (gerai.id && !initiated) {
      setInitiated(true)
      setChosenKlaster(gerai.klasters[0].id)
    }
    //detect change
    if (gerai.id && chosenKlaster !== currKlasterID) {
      //set currklaster
      gerai.klasters.forEach((klaster: any) => {
        if (klaster.id === chosenKlaster) {
          setCurrKlasterID(klaster.id)
        }
      })
      //reset listener
      listenerManager('stop')
      setdbInitiated(false)
    }
    //firestore listener
    if (!dbInitiated && currKlasterID) {
      setdbInitiated(true)
      listenerManager('start')
    }
  })

  function listenerManager(method: any) {
    console.log("curparam", currKlasterID, getTanggalHariIni().toString())
    let unsubscribe = db.collection('pesanan')
      .where('id_klaster', '==', currKlasterID)
      .where('tanggal', '==', getTanggalHariIni().toString())
      .onSnapshot(snapshot => {
        setLoading(true)
        setListening(true)
        console.log("listener initiated")
        var jml = 0
        var smallest = 0
        snapshot.forEach(doc => {
          //get current pesanan
          if (!doc.data().status || doc.data().status == 3) {
            
            if (jml !> 0) {
              console.log("ant", doc.data())
              smallest = parseInt(doc.data().slot)
            } else {
              if (smallest > doc.data().slot) {
                smallest = parseInt(doc.data().slot)
              }
            }
          }
          //setjumlah
          if (doc.data().slot != 0) {
            jml++
          } else {
            setIsOpen(true)
          }
        })
        console.log("smallest", smallest)
        //still getting current antrian
        let found = false
        snapshot.forEach(doc => {
          if (doc.data().slot == smallest && smallest != 0) {
            found = true
            changeCurrAnt({ ...doc.data(), id: doc.id })
          }
        })
        if (!found) {
          setCurrAntSlot('0')
        }
        //turnof loading
        setLoading(false)
        //jml antrian
        setJumlahAnt(jml)
      })
    if (method === 'stop') {
      unsubscribe()
    }
  }

  function changeCurrAnt(data: any) {
    setCurrAntID(data.id)
    setCurrAntPrefix(data.prefix)
    setCurrAntSlot(data.slot)
    setLoading(false)
  }

  async function initFetch() {
    var params = {
      token: await getToken(),
      id_gerai: state.staf.id_gerai
    }
    dispatch(fetchGeraiForStaf(params))
  }

  async function bukaKlaster() {
    var params = {
      token: await getToken(),
      id_klaster: currKlasterID,
      tanggal: getTanggalHariIni()
    }
    dispatch(setIsFetching(true))
    dispatch(bukaKLasterAsync(params))
  }

  async function selesai() {
    setLoading(true)
    dispatch(pesananSelesai({ id_pesanan: currAntID, token: await getToken() }))
  }

  async function tidakHadir() {
    setLoading(true)
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Platform (live)</IonTitle>
          {!gerai.id ? '' :
            <IonButtons slot="end" className="ion-padding-end">
              <IonSelect interface="popover" value={gerai.klasters[0].id}>
                {gerai.klasters.map((klaster: any) => {
                  return (
                    <IonSelectOption key={klaster.id} value={klaster.id}>{klaster.nama}</IonSelectOption>
                  )
                })}
              </IonSelect>
            </IonButtons>
          }
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItemDivider mode="ios">Dashboard</IonItemDivider>
        <IonItem lines="none">
          <b>Waktu</b>
          <p slot="end"><TimeDisplay /></p>
        </IonItem>
        <IonItem lines="none">
          <b>Antrian hari ini</b>
          <p slot="end">{jumlahAnt}</p>
        </IonItem>
        <IonItemDivider mode="ios">Layani</IonItemDivider>
        {!listening ? '' : !isOpen ?
          <div className="ion-padding custom-width-100 ion-justify-content-center ion-text-center">
            Klaster ini belum buka <br /><br />
            <IonButton disabled={isFetchingLocal} onClick={() => bukaKlaster()}>Buka</IonButton>
          </div> : loading ? <IonSpinner className="ion-margin" /> : currAntSlot == '0' ?
            <div className="ion-padding custom-width-100 ion-justify-content-center ion-text-center">
              Sementara tidak ada antrian menunggu. Yay!
            </div> :
            <IonCard>
              <IonCardContent>
                <IonItem lines="none"><IonLabel><h3>No. Urut</h3></IonLabel><b slot="end">{currAntPrefix + '-' + currAntSlot}</b></IonItem>
                <IonItemDivider className="custom-divider" />
                <IonRow>
                  <IonCol>
                    <IonButton onClick={() => tidakHadir()} expand="block" fill="outline">Tidak Hadir</IonButton></IonCol>
                  <IonCol>
                    <IonButton onClick={() => selesai()} expand="block">Selesai</IonButton></IonCol></IonRow>
              </IonCardContent>
            </IonCard>
        }
      </IonContent>
    </>
  )
}

export default Platform