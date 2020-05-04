import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonLoading, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react'
import { helpCircleOutline } from 'ionicons/icons'
import $ from 'jquery'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from '../components/toast'
import { getToken } from '../config/firebaseConfig'
import { addLayananAsync, addLayananIsComplete } from '../redux/actions'

const TambahLayananPage: React.FC = () => {
  const state = useSelector((state: any) => state)
  const motherURL = "/pemilik/gerai/" + window.location.href.split("/")[5]
  const [busy, setBusy] = useState(false)
  const [inputs, setInputs] = useState({
    nama: '',
    kode: '',
    deskripsi: '',
    syarat: '',
    durasi: ''
  })
  const klasters = state.pemilik.klasters
  const hasKlaster = (Array.isArray(klasters) && klasters.length > 0) ? true : false
  const [chosenKlaster, setChosenKlaster] = useState()
  const dispatch = useDispatch()
  const addLayananIsCompleteLocal = state.addLayananIsComplete

  useEffect(() => {
    if (hasKlaster) {
      setChosenKlaster(klasters[0].id)
    }
    if (addLayananIsCompleteLocal) {
      setBusy(false)
      dispatch(addLayananIsComplete(false))
      $('#btn-back').click()
    }
  })

  async function submitLayanan() {
    //validate
    var inputsValid = true
    if (
      inputs.nama === '' ||
      inputs.kode === '' ||
      inputs.deskripsi === '' ||
      inputs.syarat === '' ||
      inputs.durasi === ''
    ) {
      inputsValid = false
    }

    if (!inputsValid) {
      toast("Harap isi dengan lengkap"); return
    } else if (!inputs.durasi.match(/^-{0,1}\d+$/)) {
      toast("Durasi slot harus berupa angka"); return
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
      id_klaster: chosenKlaster
    }
    dispatch(addLayananAsync(params))
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={motherURL}></IonBackButton>
          </IonButtons>
          <IonTitle>Buat Layanan</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={helpCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={busy} />
        {!hasKlaster ? <p className="ion-padding-horizontal">Gerai ini belum memiliki klaster. Silahkan membuat klaster terlebih dahulu.</p> :
          <IonList>
            {/* nama */}
            <IonItem>
              <b>Nama:</b>&nbsp;
            <IonInput
                type="text"
                placeholder="Tukar Uang"
                onIonChange={(e: any) => setInputs({ ...inputs, nama: e.target.value })}
              ></IonInput>
            </IonItem>
            {/* kode */}
            <IonItem>
              <b>Kode:</b>&nbsp;
            <IonInput
                type="text"
                placeholder="tukaruang"
                onIonChange={(e: any) => setInputs({ ...inputs, kode: e.target.value })}
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
              ></IonTextarea>
            </IonItem>
            {/* durasi slot */}
            <IonItem>
              <b>Durasi slot (menit):</b>&nbsp;
            <IonInput
                type="text"
                placeholder="5"
                onIonChange={(e: any) => setInputs({ ...inputs, durasi: e.target.value })}
              ></IonInput>
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
          </IonList>}
        {hasKlaster ? <div className="ion-padding">
          <IonButton expand="block" onClick={() => submitLayanan()}>Buat</IonButton>
        </div> : ""}

      </IonContent>
      <IonButton className="custom-hidden" id="btn-back" routerLink={motherURL} />
    </>
  )
}

export default TambahLayananPage