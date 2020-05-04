import React, { useState, useEffect } from 'react'
import { IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent, IonList, IonItem, IonInput, IonTitle, IonDatetime, IonLabel, IonBadge, IonChip, IonButton, IonLoading } from '@ionic/react'
import TimePicker from '../components/TimePicker'
import $ from 'jquery'
import { addLayananIsComplete, addLayananAsync, fetchLayanansByKodeAsync, addKlasterIsComplete, addKlasterAsync, setPemilikBelongingsUpToDate, editKlasterAsync } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import { getToken } from '../config/firebaseConfig'

const EditKlasterPage: React.FC = () => {
  const state = useSelector((state: any) => state)
  const addLayananIsCompleteLocal = useSelector((state: any) => state.addLayananIsComplete)
  const kode = window.location.href.split("/")[5]
  const motherURL = "/pemilik/gerai/" + kode
  const dispatch = useDispatch()
  const id_pemilik = useSelector((state: any) => state.pemilik.id)
  const [busy, setBusy] = useState(false)
  const addKlasterIsCompleteLocal = state.addKlasterIsComplete
  //inputs 
  const klasterID = window.location.href.split("/")[7]
  const klasters = state.pemilik.klasters
  var currKlaster = {nama:''}
  for (let klaster of klasters) {
    if (klaster.id === klasterID) {
      currKlaster = klaster
    }
  }

  const [nama, setNama] = useState(currKlaster.nama)
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

  const pemilikBelongingsUpToDateLocal = state.pemilikBelongingsUpToDate

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
      kode: kode,
      nama: nama,
      jadwal: JSON.stringify(jadwal)
    }
    dispatch(editKlasterAsync(params))
  }

  useEffect(() => {
    if (!pemilikBelongingsUpToDateLocal) {
      setBusy(false)
      $('#btn-back').click()
    }
  })

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref={motherURL}></IonBackButton>
            <IonTitle>Edit Klaster</IonTitle>
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
              value={nama}
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

export default EditKlasterPage