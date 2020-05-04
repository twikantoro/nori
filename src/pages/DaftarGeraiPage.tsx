import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLoading, IonGrid, IonInput, IonRow, IonCol, IonButton, IonTextarea } from "@ionic/react"
import { chevronForwardOutline, logoGoogle } from "ionicons/icons"
import $ from 'jquery'
import React, { useState, useEffect } from "react"
import { connect, useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import apiSite from "../config/apiSite"
import { getToken } from "../config/firebaseConfig"
import queryString from "query-string"
import { setPemilikData, geraiNeedsUpdate } from "../redux/actions"
import { toast } from "../components/toast"
import Dispatcher from "../cheats/Dispatcher"
import { createGeraiAsync } from "../redux/actions"

const DaftarGerai: React.FC = () => {
  const theState = useSelector((state: any) => state)
  const [busy, setBusy] = useState(false)
  const [nama, setNama] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [alamat, setAlamat] = useState('')
  const [wilayah, setWilayah] = useState('')
  const [kode, setKode] = useState('')
  const pemilik = useSelector((state: any) => state.pemilik)
  //console.log(antrians)
  const shown = { display: 'block' }
  const hidden = { display: 'none' }
  //dispatcher
  const [dispatcher, showDispatcher] = useState(false)
  const dispatch = useDispatch()
  //geraineeds update?
  const geraiNeedsUpdateLocal = useSelector((state:any)=>state.geraiNeedsUpdate)

  async function submitGerai() {
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
      wilayah: wilayah
    }
    dispatch(createGeraiAsync(params))
  }

  useEffect(()=>{
    if(geraiNeedsUpdateLocal){
      dispatch(geraiNeedsUpdate(false))
      setBusy(false)
      toast("Berhasil")
      //$('#btnToGerai').click()
      window.location.href="/pemilik/gerai"
    }
  })

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/pemilik/gerai"></IonBackButton>
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