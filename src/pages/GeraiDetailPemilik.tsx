import React, { useState, useEffect } from 'react'
import { IonTitle, IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent, IonButton, IonLoading, IonItem, IonAvatar, IonLabel, IonList, IonSpinner, IonItemDivider, IonIcon } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { hapusGeraiAsync, geraiNeedsUpdate, fetchLayanansAsync, layanansAreUpdated, loadLayanansAsync, loadingLayananIsCompleteGlobal } from '../redux/actions'
import { getToken } from '../config/firebaseConfig'
import { Link } from 'react-router-dom'
import { toast } from '../components/toast'
import $ from 'jquery'
import { trashOutline } from 'ionicons/icons'


/*
Briefing

>> Handling delete gerai
- dispatch
- useEffect

>> Handling load layanans
- dispatch
- useEffect

*/

const GeraiDetailPemilik: React.FC = (data: any) => {
  const loadingLayananIsComplete = useSelector((state: any) => state.loadingLayananIsComplete)
  const [isLoadingLayanans, setIsLoadingLayanans] = useState(true)
  const layanansAreUpdatedLocal = useSelector((state: any) => state.layanansAreUpdated)
  const [layanansAreSet, setLayanansAreSet] = useState(false)
  const geraiNeedsUpdateLocal = useSelector((state: any) => state.geraiNeedsUpdate)
  const [busy, setBusy] = useState(false)
  const dispatch = useDispatch()
  const id_pemilik = useSelector((state: any) => state.pemilik.id)
  const gerais = useSelector((state: any) => state.gerais)
  // if (typeof gerais.layanans) {
  //   setLayanansAreSet(true)
  // }
  const urls = window.location.href.split("/")
  const kode = urls[urls.length - 1]
  const curl = '/pemilik/gerai/' + kode
  var geraiDetails = {
    nama: null,
    kode: null,
    layanans: []
  }
  gerais.forEach((gerai: any) => {
    if (gerai.kode == kode) {
      geraiDetails = gerai
    }
  })
  const layanans = geraiDetails.layanans ? geraiDetails.layanans : new Array(0)

  async function hapusGerai() {
    setBusy(true)
    const params = {
      token: await getToken(),
      id_pemilik: id_pemilik,
      kode: geraiDetails.kode
    }
    dispatch(hapusGeraiAsync(params))
  }

  var payload = {
    kode: kode
  }

  if (!isLoadingLayanans) {
    dispatch(loadLayanansAsync(payload))
    setIsLoadingLayanans(false)
  }

  useEffect(() => {
    if (geraiNeedsUpdateLocal) {
      setBusy(false)
      dispatch(geraiNeedsUpdate(false))
      $('#btn-back').click()
      toast("Berhasil dihapus")
    }
    //dispatching. everytime it loads

    if (loadingLayananIsComplete) {
      dispatch(loadingLayananIsCompleteGlobal(false))
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
      <IonContent >
        <IonLoading isOpen={busy} />
        <IonList mode="md">
          <IonItemDivider mode="ios">
            <IonLabel>
              Layanan
            </IonLabel>
          </IonItemDivider>
          {
            isLoadingLayanans ? (
              <IonItem>
                <IonSpinner></IonSpinner>
              </IonItem>
            ) : (
                layanans[0] ? (
                  layanans.map(function (gerai: any) {
                    return (
                      <IonItem key={gerai.kode} button routerLink={curl + "/" + gerai.kode}>
                        <IonAvatar>
                          <img src="/assets/img/location-outline.svg" />
                        </IonAvatar>
                        <IonLabel>
                          <h3>{gerai.nama}</h3>
                          <p>{gerai.kode}</p>
                        </IonLabel>
                      </IonItem>
                    )
                  })
                ) : (
                    <IonItem>
                      <IonLabel>
                        Gerai ini tidak memiliki layanan
                    </IonLabel>
                    </IonItem>
                  )
              )
          }
          <IonItemDivider mode="ios">
            <IonLabel>
              Action
            </IonLabel>
          </IonItemDivider>
          <IonItem button routerLink={curl + "/daftar"}>
            <IonAvatar>
              <img src="/assets/img/add-circle-outline.svg" />
            </IonAvatar>
            <IonLabel>
              <p>
                Buat layanan baru
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button onClick={() => hapusGerai()}>
            <IonIcon icon={trashOutline} />
            <IonLabel>
              <p color="danger">
                Hapus gerai
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonButton color="danger" onClick={() => hapusGerai()}>Hapus Gerai</IonButton>
      </IonContent>
      <IonButton id="btn-back" className="custom-hidden" routerLink="/pemilik/gerai" />
    </>
  )
}

export default GeraiDetailPemilik