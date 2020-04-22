import React, { useState, useEffect } from 'react'
import { IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent, IonList, IonItem, IonInput, IonTitle, IonDatetime, IonLabel, IonBadge, IonChip, IonButton, IonLoading } from '@ionic/react'
import TimePicker from '../components/TimePicker'
import $ from 'jquery'
import { addLayananIsComplete, addLayananAsync, fetchLayanansByKodeAsync } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import { getToken } from '../config/firebaseConfig'

const TambahLayananPage: React.FC = () => {
  const addLayananIsCompleteLocal = useSelector((state: any) => state.addLayananIsComplete)
  const kode = window.location.href.split("/")[5]
  const motherURL = "/pemilik/gerai/" + kode
  const dispatch = useDispatch()
  const id_pemilik = useSelector((state: any) => state.pemilik.id)
  const [busy, setBusy] = useState(false)
  //inputs 
  const [nama, setNama] = useState('')
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
      if ($('#jadwal-hari-' + i).val() == "s") {
        jadwal[i] = $('#jadwal-hari-0').val()
      } else {
        jadwal[i] = $('#jadwal-hari-' + i).val()
      }
    }
    var params = {
      token: await getToken(),
      id_pemilik: id_pemilik,
      kode: kode,
      nama: nama,
      jadwal: JSON.stringify(jadwal)
    }
    dispatch(addLayananAsync(params))
  }

  useEffect(() => {
    if (addLayananIsCompleteLocal) {
      setBusy(false)
      dispatch(addLayananIsComplete(false))
      otwGettingLayanans()
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
            <IonTitle>Tambah Layanan</IonTitle>
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
          <TimePicker />
          <div className="ion-padding">
            <IonButton expand="block" onClick={() => submitLayanan()}>Buat</IonButton>
          </div>
        </IonList>
      </IonContent>
      <IonButton className="custom-hidden" routerLink={motherURL} id="btn-back" />
    </>
  )
}

export default TambahLayananPage