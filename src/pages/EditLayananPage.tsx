import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonLoading, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, IonCol, IonRow, IonAlert } from '@ionic/react'
import { helpCircleOutline } from 'ionicons/icons'
import $ from 'jquery'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from '../components/toast'
import { getToken } from '../config/firebaseConfig'
import { addLayananAsync, addLayananIsComplete, editLayananAsync, hapusLayananAsync, deaktivasiLayananAsync, aktivasiLayananAsync } from '../redux/actions'

const EditLayananPage: React.FC = () => {
  const state = useSelector((state: any) => state)
  const [showAlert, setShowAlert] = useState(false)

  const laykode = window.location.href.split("/")[7]
  const layanans = state.pemilik.layanans
  var currLayanan = {
    id: '',
    nama: '',
    kode: '',
    deskripsi: '',
    syarat: '',
    aktif: true
  }
  for (let layanan of layanans) {
    if (layanan.kode === laykode) {
      currLayanan = layanan
    }
  }
  const klasters = state.pemilik.klasters
  var klasterKode = ''
  for (let klaster of klasters) {
    if (klaster.kode === klasterKode) {
      klasterKode = klaster.kode
    }
  }

  const motherURL = "/pemilik/gerai/" + window.location.href.split("/")[5]
  const [busy, setBusy] = useState(false)
  const [inputs, setInputs] = useState(currLayanan)

  const hasKlaster = (Array.isArray(klasters) && klasters.length > 0) ? true : false
  const [chosenKlaster, setChosenKlaster] = useState(klasterKode)
  const dispatch = useDispatch()
  const addLayananIsCompleteLocal = state.addLayananIsComplete
  const pemilikBelongingsUpToDateLocal = state.pemilikBelongingsUpToDate

  useEffect(() => {
    if (hasKlaster) {
      setChosenKlaster(klasters[0].id)
    }
    if (addLayananIsCompleteLocal) {
      setBusy(false)
      dispatch(addLayananIsComplete(false))
      $('#btn-back').click()
    }
    if (!pemilikBelongingsUpToDateLocal) {
      setBusy(false)
      $('#btn-back').click()
    }
  })

  async function submitEditLayanan() {
    //validate
    var inputsValid = true
    if (
      inputs.nama === '' ||
      inputs.kode === '' ||
      inputs.deskripsi === '' ||
      inputs.syarat === ''
    ) {
      inputsValid = false
    }

    if (!inputsValid) {
      toast("Harap isi dengan lengkap"); return
    // } else if (!inputs.durasi.match(/^-{0,1}\d+$/)) {
    //   toast("Durasi slot harus berupa angka"); return
    } else if (!inputs.kode.match(/^\S*$/)) {
      toast("Kode tidak boleh mengandung spasi"); return
    } else if (!inputs.kode.match(/^[a-zA-Z0-9_.-]*$/)) {
      toast("Kode hanya boleh mengandung huruf dan angka"); return
    }

    //execute
    setBusy(true)
    var params = {
      token: await getToken(),
      id_pemilik: state.pemilik.id,
      ...inputs,
      id_klaster: chosenKlaster,
      laykode: currLayanan.kode,
      id_layanan: currLayanan.id
    }
    dispatch(editLayananAsync(params))
  }

  async function hapusLayananConfirm() {
    setBusy(true)
    const params = {
      token: await getToken(),
      id_pemilik: state.pemilik.id,
      id_layanan: currLayanan.id
    }
    dispatch(hapusLayananAsync(params))
  }

  async function deaktivasiLayanan() {
    setBusy(true)
    const params = {
      token: await getToken(),
      id_pemilik: state.pemilik.id,
      id_layanan: currLayanan.id
    }
    dispatch(deaktivasiLayananAsync(params))
  }

  async function aktivasiLayanan() {
    setBusy(true)
    const params = {
      token: await getToken(),
      id_pemilik: state.pemilik.id,
      id_layanan: currLayanan.id
    }
    dispatch(aktivasiLayananAsync(params))
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={motherURL}></IonBackButton>
          </IonButtons>
          <IonTitle>Edit Layanan</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={helpCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={busy} />

        <IonList>
          {/* nama */}
          <IonItem>
            <b>Nama:</b>&nbsp;
            <IonInput
              type="text"
              placeholder="Tukar Uang"
              onIonChange={(e: any) => setInputs({ ...inputs, nama: e.target.value })}
              value={inputs.nama}
            ></IonInput>
          </IonItem>
          {/* kode */}
          <IonItem>
            <b>Kode:</b>&nbsp;
            <IonInput
              type="text"
              placeholder="tukaruang"
              onIonChange={(e: any) => setInputs({ ...inputs, kode: e.target.value })}
              value={inputs.kode}
            ></IonInput>
          </IonItem>
          {/* deskripsi */}
          <IonItem lines="none">
            <b>Deskripsi:</b>&nbsp;
          </IonItem>
          <IonItem>
            <IonTextarea
              placeholder="Menukar uang lama dengan yang baru"
              onIonChange={(e: any) => setInputs({ ...inputs, deskripsi: e.target.value })}
              value={inputs.deskripsi}
            ></IonTextarea>
          </IonItem>
          {/* syarat */}
          <IonItem lines="none">
            <b>Syarat:</b>&nbsp;
          </IonItem>
          <IonItem>
            <IonTextarea
              placeholder="Uang lama atau rusak, KTP"
              onIonChange={(e: any) => setInputs({ ...inputs, syarat: e.target.value })}
              value={inputs.syarat}
            ></IonTextarea>
          </IonItem>
          {/* klaster */}
          <IonItem>
            <b>Klaster:</b>&nbsp;
            <IonSelect interface="popover" value={chosenKlaster} slot="end">
              {klasters.map((klaster: any) => {
                return (
                  <IonSelectOption value={klaster.id} key={klaster.id}
                    onClick={() => setChosenKlaster(klaster.id)}
                  >{klaster.nama}</IonSelectOption>
                )
              })}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonRow>
          <IonCol>
            <IonButton expand="block" onClick={() => submitEditLayanan()}>Submit</IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {currLayanan.aktif ?
              <IonButton expand="block" fill="outline" onClick={() => deaktivasiLayanan()}>Deaktivasi</IonButton>
              :
              <IonButton expand="block" fill="outline" onClick={() => aktivasiLayanan()}>Aktivasi</IonButton>
            }
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton expand="block" color="danger" fill="outline" onClick={() => setShowAlert(true)}>Hapus layanan</IonButton>
          </IonCol>
        </IonRow>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Hapus layanan?'}
          message={'Jika layanan ini ingin dibuka lagi, sebaiknya gunakan opsi deaktivasi.'}
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
                hapusLayananConfirm()
              }
            }
          ]}
        />

      <div className="custom-filler"></div></IonContent>
      <IonButton className="custom-hidden" id="btn-back" routerLink={motherURL} />
    </>
  )
}

export default EditLayananPage