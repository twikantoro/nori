import React, { useState, useEffect } from 'react'
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSpinner, IonItem, IonLabel, IonItemDivider, IonSelect, IonSelectOption, IonRow, IonCol, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonAlert, IonRefresher, IonRefresherContent } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { setTabRefresh, getLayananData, setIsFetching, sedangPesan, pesanAsync, setIsDeleting, batalPesanAsync, clearBan } from '../redux/actions'
import $ from 'jquery'
import { getDateDisplay, db, getPerkiraan, getToken, getHariKode, getTanggalHariIni, getTanggalDisplay } from '../config/firebaseConfig'

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
  const [chosenTanggal, setChosenTanggal] = useState('')
  const [hariKode, setHariKode] = useState(1)
  const [sayaDahPesan, setSayaDahPesan] = useState(false)
  const [listening, setListening] = useState(false)

  function getHariIni() {
    var date = new Date()
    date.setHours(date.getHours()+7)
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
  const [showAlert, setShowAlert] = useState(false)
  const isDeletingLocal = state.isDeleting
  const [dbInitiated, setdbInitiated] = useState(false)

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
      //setChosenTanggal(currLayanan.forSelect[0].tanggal)
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

      //firestore listener
      if (!dbInitiated) {
        setdbInitiated(true)
        listenerManager('start', chosenTanggal === '' ? getTanggalHariIni() : chosenTanggal)
      }

      //set waktu perkiraan
      let params = {
        slot: slot,
        hari: hariKode,
        jadwal: jadwalWeek,
        durasi: currLayanan.klaster.durasi
      }
      setPerkiraan(getPerkiraan(params))
      //test debug
      //console.log("tgl",chosenTanggal)

      //detect if ban has expired
      if (parseInt(state.pengantri.banned) <= getTanggalHariIni() && !isFetchingLocal) {
        dispatch(setIsFetching(true))
        dispatch(clearBan({ id_pengantri: state.pengantri.id }))
      }

    }
    //detect url to tanggal
    if (typeof window.location.href.split('/')[7] !== 'undefined' && chosenTanggal == '') {
      let tanggal = window.location.href.split('/')[7]
      setChosenTanggal(tanggal)

    }
  })

  function manageBiggest(snapshot: any) {
    if (snapshot.empty) setSlot(1)
    var biggest = 0
    snapshot.forEach((doc: any) => {
      var temp = parseInt(doc.data().slot)
      biggest = biggest < temp ? temp : biggest
    })
    if (true) setSlot(biggest + 1)
  }

  async function pesanSlot() {
    //debug tanggal kosong
    if (!chosenTanggal) {
      setChosenTanggal(!chosenTanggal ?
        window.location.href.split("/")[7] ?
          window.location.href.split("/")[7] : currLayanan.forSelect[0].tanggal
        : chosenTanggal)
    }
    //
    let params = {
      token: await getToken(),
      id_pengantri: state.pengantri.id,
      id_klaster: currLayanan.klaster.id,
      id_layanan: currLayanan.id,
      tanggal: !chosenTanggal ?
        window.location.href.split("/")[7] ?
          window.location.href.split("/")[7] : currLayanan.forSelect[0].tanggal
        : chosenTanggal,
      prefix: currLayanan.klaster.prefix,
      slot: slot
    }
    dispatch(sedangPesan(true))
    dispatch(pesanAsync(params))
  }

  async function batalReservasi() {
    dispatch(setIsDeleting(true))
    let params = {
      token: await getToken(),
      id_pengantri: state.pengantri.id,
      tanggal: chosenTanggal
    }
    dispatch(batalPesanAsync(params))
    //$('#btn-to-antrian').click()
  }

  function listenerManager(method: any, tanggal: any) {
    console.log('param', currLayanan.klaster.id, tanggal)
    let unsubscribe = db.collection('pesanan').where('id_klaster', '==', currLayanan.klaster.id).where('tanggal', '==', tanggal.toString()).onSnapshot(snapshot => {
      setListening(true)
      manageBiggest(snapshot)
      //console.log("big", slot)
      //saya termasuk?
      let dahpesan = false
      snapshot.forEach(doc => {
        console.log('pes', doc.data())
        if (doc.data().id_pengantri === state.pengantri.id && doc.data().status != '1') {
          if (doc.data().status != 4) {
            dahpesan = true
          }
        }
      })
      setSayaDahPesan(dahpesan)
    })
    if (method === 'stop') {
      unsubscribe()
    }
  }

  function changedChosenTanggal(tanggal: any) {
    setListening(false)
    setSayaDahPesan(false)
    listenerManager("stop", tanggal)
    listenerManager("start", tanggal)
  }

  function refreshLayanan() {
    var payload = {
      geraiKode: kodeGerai,
      layananKode: kodeLayanan
    }
    setBusy(true)
    dispatch(setIsFetching(true))
    dispatch(getLayananData(payload))
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
        <IonRefresher slot="fixed" onIonRefresh={(r) => {
          refreshLayanan()
          setTimeout(() => r.detail.complete(), 1)
        }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonButton id="btn-to-antrian" className="ion-hide" routerLink="/pengantri/antrian"></IonButton>
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
                {state.pengantri.banned ? <div className="ion-padding">
                  Anda tidak bisa melakukan reservasi sebelum <b>{getTanggalDisplay(state.pengantri.banned.toString())}</b> karena sudah 3 kali keterlambatan
                </div> : <>
                    <IonItem className="ion-no-margin" lines="none">
                      <IonLabel><b>Hari</b></IonLabel>

                      <IonSelect value={
                        !chosenTanggal ?
                          window.location.href.split("/")[7] ?
                            window.location.href.split("/")[7] : currLayanan.forSelect[0].tanggal
                          : chosenTanggal}
                        onIonChange={(e) => {
                          setChosenTanggal(e.detail.value)
                          changedChosenTanggal(e.detail.value)
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
                    {jadwalCurrHari === '' ? "" : listening ?
                      sayaDahPesan ? <div className="ion-padding-horizontal">
                        < p > Anda sudah pesan layanan ini di hari tersebut. Untuk melihatnya, silahkan cek di Tab Antrian</p>
                        <IonButton disabled={isDeletingLocal} onClick={() => setShowAlert(true)} color="danger">Batalkan reservasi</IonButton>
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
                }</>}
          </>
        }
        <IonButton className="ion-hide" id="btn-cari-refresh" routerLink="/pengantri/cari"></IonButton>
        {typeof currLayanan.forSelect === 'undefined' ? "" :
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={'Peringatan'}
            message={'Batalkan reservasi untuk hari tersebut?'}
            buttons={[
              {
                text: 'Tidak',
                role: 'cancel',
                cssClass: 'secondary'
              },
              {
                text: 'Ya',
                handler: () => {
                  batalReservasi()
                }
              }
            ]}
          />}
      </IonContent >
    </>
  )
}

export default LayananView