import React, { useState, useEffect } from 'react'
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSpinner, IonItem, IonLabel, IonItemDivider, IonSelect, IonSelectOption, IonRow, IonCol, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { setTabRefresh, getLayananData, setIsFetching, sedangPesan, pesanAsync } from '../redux/actions'
import $ from 'jquery'
import { getDateDisplay, db, getPerkiraan, getToken } from '../config/firebaseConfig'

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
  const [sayaDahPesan, setSayaDahPesan] = useState(false)
  const [listening, setListening] = useState(false)

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
  const [perkiraan, setPerkiraan] = useState('')
  const sedangPesanLocal = state.sedangPesan

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
      //console.log("layannas: ", state.layanans)
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
        setListening(true)
        if (response.empty) setSlot(1)
        var biggest = 0
        response.forEach(doc => {
          var temp = parseInt(doc.data().slot)
          biggest = biggest < temp ? temp : biggest
        })
        if (true) setSlot(biggest + 1)
        //apakah saya termasuk pemesan2 tersebut?
        response.forEach(doc => {
          if (doc.data().id_pengantri === state.pengantri.id) {
            setSayaDahPesan(true)
          }
        })
      })
      //set waktu perkiraan
      let params = {
        slot: slot,
        hari: hariKode,
        jadwal: jadwalWeek,
        durasi: currLayanan.klaster.durasi
      }
      setPerkiraan(getPerkiraan(params))

    }
  })

  async function pesanSlot() {
    let params = {
      token: await getToken(),
      id_pengantri: state.pengantri.id,
      id_klaster: currLayanan.klaster.id,
      id_layanan: currLayanan.id,
      tanggal: chosenTanggal,
      prefix: currLayanan.klaster.prefix,
      slot: slot
    }
    dispatch(sedangPesan(true))
    dispatch(pesanAsync(params))
  }

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
                <IonItemDivider mode="ios">Pesan</IonItemDivider>
                <IonItem className="ion-no-margin" lines="none">
                  <IonLabel><b>Hari</b></IonLabel>

                  <IonSelect value={chosenTanggal} onIonChange={(e) => {
                    setChosenTanggal(e.detail.value)
                    setListening(false)
                    setSayaDahPesan(false)
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
                {listening ?
                  sayaDahPesan ? <div className="ion-padding-horizontal">
                    < p > Anda sudah pesan layanan ini di hari tersebut. Untuk melihatnya, silahkan cek di Tab Antrian</p>
                  </div> :
                    <IonCard>
                      <IonCardContent>
                        <IonItem lines="none">
                          <IonLabel><b>Slot</b></IonLabel>
                          <b slot="end">{currLayanan.klaster.prefix + slot}</b>
                        </IonItem>
                        <IonItem lines="none">
                          <IonLabel><p>Jam operasional</p></IonLabel>
                          <p slot="end">{jadwalCurrHari !== '' ? jadwalCurrHari : "libur"}</p>
                        </IonItem>
                        <IonItem className="ion-no-margin" lines="none">
                          <IonLabel><p>Perkiraan dipanggil</p></IonLabel>
                          <p slot="end">{perkiraan}</p>
                        </IonItem>
                        <div className="ion-padding">
                          <IonButton expand="block" disabled={sedangPesanLocal}
                            onClick={() => pesanSlot()}
                          >Pesan slot</IonButton>
                        </div>
                      </IonCardContent>
                    </IonCard> : <IonSpinner />}
              </>
            }
          </>
        }
        <IonButton className="ion-hide" id="btn-cari-refresh" routerLink="/pengantri/cari"></IonButton>
      </IonContent >
    </>
  )
}

export default LayananView