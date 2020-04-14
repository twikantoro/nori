import React, { useState, useEffect } from 'react'
import { IonTitle, IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent, IonButton, IonLoading } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { hapusGeraiAsync, geraiNeedsUpdate } from '../redux/actions'
import { getToken } from '../config/firebaseConfig'
import { Link } from 'react-router-dom'
import { toast } from '../components/toast'
import $ from 'jquery'

const GeraiDetailPemilik: React.FC = (data: any) => {
  const geraiNeedsUpdateLocal = useSelector((state: any) => state.geraiNeedsUpdate)
  const [busy, setBusy] = useState(false)
  const dispatch = useDispatch()
  const id_pemilik = useSelector((state: any) => state.pemilik.id)
  const gerais = useSelector((state: any) => state.gerais)
  const urls = window.location.href.split("/")
  const kode = urls[urls.length - 1]
  var geraiDetails = { 
    nama: null,
    kode: null 
  }
  gerais.forEach((gerai: any) => {
    if (gerai.kode == kode) {
      geraiDetails = gerai
    }
  })

  async function hapusGerai() {
    setBusy(true)
    const params = {
      token: await getToken(),
      id_pemilik: id_pemilik,
      kode: geraiDetails.kode
    }
    dispatch(hapusGeraiAsync(params))
  }

  useEffect(() => {
    if(geraiNeedsUpdateLocal){
      setBusy(false)
      dispatch(geraiNeedsUpdate(false))
      $('#btn-back').click()
      toast("Berhasil dihapus")
    }
  })

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/pemilik/gerai"></IonBackButton>
            <IonTitle>{geraiDetails.nama}</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading isOpen={busy} />
        <IonButton color="danger" onClick={() => hapusGerai()}>Hapus Gerai</IonButton>
      </IonContent>
      <IonButton id="btn-back" className="custom-hidden" routerLink="/pemilik/gerai" />
    </>
  )
}

export default GeraiDetailPemilik