import React, { useState, useEffect } from 'react'
import { IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent, IonList, IonItem, IonInput, IonTitle, IonDatetime, IonLabel, IonBadge, IonChip, IonButton, IonLoading } from '@ionic/react'
import TimePicker from '../components/TimePicker'
import $ from 'jquery'
import { addLayananIsComplete, addLayananAsync, fetchLayanansByKodeAsync, addKlasterIsComplete, addKlasterAsync } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import { getToken } from '../config/firebaseConfig'

const TambahKlasterPage: React.FC = () => {
  const state = useSelector((state: any) => state)
  const addLayananIsCompleteLocal = useSelector((state: any) => state.addLayananIsComplete)
  const kode = window.location.href.split("/")[5]
  const motherURL = "/pemilik/gerai/" + kode
  const dispatch = useDispatch()
  const id_pemilik = useSelector((state: any) => state.pemilik.id)
  const [busy, setBusy] = useState(false)
  const addKlasterIsCompleteLocal = state.addKlasterIsComplete
  //inputs 
  const [nama, setNama] = useState('')
  const [durasi, setDurasi] = useState('')
  const [prefix, setPrefix] = useState('')
  const currGeraiKode = state.chosenGeraiKode
  var id_gerai = ''
  state.pemilik.gerais.forEach((gerai:any)=>{
    if(gerai.kode === currGeraiKode){
      id_gerai = gerai.id
    }
  })
  //hari
  // const initialHari = [
  //   [true,true,true,true,false,false,false],
  //   [false,false,false,false,true,false,false]
  // ]
  // const [hari,setHari] = useState(initialHari)

  // function toggleHari(seri:any, hari:any){
  //   var newHari = hari
  //   newHari[seri][hari] = !hari[seri][hari]
  //   setHari(newHari)
  // }

  async function submitLayanan() {
    setBusy(true)
    var jadwal = new Array(0)
    for (var i = 0; i < 7; i++) {
      if ($('#jadwal-hari-' + i).val() === "s") {
        jadwal[i] = $('#jadwal-hari-0').val()
      } else {
        jadwal[i] = $('#jadwal-hari-' + i).val()
      }
    }
    var params = {
      token: await getToken(),
      id_pemilik: id_pemilik,
      id_gerai: id_gerai,
      kode: kode,
      nama: nama,
      jadwal: JSON.stringify(jadwal),
      durasi: durasi,
      prefix: prefix
    }
    dispatch(addKlasterAsync(params))
  }

  useEffect(() => {
    if (addKlasterIsCompleteLocal) {
      setBusy(false)
      dispatch(addKlasterIsComplete(false))
      //otwGettingLayanans()
      $('#btn-back').click()
    }
  })

  async function otwGettingLayanans() {
    var params = {
      token: await getToken(),
      id_pemilik: id_pemilik,
      kode: kode
    }
    dispatch(fetchLayanansByKodeAsync(params))
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref={motherURL}></IonBackButton>
            <IonTitle>Buat Klaster</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={busy} />
        <IonList>
          <IonItem lines="none">
            <b>Nama:</b>&nbsp;
              <IonInput
              type="text"
              placeholder="Teller, CS, dll."
              onIonChange={(e: any) => setNama(e.target.value)}
              required
            />
          </IonItem>
          <IonItem lines="none">
            <b>Waktu operasional:</b>&nbsp;
          </IonItem>
          <TimePicker jadwal="empty" />
          <IonItem lines="none">
            <b>Perkiraan durasi (menit):</b>&nbsp;
            <IonInput
              type="text"
              placeholder="5 (menit)"
              onIonChange={(e: any) => setDurasi(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <b>Prefix slot (huruf):</b>&nbsp;
            <IonInput
              type="text"
              placeholder='misal "A"'
              onIonChange={(e: any) => setPrefix(e.target.value)}
            ></IonInput>
          </IonItem>
          <div className="ion-padding">
            <IonButton expand="block" onClick={() => submitLayanan()}>Buat</IonButton>
          </div>
        </IonList>
      <div className="custom-filler"></div></IonContent>
      <IonButton className="custom-hidden" routerLink={motherURL} id="btn-back" />
    </>
  )
}

export default TambahKlasterPage