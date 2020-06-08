import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonRow, IonTitle, IonToolbar, IonItemDivider, IonIcon, IonButton, IonSegment, IonSegmentButton, IonButtons, IonSelect, IonSelectOption } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { locationOutline, addCircleOutline, businessOutline, heart, hourglassOutline, bookmarkOutline, bookmarksOutline, pencilSharp, pencilOutline, createOutline } from "ionicons/icons"
import $ from 'jquery'
import { addKlasterIsComplete, fetchPemilikBelongingsAsync, setFetchingPemilikBelongings, setChosenGerai, setPemilikBelongingsUpToDate } from "../redux/actions"
import { getToken } from "../config/firebaseConfig"
import { Link } from "react-router-dom"

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
    <div className="ion-padding">
      <h1>Buat gerai</h1>
      <p>Anda belum mempunyai gerai. Apakah anda ingin membuatnya?</p>
      <IonButton routerLink="/pemilik/gerai/daftar">Buat</IonButton>
    </div>
  )
}

const GeraiPage: React.FC = () => {
  //make sure its all loaded
  const [madeSure, setMadeSure] = useState(false)
  const [busy, setBusy] = useState(false)
  const [firstTime, setFirstTime] = useState(true)
  const curl = '/pemilik/gerai'
  const dispatch = useDispatch()
  const id_pemilik = useSelector((state: any) => state.pemilik.id)
  const state = useSelector((state: any) => state)
  var id_gerai = ''
  //gerais
  const gerais = state.pemilik.gerais
  //has gerai?
  const hasGerai = (Array.isArray(gerais) && gerais.length > 0) ? true : false
  //kode
  const kode = state.chosenGeraiKode
  //chosen gerai
  var chosenGerai = { nama: '', kode: '', deskripsi: '', alamat: '', tautan: '' }
  //assign values of chosen gerai
  if (hasGerai) {
    for (let gerai of gerais) {
      if (gerai.kode === kode) {
        chosenGerai = gerai
        id_gerai = gerai.id
      }
    }
  }
  const pemilikBelongingsUpToDateLocal = state.pemilikBelongingsUpToDate
  const fetchingPemilikBelongingsLocal = state.fetchingPemilikBelongings
  const [isFetching, setIsFetching] = useState(false)
  const chosenGeraiKode = state.chosenGeraiKode

  useEffect(() => {
    if (!pemilikBelongingsUpToDateLocal && !fetchingPemilikBelongingsLocal) {
      setIsFetching(true)
      otwFetchBelongings()
      dispatch(setFetchingPemilikBelongings(true))
    }
    if (fetchingPemilikBelongingsLocal) {
      setIsFetching(false)
    }
    //detect chosen gerai change
    if (chosenGerai.kode !== chosenGeraiKode) {
      gerais.forEach((gerai: any) => {
        if (gerai.kode == chosenGeraiKode) {
          chosenGerai = gerai
        }
      })
    }
    //trying to debug: klaster n layanan not showing
    if (!Array.isArray(state.pemilik.klasters) && !madeSure) {
      setMadeSure(true)
      dispatch(setPemilikBelongingsUpToDate(false))
    }
    //debug: chosen gerai is the deleted gerai, showing emptiness
    // later i guess
  })

  async function otwFetchBelongings() {
    var params = {
      token: await getToken(),
      id_pemilik: id_pemilik
    }
    dispatch(fetchPemilikBelongingsAsync(params))
  }

  function changeChosenGerai(target: any) {
    dispatch(setChosenGerai(target.value))
  }

  const HasGeraiComp: React.FC = () => {
    const [chosenSegment, setChosenSegment] = useState('layanan')
    const klastersAll = state.pemilik.klasters
    var klasters = new Array(0)
    var klastersWhitelist = new Array(0)
    if (Array.isArray(klastersAll) && klastersAll.length !== 0) {
      for (let klaster of klastersAll) {
        //console.log(klaster.id_gerai+" vs "+id_gerai)
        if (klaster.id_gerai == id_gerai) {
          //console.log('happening')
          klasters = klasters.concat(klaster)
          klastersWhitelist = klastersWhitelist.concat(klaster.id)
        }
      }
    }
    const hasKlaster = (Array.isArray(klasters) && klasters.length > 0) ? true : false

    const LayananSegment: React.FC = () => {
      const layanansAll = state.pemilik.layanans
      var layanans = new Array(0)
      if (Array.isArray(layanansAll) && layanansAll.length !== 0) {
        for (let layanan of layanansAll) {
          if (klastersWhitelist.includes(layanan.id_klaster)) {
            layanans = layanans.concat(layanan)
          }
        }
      }
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
            <IonCard style={aktif ? {} : bgGrey} mode="md" className="ion-no-margin" button routerLink={"/pemilik/gerai/" + kode + "/layanan/" + laykode}>
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

      //console.log("layanan display: ", renderRow)
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
                  <IonItem key={klaster.id} mode="md" routerLink={"/pemilik/gerai/" + kode + "/klaster/" + klaster.id}>
                    <IonIcon icon={bookmarksOutline} size="large" />&nbsp;
                    <IonLabel>
                      <h3>{klaster.nama}</h3>
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

    //this is hasgeraicomp's return
    return (
      <>
        <div className="ion-padding-vertical">
          <IonItem lines="none" mode="md">
            <IonIcon icon={businessOutline} size="large" />&nbsp;
        <IonLabel>
              <h3>{chosenGerai.nama}</h3>
              <p>@{chosenGerai.kode}</p>
            </IonLabel>
            <IonIcon slot="end" icon={createOutline} onClick={() => $('#btn-edit').click()} />
          </IonItem>
          <div className="ion-padding-top ion-padding-horizontal">
            <IonLabel>
              <h3>{chosenGerai.deskripsi}</h3>
              <h3><a target="_blank" className="cust-no-dec" href={chosenGerai.tautan === '' || typeof chosenGerai.tautan === 'undefined' ? 'https://www.google.co.id/maps/search/' + chosenGerai.alamat.replace(" ", "+") : chosenGerai.tautan}>
                {chosenGerai.alamat}</a></h3>
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
        <div className={chosenSegment === 'layanan' ? "" : "custom-hidden"}>
          <LayananSegment />
        </div>
        <div className={chosenSegment === 'klaster' ? "" : "custom-hidden"}>
          <KlasterSegment />
        </div>
        <div className={chosenSegment === 'staf' ? "" : "custom-hidden"}>
          staf
        </div>
        <IonButton className="custom-hidden" routerLink={"/pemilik/gerai/" + kode + "/edit"} id="btn-edit" />
      </>
    )
  }

  //console.log(gerais)

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">

          </IonButtons>
          <IonTitle>
            Gerai
          </IonTitle>
          <IonButtons slot="end">
            {/* tryna debug by doubling em */}
            {typeof gerais === "undefined" ? "" : gerais.length > 1 ?
              <IonSelect interface="popover" value={kode} onIonChange={(e) => changeChosenGerai(e.target)}>
                {gerais.map((gerai: any) => {
                  if (gerai.kode === kode) {
                    return (<IonSelectOption key={gerai.id} value={gerai.kode}
                      onClick={() => changeChosenGerai(gerai.kode)}
                    >
                      @{gerai.kode.length < 11 ? gerai.kode : gerai.kode.substring(0, 11) + "..."}
                    </IonSelectOption>)
                  }
                })}
                {gerais.map((gerai: any) => {
                  if (gerai.kode !== kode) {
                    return (<IonSelectOption key={gerai.id} value={gerai.kode}
                      onClick={() => changeChosenGerai(gerai.kode)}
                    >
                      @{gerai.kode.length < 11 ? gerai.kode : gerai.kode.substring(0, 11) + "..."}
                    </IonSelectOption>)
                  }
                })}
              </IonSelect> : ""
            }
          </IonButtons>
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