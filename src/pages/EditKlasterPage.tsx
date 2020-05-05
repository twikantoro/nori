import React, { useState, useEffect } from 'react'
import { IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent, IonList, IonItem, IonInput, IonTitle, IonDatetime, IonLabel, IonBadge, IonChip, IonButton, IonLoading, IonRow, IonCol, IonAlert } from '@ionic/react'
import TimePicker from '../components/TimePicker'
import $ from 'jquery'
import { addLayananIsComplete, addLayananAsync, fetchLayanansByKodeAsync, addKlasterIsComplete, addKlasterAsync, setPemilikBelongingsUpToDate, editKlasterAsync, hapusKlasterAsync } from '../redux/actions'
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
  var currKlaster = { nama: '', jadwal: '' }
  for (let klaster of klasters) {
    if (klaster.id === klasterID) {
      currKlaster = klaster
    }
  }

  const gerais = state.pemilik.gerais
  var id_gerai = ''
  for (let gerai of gerais) {
    if (gerai.kode === kode) {
      id_gerai = gerai.id
    }
  }

  const [showAlert, setShowAlert] = useState(false)

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
      jadwal: JSON.stringify(jadwal),
      id_klaster: klasterID
    }
    dispatch(editKlasterAsync(params))
  }

  useEffect(() => {
    if (!pemilikBelongingsUpToDateLocal) {
      setBusy(false)
      $('#btn-back').click()
    }
  })

  async function hapusKlasterConfirm() {
    const params = {
      token: await getToken(),
      id_pemilik: state.pemilik.id,
      id_gerai: id_gerai,
      id_klaster: klasterID
    }
    dispatch(hapusKlasterAsync(params))
  }

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
          <TimePicker jadwal={currKlaster.jadwal} />
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={() => submitLayanan()}>Submit</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton fill="outline" color="danger" expand="block" onClick={() => setShowAlert(true)}>Hapus Klaster</IonButton>
            </IonCol>
            <IonCol>
              <IonButton fill="outline" expand="block" onClick={() => $('#btn-back').click()}>Batal</IonButton>
            </IonCol>
          </IonRow>
        </IonList>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Hapus klaster?'}
          message={'Semua layanan yang terhubung dengan klaster ini akan dihapus juga.'}
          buttons={[
            {
              text: 'Batal',
              role: 'cancel',
              handler: blah => {
                //console.log('Confirm Cancel: blah');
              }
            },
            {
              text: 'Hapus',
              handler: () => {
                hapusKlasterConfirm()
              }
            }
          ]}
        />
      </IonContent>
      <IonButton className="custom-hidden" routerLink={motherURL} id="btn-back" />
    </>
  )
}

export default EditKlasterPage