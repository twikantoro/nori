import React, { useState, useEffect } from 'react'
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton, IonLoading, IonGrid, IonList, IonItem, IonInput, IonTextarea, IonRow, IonCol } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from '../components/toast'
import { getToken } from '../config/firebaseConfig'
import { createGeraiAsync, geraiNeedsUpdate, editGeraiAsync } from '../redux/actions'

const GeraiEditPage: React.FC = () => {
  const [busy, setBusy] = useState(false)
  const state = useSelector((state: any) => state)
  const [nama, setNama] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [alamat, setAlamat] = useState('')
  const [wilayah, setWilayah] = useState('')
  const [kode, setKode] = useState('')
  const pemilik = useSelector((state: any) => state.pemilik)
  const dispatch = useDispatch()
  const geraiNeedsUpdateLocal = useSelector((state: any) => state.geraiNeedsUpdate)
  const gerais = state.pemilik.gerais

  const pemilikBelongingsUpToDateLocal = state.pemilikBelongingsUpToDate

  const geraiKode = window.location.href.split("/")[5]

  var id_gerai = ''
  for (const gerai of gerais) {
    if (gerai.kode === geraiKode) {
      id_gerai = gerai.id
    }
  }

  async function submitEditGerai() {
    if (nama === '' || kode === '' || deskripsi === '' || alamat === '' || wilayah === '') {
      toast("Mohon isi formulir secara lengkap")
      return false
    }
    setBusy(true)
    const params = {
      token: await getToken(),
      id_pemilik: pemilik.id,
      nama: nama,
      kode: kode,
      deskripsi: deskripsi,
      alamat: alamat,
      wilayah: wilayah,
      id_gerai: id_gerai
    }
    dispatch(editGeraiAsync(params))
  }

  useEffect(() => {
    if (!pemilikBelongingsUpToDateLocal) {
      setBusy(false)
      toast("Berhasil")
      $('#btnToGerai').click()
    }
  })

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/pemilik/gerai"></IonBackButton>
            <IonTitle>
              Edit Gerai
          </IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton id="btnToGerai" className="custom-hidden" routerLink="/pemilik/gerai" />
        <IonLoading isOpen={busy} />
        <IonGrid>
          <IonList>
            <IonItem>
              <b>Nama:</b>&nbsp;
              <IonInput
                type="text"
                placeholder="Rumah Sakit Meikarta"
                onIonChange={(e: any) => setNama(e.target.value)}
                required
              />
            </IonItem>
            <IonItem>
              <b>Kode:</b>&nbsp;
              <IonInput
                type="text"
                placeholder="rsmeikarta"
                onIonChange={(e: any) => setKode(e.target.value)}
                required
              />
            </IonItem>
            <IonItem lines="none">
              <b>Deskripsi:</b>&nbsp;
            </IonItem>
            <IonItem>
              <IonTextarea
                onIonChange={(e: any) => setDeskripsi(e.target.value)}
                placeholder="Tersedia Poliklinik dan layanan lainnya"
              ></IonTextarea>
            </IonItem>
            <IonItem lines="none">
              <b>Alamat:</b>&nbsp;
            </IonItem>
            <IonItem>
              <IonTextarea
                onIonChange={(e: any) => setAlamat(e.target.value)}
                placeholder="Jl. Kenangan No. 420, Meikarta"
              ></IonTextarea>
            </IonItem>
            <IonItem>
              <b>Wilayah:</b>&nbsp;
              <IonInput
                type="text"
                onIonChange={(e: any) => setWilayah(e.target.value)}
                placeholder="Meikarta"
              />
            </IonItem>
            {/* <IonItem>
              <b>Lokasi:</b>&nbsp;
              <iframe
                src="https://www.google.com/maps/embed/v1/search?key=AIzaSyB5Z9FXmzH-_Z15QDYNg6boA28ak3tRbPE&q=record+stores+in+Seattle">
              </iframe>
            </IonItem> */}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton
                type="submit"
                expand="block"
                onClick={() => submitEditGerai()}
              >Daftarkan
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  )
}

export default GeraiEditPage