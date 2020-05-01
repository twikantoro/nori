import React, { useState, useEffect } from 'react'
import { IonTitle, IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent, IonButton, IonLoading, IonItem, IonAvatar, IonLabel, IonList, IonSpinner, IonItemDivider, IonIcon, IonAlert } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { hapusGeraiAsync, geraiNeedsUpdate, fetchLayanansAsync, layanansAreUpdated, loadLayanansAsync, loadingLayananIsCompleteGlobal, addLayananIsComplete, fetchLayanansByKodeAsync, setLayananIsComplete } from '../redux/actions'
import { getToken } from '../config/firebaseConfig'
import { Link } from 'react-router-dom'
import { toast } from '../components/toast'
import $ from 'jquery'
import { trashOutline, addCircleOutline, bookmarksOutline, bookmarkOutline, chevronBackOutline } from 'ionicons/icons'

const GeraiDetailPemilik: React.FC = (data: any) => {
  const [showAlertDelete, setShowAlertDelete] = useState(false)
  const loadingLayananIsComplete = useSelector((state: any) => state.loadingLayananIsComplete)
  const [isLoadingLayanans, setIsLoadingLayanans] = useState(true)
  const layanansAreUpdatedLocal = useSelector((state: any) => state.layanansAreUpdated)
  const [layanansAreSet, setLayanansAreSet] = useState(false)
  const geraiNeedsUpdateLocal = useSelector((state: any) => state.geraiNeedsUpdate)
  const [busy, setBusy] = useState(false)
  const dispatch = useDispatch()
  const id_pemilik = useSelector((state: any) => state.pemilik.id)
  const gerais = useSelector((state: any) => state.gerais)
  const [firstTimeLoading, setFirstTimeLoading] = useState(true)
  const [isGettingLayanans, setIsGettingLayanans] = useState(false)
  const setLayananIsCompleteLocal = useSelector((state: any) => state.setLayananIsComplete)
  const [setLayananIsCompleteLocalLocal, setSetLayananIsCompleteLocalLocal] = useState(false)
  const layanans = useSelector((state: any) => state.layanans)
  const state = useSelector((state:any)=>state)
  const geraisWithLayanansLoadedLocal = state.geraisWithLayanansLoaded
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
    if (gerai.kode === kode) {
      geraiDetails = gerai
    }
  })
  //const layanans = geraiDetails.layanans ? geraiDetails.layanans : new Array(0)

  async function hapusGerai() {
    setBusy(true)
    const params = {
      token: await getToken(),
      id_pemilik: id_pemilik,
      kode: geraiDetails.kode
    }
    dispatch(hapusGeraiAsync(params))
  }

  function hapusGeraiAlert() {
    setShowAlertDelete(true)
  }

  function hapusGeraiConfirm() {
    if ($("#konfirmasi-hapus").val() === kode) {
      hapusGerai()
    } else {
      toast("Konfirmasi gagal. Batal dihapus")
    }
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

    //fetch layanans
    if (firstTimeLoading) {
      setFirstTimeLoading(false)
      if (layanans[0]) {
        console.log("not updating layanans")
      } else if (geraisWithLayanansLoadedLocal.includes(kode)) {
        console.log("not updating layanans although it's empty")
      } else {
        console.log("im getting layanans")
        otwGettingLayanans()
      }
    }

    //respond to change
    if (setLayananIsCompleteLocal) {
      setSetLayananIsCompleteLocalLocal(true)
      dispatch(setLayananIsComplete(false))
    }
  })

  async function otwGettingLayanans() {
    var params = {
      token: await getToken(),
      id_pemilik: id_pemilik,
      kode: kode
    }
    dispatch(fetchLayanansByKodeAsync(params))
    setIsGettingLayanans(true)
  }

  function addLayananHandler() {
    $('#btn-add-layanan').click()
  }

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

        <IonItemDivider mode="ios">
          <IonLabel>
            Layanan
            </IonLabel>
        </IonItemDivider>
        {
          !setLayananIsCompleteLocalLocal ? (
            <IonItem>
              <IonSpinner></IonSpinner>
            </IonItem>
          ) : (
              layanans[0] ? (
                layanans.map(function (layanan: any) {
                  return (
                    <IonItem key={layanan.id} button routerLink={curl + "/" + layanan.kode}>
                      <IonIcon icon={bookmarksOutline} />&nbsp;
                      <IonLabel>
                        <h3>{layanan.nama}</h3>
                        <p>{layanan.kode}</p>
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
            Opsi
            </IonLabel>
        </IonItemDivider>
        <IonItem onClick={() => addLayananHandler()}>
          <IonIcon icon={addCircleOutline}></IonIcon>&nbsp;
            <IonLabel><h3>Tambah layanan baru</h3></IonLabel>
        </IonItem>
        <IonItem button onClick={() => hapusGeraiAlert()} mode="md">
          <IonIcon icon={trashOutline} size="large" color="danger" /> &nbsp;
            <IonLabel>
            <h3>Hapus gerai</h3>
          </IonLabel>
        </IonItem>

        <IonAlert
          isOpen={showAlertDelete}
          onDidDismiss={() => setShowAlertDelete(false)}
          header={'Hapus gerai?'}
          message={'Mohon ketik <b>' + kode + '</b> untuk mengonfirmasi'}
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
                hapusGeraiConfirm()
              }
            }
          ]}
          inputs={
            [{
              id: 'konfirmasi-hapus',
              type: 'text',
              placeholder: 'Kode gerai'
            }]
          }
        />
      </IonContent>
      <IonButton id="btn-back" className="custom-hidden" routerLink="/pemilik/gerai" />
      <IonButton id="btn-add-layanan" className="custom-hidden" routerLink={"/pemilik/gerai/" + kode + "/tambah"} />
    </>
  )
}

export default GeraiDetailPemilik