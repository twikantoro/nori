import React, { useState, useEffect } from 'react'
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSpinner, IonItem, IonLabel, IonItemDivider, IonSelect, IonSelectOption, IonRow, IonCol, IonButton } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { setTabRefresh, getLayananData, setIsFetching } from '../redux/actions'
import $ from 'jquery'
import { getDateDisplay, db } from '../config/firebaseConfig'

const LayananView: React.FC = () => {
  let URLarray = window.location.href.split("/")
  const kodeGerai = URLarray[5]
  const kodeLayanan = URLarray[6]
  const state = useSelector((state: any) => state)
  const tabRefresh = state.tabRefresh
  const dispatch = useDispatch()
  const calonSlot = state.calonSlot
  const isFetchingLocal = state.isFetching
  const hariIni = getHariIni()
  const [pleaseHariArr, setPleaseHariArr] = useState(new Array(0))
  const [chosenTanggal, setChosenTanggal] = useState('')
  const [hariKode, setHariKode] = useState(0)

  function getHariIni() {
    var date = new Date()
    var returned = date.getDay() - 1
    return returned >= 0 ? returned : returned + 7
  }

  const [busy, setBusy] = useState(false)

  let currLayanan = typeof state.layanans[kodeGerai + "-" + kodeLayanan] === 'undefined' ? {} : state.layanans[kodeGerai + "-" + kodeLayanan]

  const [jadwalCurrHari, setJadwalCurrHari] = useState('')
  let harisForSelect = new Array(0)
  const [initiated, setInitiated] = useState(false)
  const [slot, setSlot] = useState(0)
  const [slotLimit, setSlotLimit] = useState(0)

  useEffect(() => {
    if (typeof state.layanans[kodeGerai + "-" + kodeLayanan] === 'undefined' && !isFetchingLocal) {
      var payload = {
        geraiKode: kodeGerai,
        layananKode: kodeLayanan
      }
      setBusy(true)
      dispatch(getLayananData(payload))
      dispatch(setIsFetching(true))
    } else {
      setBusy(false)
      console.log("layannas: ", state.layanans)
    }
    //if ready and not has been initiated
    if (typeof state.layanans[kodeGerai + "-" + kodeLayanan] !== 'undefined' && !initiated) {
      setInitiated(true)
      let jadwalWeek = JSON.parse(currLayanan.klaster.jadwal)
      setJadwalCurrHari(jadwalWeek[hariIni])
      //setting chosen tanggal for the first time
      setChosenTanggal(currLayanan.forSelect[0].tanggal)
    }
    //if ready
    if (typeof state.layanans[kodeGerai + "-" + kodeLayanan] !== 'undefined') {
      //listen to hariKode and change jadwalCurrHari
      let jadwalWeek = JSON.parse(currLayanan.klaster.jadwal)
      let hariIndex = 0
      currLayanan.forSelect.forEach((obj: any, index: any) => {
        if (obj.tanggal === chosenTanggal) {
          hariIndex = index
        }
      })
      let hariIndexTranslated = (hariIni + hariIndex) % 7
      setJadwalCurrHari(jadwalWeek[hariIndexTranslated])
      //set slot limit

      //firestore
      db.collection('pesanan').where('tanggal', '==', chosenTanggal).onSnapshot(response => {
        if (response.empty) setSlot(1)
        var biggest = 0
        response.forEach(doc => {
          var temp = parseInt(doc.data().slot)
          biggest = biggest < temp ? temp : biggest
        })
        if (true) setSlot(biggest + 1)
      })
    }
  })

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={"/pengantri/cari/" + kodeGerai}></IonBackButton>
          </IonButtons>
          <IonTitle>{kodeLayanan}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isFetchingLocal ? <div className="ion-padding"><IonSpinner /></div> :
          <>
            <IonItemDivider mode="ios">Detail</IonItemDivider>
            <div className="ion-padding-horizontal">
              <p><b>Deskripsi</b><br />{typeof currLayanan === 'undefined' ? '' : currLayanan.deskripsi}</p>
              <p><b>Syarat</b><br />{typeof currLayanan === 'undefined' ? '' : currLayanan.syarat}</p>
            </div>
            {typeof currLayanan.forSelect === 'undefined' ? "" :
              <>
                <IonItemDivider mode="ios">Waktu operasional</IonItemDivider>
                <IonItem lines="none">
                  <IonLabel><b>Waktu</b></IonLabel>
                  <p slot="end">{jadwalCurrHari !== '' ? jadwalCurrHari : "libur"}</p>
                </IonItem>
                <IonItemDivider mode="ios">Pesan untuk</IonItemDivider>
                <IonItem className="ion-no-margin" lines="none">
                  <IonLabel><b>Hari</b></IonLabel>

                  <IonSelect value={chosenTanggal} onIonChange={(e) => {
                    setChosenTanggal(e.detail.value)
                  }}>
                    {currLayanan.forSelect.map((obj: any, index: any) => {
                      return (
                        <IonSelectOption key={obj.tanggal} value={obj.tanggal}
                          onClick={() => setHariKode((hariIni + index) % 7)}
                        >{obj.display}</IonSelectOption>
                      )
                    })}
                  </IonSelect>
                </IonItem>
                <div className="ion-padding">
                  <IonButton expand="block">Pesan slot (
                {currLayanan.klaster.prefix + slot}
                )</IonButton>
                </div>
              </>
            }
          </>
        }
        <IonButton className="ion-hide" id="btn-cari-refresh" routerLink="/pengantri/cari"></IonButton>
      </IonContent>
    </>
  )
}

export default LayananView