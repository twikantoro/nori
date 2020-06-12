import React, { Component, useState, useEffect } from 'react'
import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonRow, IonCol, IonCardSubtitle, IonButton, IonBadge, IonIcon, IonItemDivider, IonSpinner, IonPopover, IonButtons } from '@ionic/react'
import { chevronUpCircleOutline, star, starOutline, closeOutline, helpCircle } from 'ionicons/icons'
import { useSelector, useDispatch } from 'react-redux'
import { setIsFetching, fetchKlasterRelateds, diLokasiAsync, confirmSelesai, belumSelesai, getOrCreatePengantri } from '../redux/actions'
import $ from 'jquery'
import { getTanggalHariIni, getTanggalDisplay, getHariKode, getPerkiraan, db, getToken, getJamDisplayByTimestamp } from '../config/firebaseConfig'

interface OwnProps {
  props: any
}

// gerai: string,
//   subLayanan: string,
//   prefix: string,
//   slot: any,
//   current: any,
//   tanggal: any,
//   waktu: string,
//   status: any

interface CardAntrianProps extends OwnProps { }

const CardAntrian: React.FC<CardAntrianProps> = ({ props }) => {
  const [showPopover, setShowPopover] = useState(false)
  const [statusLocal, setStatusLocal] = useState(props.status)
  const state = useSelector((state: any) => state)
  const isFetchingLocal = state.isFetching
  const dispatch = useDispatch()
  const currDetail = state.klasterRelateds[props.id_klaster]
  const [path, setPath] = useState('/pengantri/cari')
  const tanggal = getTanggalHariIni()
  const [perkiraan, setPerkiraan] = useState('')
  const [initiated, setInitiated] = useState(false)
  const [dibuka, setDibuka] = useState(false)
  const [currSlot, setCurrSlot] = useState(0)
  const [btnPressed, setBtnPressed] = useState(false)
  // currDetail = {
  //   gerai: { nama: '', kode: '' },
  //   layanan: { nama: '' }
  // }

  const heightlessItemDivider = {
    minHeight: '1px'
  }
  const width100 = {
    width: '100%'
  }
  const expandBtnStyle = {
    color: 'inherit',
    width: '100%'
  }
  const popoverContent = {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '16px',
  }
  const colorInherit = {
    color: 'inherit'
  }

  useEffect(() => {
    console.log("curr for ", props.prefix + props.slot, currSlot)
    if (typeof currDetail === 'undefined' && !isFetchingLocal) {
      dispatch(setIsFetching(true))
      dispatch(fetchKlasterRelateds({ id_klaster: props.id_klaster, id_layanan: props.id_layanan }))
    }
    //if ready, run once
    if (typeof currDetail !== 'undefined' && !initiated) {
      setInitiated(true)
      let jadwalWeek = JSON.parse(currDetail.jadwal)
      let hariKode = getHariKode(props.tanggal)
      let params = {
        slot: props.slot,
        hari: hariKode,
        jadwal: jadwalWeek,
        durasi: parseInt(currDetail.durasi)
      }
      console.log("perk", params)
      let wtf = getPerkiraan(params)
      setPerkiraan(getPerkiraan(params))
      //console.log("pr", wtf)
      //setup firestore listener
      listenerManager('start')
    }
    //re-enable button
    if (btnPressed) {
      if (props.status == 3 || !props.status) {
        setBtnPressed(false)
      }
    }
    //refresh pengantri data if met status == 2
    if (props.status == 2 && !isFetchingLocal) {
      dispatch(setIsFetching(true))
      fetchPengantri()
    }
  })

  async function fetchPengantri() {
    dispatch(getOrCreatePengantri({ token: await getToken() }))
  }

  function listenerManager(method: any) {
    console.log("opening for " + currDetail.nama, "id klaster", props.id_klaster)
    var unsubscribe = db.collection('pesanan')
      .where('id_klaster', '==', props.id_klaster)
      .where('tanggal', '==', tanggal.toString()).onSnapshot(snapshot => {
        var jml = 0
        var smallest = 0
        snapshot.forEach(doc => {
          //buka?
          if (doc.data().slot == '0') {
            setDibuka(true)
          }
          //sekarang?
          if (!doc.data().status || doc.data().status == 3) {
            if (jml == 0) {
              //console.log("ant", doc.data())
              smallest = parseInt(doc.data().slot)
            } else {
              if (smallest == 0) {
                smallest = parseInt(doc.data().slot)
              }
              if (smallest > doc.data().slot) {
                smallest = parseInt(doc.data().slot)
              }
            }
          }
          if (doc.data().slot != 0) {
            jml++
          }
        })
        //still getting current antrian
        let found = false
        snapshot.forEach(doc => {
          if (doc.data().slot == smallest && smallest != 0) {
            found = true
            setCurrSlot(doc.data().slot)
          }
        })
        if (!found) {
          setCurrSlot(0)
        }
      })
    if (method === 'stop') {
      unsubscribe()
    }
  }

  function goto(puth: any) {
    setPath(puth)
    $('#the-btn').click()
  }

  function diLokasi() {
    setBtnPressed(true)
    dispatch(diLokasiAsync({
      id_pesanan: props.id
    }))
  }

  function confirmSelesaiLocal() {
    setBtnPressed(true)
    dispatch(confirmSelesai({ id_pesanan: props.id }))
  }

  function belumSelesaiLocal() {
    setBtnPressed(true)
    dispatch(belumSelesai({ id_pesanan: props.id }))
  }

  return (
    <IonCard className="card-antrian">
      {typeof currDetail === 'undefined' ? <IonSpinner /> : <>
        <IonButton className="ion-hide" id={"btn-gerai" + props.id} routerLink={"/pengantri/cari/" + currDetail.gerai.kode} />
        <IonButton className="ion-hide" id={"btn-layanan" + props.id} routerLink={"/pengantri/cari/" + currDetail.gerai.kode + "/" + currDetail.layanan.kode + "/" + props.tanggal} />
        <IonItem style={colorInherit} lines="none" className="ripple-transparent">
          <IonLabel>
            <h3 onClick={() => $('#btn-gerai' + props.id).click()}>
              <b>{currDetail.gerai.nama}</b></h3>
            <p onClick={() => $('#btn-layanan' + props.id).click()}
            >{currDetail.layanan.nama}</p>
          </IonLabel>
          {props.tanggal != tanggal ? <IonBadge color="light">Dipesan</IonBadge> :
            props.status == 2 ?
              <IonBadge color="danger">Terlambat</IonBadge> :
              props.status == 1 || props.status == 4 ?
                <IonBadge color="success">Selesai</IonBadge> :
                !dibuka ?
                  <IonBadge color="light">Belum buka</IonBadge> :
                  <IonBadge color="warning">Berlangsung</IonBadge>
          }

        </IonItem>

        <IonItemDivider style={heightlessItemDivider}></IonItemDivider>
        <IonCardContent>

          <IonRow>
            <IonCol>
              <IonCardSubtitle>Slot Anda</IonCardSubtitle>
              <IonBadge color="primary">{props.prefix + "-" + props.slot}</IonBadge>
            </IonCol>
            {tanggal != props.tanggal || currSlot == 0 || props.status == 1 || !dibuka || props.status == 4 ? '' :
              props.status == 2 ?
                <IonCol>
                  <IonCardSubtitle>Slot sekarang</IonCardSubtitle>
                  <IonBadge color="danger">{currDetail.prefix + "-" + currSlot}</IonBadge></IonCol>
                : <IonCol>
                  <IonCardSubtitle>Slot sekarang</IonCardSubtitle>
                  <IonBadge color="warning">{currDetail.prefix + "-" + currSlot}</IonBadge>
                </IonCol>
            }
            {props.waktu_selesai?
              <IonCol>
                <IonCardSubtitle>Waktu selesai</IonCardSubtitle>
                {getJamDisplayByTimestamp(props.waktu_selesai)}
              </IonCol>
            :''}

          </IonRow>
          <IonRow>
            <IonCol>
              <IonCardSubtitle>Tanggal</IonCardSubtitle>
              {getTanggalDisplay(props.tanggal)}
            </IonCol>
            <IonCol>


              <IonPopover
                isOpen={showPopover}
                onDidDismiss={e => setShowPopover(false)}
              >
                <IonItem lines="none" style={colorInherit}>
                  <IonLabel>
                    <b>Info</b>
                  </IonLabel>
                  <IonIcon icon={closeOutline} onClick={() => setShowPopover(false)} />
                </IonItem>
                <IonItemDivider style={heightlessItemDivider}></IonItemDivider>
                <div style={popoverContent}>
                  <p>Waktu slot adalah perkiraan kapan anda akan dipanggil.</p>
                  <p>Dalam pelaksanaannya, bisa saja lebih awal atau terjadi kemunduran.</p>
                  <p>Jika nomor urut anda sudah dilampaui sebelum perkiraan dipanggil, anda tidak dikenakan penalti.
                  Sebaliknya jika nomor urut anda sudah dilampaui ketika waktu sudah melebihi perkiraan, maka anda dikenakan penalti
                    </p>
                </div>
              </IonPopover><IonCardSubtitle
                onClick={() => setShowPopover(showPopover ? false : true)}
              >Perkiraan<IonIcon icon={helpCircle} /></IonCardSubtitle>

              {perkiraan}
            </IonCol>
          </IonRow>

          {props.status == 2 ? <>
            <IonItemDivider className="custom-divider" />
            <IonButton expand="block" disabled={btnPressed}
              onClick={() => diLokasi()}
            >Saya sudah di lokasi</IonButton></> : ''}

          {props.status == 1 ? <>
            <IonItemDivider className="custom-divider" />
            <IonRow>
              <IonCol>
                <IonButton disabled={btnPressed} expand="block" fill="outline" onClick={() => belumSelesaiLocal()}>Belum</IonButton>
              </IonCol>
              <IonCol>
                <IonButton disabled={btnPressed} expand="block" onClick={() => confirmSelesaiLocal()}>Selesai</IonButton>
              </IonCol>
            </IonRow>
          </> : ''}
        </IonCardContent>


      </>}
    </IonCard >
  )
}


export default CardAntrian