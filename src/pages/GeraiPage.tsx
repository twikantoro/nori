import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonRow, IonTitle, IonToolbar, IonItemDivider, IonIcon, IonButton, IonSegment, IonSegmentButton } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { locationOutline, addCircleOutline, businessOutline, heart, hourglassOutline, bookmarkOutline, bookmarksOutline } from "ionicons/icons"
import $ from 'jquery'
import { addKlasterIsComplete, fetchPemilikBelongingsAsync, setFetchingPemilikBelongings } from "../redux/actions"
import { getToken } from "../config/firebaseConfig"

/* 
  BRIEFING
  - If has no gerai, show the "you dont have" page
  - If has gerai, show the page
  - Must contain layanans
  - Must contain sub layanans
  - Must contain staf
*/

const HasNoGeraiComp: React.FC = () => {
  return (
    <div>
      <h1>Buat gerai</h1>
      <p>Anda belum mempunyai gerai. Apakah anda ingin membuatnya?</p>
      <IonButton routerLink="/pemilik/gerai/buat">Buat</IonButton>
    </div>
  )
}

const GeraiPage: React.FC = () => {
  const [busy, setBusy] = useState(false)
  const curl = '/pemilik/gerai'
  const dispatch = useDispatch()
  const id_pemilik = useSelector((state: any) => state.pemilik.id)
  const state = useSelector((state: any) => state)
  //gerais
  const gerais = state.pemilik.gerais
  //has gerai?
  const hasGerai = (Array.isArray(gerais) && gerais.length > 0) ? true : false
  //chosen gerai
  const chosenGerai = hasGerai ? gerais[0] : new Array(0)
  //kode
  const kode = chosenGerai.kode
  const pemilikBelongingsUpToDateLocal = state.pemilikBelongingsUpToDate
  const fetchingPemilikBelongingsLocal = state.fetchingPemilikBelongings
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (!pemilikBelongingsUpToDateLocal && !fetchingPemilikBelongingsLocal) {
      setIsFetching(true)
      otwFetchBelongings()
      dispatch(setFetchingPemilikBelongings(true))
    }
    if (fetchingPemilikBelongingsLocal) {
      setIsFetching(false)
    }
    console.log("state: ", state)
  })

  async function otwFetchBelongings() {
    var params = {
      token: await getToken(),
      id_pemilik: id_pemilik
    }
    dispatch(fetchPemilikBelongingsAsync(params))
  }

  const HasGeraiComp: React.FC = () => {
    const [chosenSegment, setChosenSegment] = useState('layanan')
    const klasters = state.pemilik.klasters
    const hasKlaster = (Array.isArray(klasters) && klasters.length > 0) ? true : false

    const LayananSegment: React.FC = () => {
      const layanans = state.pemilik.layanans
      const hasLayanan = layanans.length > 0 ? true : false
      const jmlLayanan = layanans.length

      interface layananCompProps {
        title: any
      }
      const LayananComp: React.FC<layananCompProps> = ({ title }) => {
        return (
          <IonCol>
            <IonCard mode="md" className="ion-no-margin">
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
          <IonCol key="tambahanBRUH">
            <IonCard mode="md" className="ion-no-margin" button routerLink={"/pemilik/gerai/" + kode + "/tambahLayanan"}>
              <IonCardContent className="ion-justify-content-center ion-text-center">
                <IonIcon icon={addCircleOutline} size="large" color="medium" />
                <br />
                <IonLabel>Tambah</IonLabel>
              </IonCardContent>
            </IonCard>
          </IonCol>
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
            {width == '1' ? "" : <IonCol key="invis2">
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

      //console.log("layanan display: ", renderRow)

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
                  <IonRow key={"baris"+index}>
                    {
                      row.map(layanan => {
                        if (layanan.title == '--tambahan') {
                          if (layanan.tumbuhanID == 0) {
                            return <LayananAddComp key="tambahan" />
                          } else {
                            return <LayananInvisComp width="1" key={"tambahan" + layanan.tumbuhanID} />
                          }
                        } else {
                          return <LayananComp title={layanan.nama} key={layanan.id} />
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

    const KlasterSegment: React.FC = () => {
      const addKlasterIsCompleteLocal = state.addKlasterIsComplete
      useEffect(() => {
        if (addKlasterIsCompleteLocal) {
          //dispatch(fetchKlasterByKodeAsync(kode))
          dispatch(addKlasterIsComplete(false))
        }
      })
      return (
        <>
          {!hasKlaster ?
            <IonItem>
              <IonLabel>
                <h3>Belum ada klaster</h3>
              </IonLabel>
            </IonItem> :
            <>
              {klasters.map((klaster: any) => {
                return (
                  <IonItem key={klaster.id}>
                    <IonIcon icon={bookmarksOutline} size="large" />&nbsp;
                    <IonLabel>
                      <h3>{klaster.nama}</h3>
                      <p>Buka tiap hari</p>
                    </IonLabel>
                  </IonItem>
                )
              })}
            </>}
          <IonItem button onClick={() => $('#btn-add-klaster').click()} mode="md">
            <IonIcon icon={addCircleOutline} size="large" />&nbsp;
              <IonLabel>
              <h3>Buat klaster</h3>
            </IonLabel>
          </IonItem>
          <IonButton className="custom-hidden" routerLink={"/pemilik/gerai/" + kode + "/tambahKlaster"} id="btn-add-klaster" />
        </>
      )
    }

    return (
      <>
        <div className="ion-padding-vertical">
          <IonItem lines="none">
            <IonIcon icon={businessOutline} size="large" />&nbsp;
        <IonLabel>
              <h3>{chosenGerai.nama}</h3>
              <p>@{chosenGerai.kode}</p>
            </IonLabel>
          </IonItem>
          <div className="ion-padding-top ion-padding-horizontal">
            <IonLabel>
              <h3>
                Ini adalah deskripsi. Ini adalah deskripsi.
          </h3>
            </IonLabel>
          </div>
        </div>
        <IonSegment value={chosenSegment} mode="md" scrollable>
          <IonSegmentButton value="layanan" onClick={() => setChosenSegment('layanan')}>
            <IonLabel>Layanan</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="klaster" onClick={() => setChosenSegment('klaster')}>
            <IonLabel>Klaster</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="staf" onClick={() => setChosenSegment('staf')}>
            <IonLabel>Staf</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <div className={chosenSegment == 'layanan' ? "" : "custom-hidden"}>
          <LayananSegment />
        </div>
        <div className={chosenSegment == 'klaster' ? "" : "custom-hidden"}>
          <KlasterSegment />
        </div>
        <div className={chosenSegment == 'staf' ? "" : "custom-hidden"}>
          staf
        </div>
      </>
    )
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Gerai
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={isFetching} />
        {!hasGerai ? <HasNoGeraiComp /> : <HasGeraiComp />}
      </IonContent>
    </>
  )
}

export default connect()(GeraiPage)