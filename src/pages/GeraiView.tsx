import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonLoading, IonSegment, IonSegmentButton, IonTitle, IonToolbar, IonCol, IonCard, IonCardContent, IonRow, IonSpinner } from '@ionic/react'
import { businessOutline, starHalfSharp, starSharp, hourglassOutline, addCircleOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGeraiAsyncPublic } from '../redux/actions'

const GeraiView: React.FC = () => {
  const [chosenSegment, setChosenSegment] = useState('layanan')
  const [busy, setBusy] = useState(false)
  const dispatch = useDispatch()

  const kodeGerai = window.location.href.split("/")[5]

  const state = useSelector((state: any) => state)
  const gerais = state.gerais
  const currGerai = typeof gerais[kodeGerai] === "undefined" ? {} : gerais[kodeGerai]

  useEffect(() => {
    if (typeof currGerai.kode === 'undefined') {
      setBusy(true)
      dispatch(getGeraiAsyncPublic(kodeGerai))
    } else {
      setBusy(false)
    }
  })

  const LayananSegment: React.FC = () => {
    const layanansAll = state.pemilik.layanans
    var layanans = typeof gerais[kodeGerai] === "undefined" ? [] : currGerai.layanans
    const hasLayanan = layanans.length > 0 ? true : false
    const jmlLayanan = layanans.length

    interface layananCompProps {
      title: any,
      laykode: any,
      aktif: any
    }
    const LayananComp: React.FC<layananCompProps> = ({ title, laykode, aktif }) => {
      const bgGrey = {
        backgroundColor: "#dddddd"
      }
      return (
        <IonCol>
          <IonCard style={aktif ? {} : bgGrey} mode="md" className="ion-no-margin" button routerLink={"/pengantri/cari/" + kodeGerai + "/" + laykode}>
            <IonCardContent className="ion-justify-content-center ion-text-center">
              <IonIcon icon={hourglassOutline} size="large" color="primary" />
              <br />
              <IonLabel>{title}</IonLabel>
            </IonCardContent>
          </IonCard>
        </IonCol>
      )
    }
    const LayananAddComp: React.FC = () => {
      return (
        <>
          <IonCol key="invis1">
            <IonCard mode="md" className="ion-no-margin opacity-0">
              <IonCardContent className="ion-justify-content-center ion-text-center">
                <IonIcon icon={addCircleOutline} size="large" color="dark" />
                <br />
                <IonLabel>Tambah</IonLabel>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </>
      )
    }
    interface LayananInvisCompProps {
      width: any
    }
    const LayananInvisComp: React.FC<LayananInvisCompProps> = ({ width }) => {
      return (
        <>
          <IonCol key="invis1">
            <IonCard mode="md" className="ion-no-margin opacity-0">
              <IonCardContent className="ion-justify-content-center ion-text-center">
                <IonIcon icon={addCircleOutline} size="large" color="dark" />
                <br />
                <IonLabel>Tambah</IonLabel>
              </IonCardContent>
            </IonCard>
          </IonCol>
          {width === '1' ? "" : <IonCol key="invis2">
            <IonCard mode="md" className="ion-no-margin opacity-0">
              <IonCardContent className="ion-justify-content-center ion-text-center">
                <IonIcon icon={addCircleOutline} size="large" color="dark" />
                <br />
                <IonLabel>Tambah</IonLabel>
              </IonCardContent>
            </IonCard>
          </IonCol>}
        </>
      )
    }

    var layanansForDisplay = new Array(0)
    var i = 0
    if (hasLayanan) {
      layanans.forEach((layanan: any) => {
        layanansForDisplay[i] = {
          title: layanan.nama,
          kode: layanan.kode
        }
      })
    }
    const jmlRow = Math.ceil(jmlLayanan / 3)
    const renderRow = new Array(new Array(0))
    var j = 0
    var tumbuhan = 0
    for (i = 0; i < jmlRow; i++) {
      if (j < jmlLayanan) {
        renderRow[i][0] = layanans[j]
      } else { renderRow[i][0] = { title: "--tambahan", tumbuhanID: tumbuhan }; tumbuhan++ }
      j++
      if (j < jmlLayanan) {
        renderRow[i][1] = layanans[j]
      } else { renderRow[i][1] = { title: "--tambahan", tumbuhanID: tumbuhan }; tumbuhan++ }
      j++
      if (j < jmlLayanan) {
        renderRow[i][2] = layanans[j]
      } else { renderRow[i][2] = { title: "--tambahan", tumbuhanID: tumbuhan }; tumbuhan++ }
      j++
      i++
    }

    //this is layanansegment's return
    return (
      <>
        {!hasLayanan ?
          <IonRow>
            <LayananAddComp />
            <LayananInvisComp width="2" />
          </IonRow>
          : <>
            {renderRow.map((row, index) => {
              return (
                <IonRow key={"baris" + index}>
                  {
                    row.map(layanan => {
                      if (layanan.title === '--tambahan') {
                        if (layanan.tumbuhanID === 0) {
                          return <LayananAddComp key="tambahan" />
                        } else {
                          return <LayananInvisComp width="1" key={"tambahan" + layanan.tumbuhanID} />
                        }
                      } else {
                        return <LayananComp title={layanan.nama} key={layanan.id} laykode={layanan.kode} aktif={layanan.aktif} />
                      }
                    })
                  }
                </IonRow>
              )
            })}
          </>}

      </>
    )
  }

  //GeraiView's return
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/pengantri/cari"></IonBackButton>
          </IonButtons>
          <IonTitle>{busy ? kodeGerai : currGerai.nama}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <IonLoading isOpen={busy} /> */}
        {busy ? <div className="ion-padding"><IonSpinner /></div> :
          <>
            <div className="ion-padding-vertical">
              <IonItem lines="none" mode="md">
                <IonIcon icon={businessOutline} size="large" />&nbsp;
        <IonLabel>
                  <h3>{busy ? "Gerai" : currGerai.nama}</h3>
                  <p>@{busy ? "kode" : currGerai.kode}</p>
                </IonLabel>
                <div slot="end" className="ion-text-right ion-justify-content-right custom-review-text">
                  <IonIcon icon={starSharp} color="warning" />
                  <IonIcon icon={starSharp} color="warning" />
                  <IonIcon icon={starSharp} color="warning" />
                  <IonIcon icon={starSharp} color="warning" />
                  <IonIcon icon={starHalfSharp} color="warning" />
              (76)
          </div>
              </IonItem>
              <div className="ion-padding-top ion-padding-horizontal">
                <IonLabel>
                  <h3>{busy ? "Ini adalah deskripsi gerai" : currGerai.deskripsi}</h3>
                </IonLabel>
              </div>
            </div>
            <IonSegment value={chosenSegment} mode="md" scrollable>
              <IonSegmentButton value="layanan" onClick={() => setChosenSegment('layanan')}>
                <IonLabel>Layanan</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="info" onClick={() => setChosenSegment('info')}>
                <IonLabel>Info</IonLabel>
              </IonSegmentButton>
            </IonSegment>
            <div className={chosenSegment === 'layanan' ? "" : "custom-hidden"}>
              <LayananSegment />
            </div>
          </>
        }
      </IonContent>
    </>
  )
}

export default GeraiView