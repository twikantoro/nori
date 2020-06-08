import React, { Component, useState, useEffect } from 'react'
import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonRow, IonCol, IonCardSubtitle, IonButton, IonBadge, IonIcon, IonItemDivider, IonSpinner, IonPopover, IonButtons } from '@ionic/react'
import { chevronUpCircleOutline, star, starOutline, closeOutline, helpCircle } from 'ionicons/icons'
import { useSelector, useDispatch } from 'react-redux'
import { setIsFetching, fetchKlasterRelateds } from '../redux/actions'
import $ from 'jquery'
import { getTanggalHariIni, getTanggalDisplay, getHariKode, getPerkiraan } from '../config/firebaseConfig'

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
        durasi: currDetail.durasi
      }
      //console.log("perk", params)
      let wtf = getPerkiraan(params)
      setPerkiraan(getPerkiraan(params))
      //console.log("pr", wtf)
    }
  })

  function goto(puth: any) {
    setPath(puth)
    $('#the-btn').click()
  }

  return (
    <IonCard className="card-antrian" button onClick={() => $('#btn-layanan'+props.id).click()} >
      {typeof currDetail === 'undefined' ? <IonSpinner /> : <>
        <IonButton className="ion-hide" id={"btn-gerai"+props.id} routerLink={"/pengantri/cari/" + currDetail.gerai.kode} />
        <IonButton className="ion-hide" id={"btn-layanan"+props.id} routerLink={"/pengantri/cari/" + currDetail.gerai.kode + "/" + currDetail.layanan.kode + "/" + props.tanggal} />
        <IonItem style={colorInherit} lines="none" className="ripple-transparent">
          <IonLabel>
            <h3 onClick={() => $('#btn-gerai'+props.id).click()}>
              <b>{currDetail.gerai.nama}</b></h3>
            <p onClick={() => $('#btn-layanan'+props.id).click()}
            >{currDetail.layanan.nama}</p>
          </IonLabel>
          {props.tanggal == tanggal ?
            <IonBadge color="warning">Berlangsung</IonBadge> : (
              props.status == 2 ?
                <IonBadge color="danger">Terlambat</IonBadge> :
                <IonBadge color="light">Dipesan</IonBadge>
            )
          }

        </IonItem>

        <IonItemDivider style={heightlessItemDivider}></IonItemDivider>
        <IonCardContent>

          <IonRow>
            <IonCol>
              <IonCardSubtitle>Slot Anda</IonCardSubtitle>
              <IonBadge color="primary">{props.prefix + "-" + props.slot}</IonBadge>
            </IonCol>
            {statusLocal === 'berlangsung' ?
              <IonCol>
                <IonCardSubtitle>Berlangsung</IonCardSubtitle>
                <IonBadge color="warning">A-17</IonBadge>
              </IonCol> : (
                statusLocal === 'terlambat' ?
                  <IonCol>
                    <IonCardSubtitle>Berlangsung</IonCardSubtitle>
                    <IonBadge color="danger">A-118</IonBadge></IonCol> : ''
              )}

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
              >Perkiraan dipanggil <IonIcon icon={helpCircle} /></IonCardSubtitle>

              {perkiraan}
            </IonCol>
          </IonRow>

        </IonCardContent>


      </>}
    </IonCard>
  )
}


export default CardAntrian