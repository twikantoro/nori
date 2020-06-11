import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonLoading, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { toast } from "../components/toast"
import { getToken } from "../config/firebaseConfig"
import kotKabs from "../json/kota-kabupaten"
import { createGeraiAsync, geraiNeedsUpdate, setIsFetching } from "../redux/actions"

const DaftarGerai: React.FC = () => {
  const theState = useSelector((state: any) => state)
  const [busy, setBusy] = useState(false)
  const [nama, setNama] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [alamat, setAlamat] = useState('')
  const [wilayah, setWilayah] = useState('Surakarta')
  const [kode, setKode] = useState('')
  const [tautan, setTautan] = useState('')
  const pemilik = useSelector((state: any) => state.pemilik)
  //console.log(antrians)
  const shown = { display: 'block' }
  const hidden = { display: 'none' }
  //dispatcher
  const [dispatcher, showDispatcher] = useState(false)
  const dispatch = useDispatch()
  //geraineeds update?
  const geraiNeedsUpdateLocal = useSelector((state: any) => state.geraiNeedsUpdate)
  const backURL = '/pemilik/akun'
  const state = useSelector((state:any)=>state)
  const isFetchingLocal = state.isFetching

  async function submitGerai() {
    const params = {
      token: await getToken(),
      id_pemilik: pemilik.id,
      nama: nama,
      kode: kode,
      deskripsi: deskripsi,
      alamat: alamat,
      wilayah: wilayah,
      tautan: tautan
    }
    console.log("params", params)
    if (nama === '' || kode === '' || deskripsi === '' || alamat === '' || wilayah === '') {
      toast("Mohon isi formulir secara lengkap")
      return false
    }
    dispatch(setIsFetching(true))
    setBusy(true)
    dispatch(createGeraiAsync(params))
  }

  useEffect(() => {
    if (!isFetchingLocal && busy) {
      dispatch(geraiNeedsUpdate(false))
      setBusy(false)
      toast("Berhasil")
      //$('#btnToGerai').click()
      window.location.href = "/pemilik/gerai"
    }
  })

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={backURL}></IonBackButton>
            <IonTitle>
              Daftar Gerai
          </IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton id="btnToGerai" style={hidden} routerLink="/pemilik/gerai" />
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
              <IonSelect slot="end" value={"Surakarta"} interface="alert" onIonChange={(e) => setWilayah(e.detail.value)}>
                {kotKabs.map(kotKab => {
                  return (
                    <IonSelectOption key={kotKab} value={kotKab}>{kotKab}</IonSelectOption>
                  )
                })}
              </IonSelect>
            </IonItem>
            <IonItem>
              <b>Tautan lokasi (opsional):</b>&nbsp;
              <IonInput
                type="text"
                placeholder="https://goo.gl/maps/yTzNq95m7WKJQgCp7"
                onIonChange={(e: any) => setTautan(e.target.value)}
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
                onClick={() => submitGerai()}
              >Daftarkan
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  )
}

export default connect()(DaftarGerai)