import React, { useState, useEffect } from 'react'
import { IonHeader, IonToolbar, IonButtons, IonSelect, IonSelectOption, IonButton, IonContent, IonItem, IonAvatar, IonLabel, IonIcon, IonItemDivider, IonSpinner } from '@ionic/react'
import { logoutUser, getToken, getHari } from '../config/firebaseConfig'
import { useSelector, useDispatch } from 'react-redux'
import { createOutline } from 'ionicons/icons'
import firebase from '../config/firebaseConfig'
import $ from 'jquery'
import { setIsFetchingGerai, fetchGeraiForStaf } from '../redux/actions'

const AkunStaf: React.FC = () => {
  const state = useSelector((state: any) => state)
  const role = useSelector((state: any) => state.role)
  const pengguna = state.pengguna
  const employed = state.staf.id_gerai ? true : false
  const gerai = state.geraiForStaf
  const isFetchingGeraiLocal = state.isFetchingGerai
  const dispatch = useDispatch()
  const staf = state.staf
  const [chosenKlaster, setChosenKlaster] = useState('')
  const [jadwal, setjadwal] = useState('')
  const [hasKlaster, setHasKlaster] = useState(false)

  const switchViewTo = (view: any) => {
    window.location.href = "/" + view
  }

  useEffect(() => {
    //workplace data
    if (employed && gerai.id === '' && !isFetchingGeraiLocal) {
      //dispatch(setIsFetchingGerai(true))
      initFetch()
    }
    //if ready
    if (gerai.id) {
      //setHasKlaster
      if (gerai.klasters[0]) {
        setHasKlaster(true)
      }
      //kalo punya klaster
      if (hasKlaster) {
        var asu = gerai.klasters[0].id
        //setchosenklaster
        setChosenKlaster(asu)
        //setjadwal
        initJadwal()
      }
    }
    //console.log("grai", gerai)
  })

  function initJadwal() {
    var jadwal = gerai.klasters[0].jadwal
    //console.log("jadwa",jadwal)
    setjadwal(jadwal)
  }

  async function initFetch() {
    var params = {
      token: await getToken(),
      id_gerai: staf.id_gerai
    }
    dispatch(fetchGeraiForStaf(params))
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonSelect interface="popover" value={role} onIonChange={(e: any) => switchViewTo(e.target.value)}>
              <IonSelectOption value="pengantri">Pengantri</IonSelectOption>
              <IonSelectOption value="pemilik">Pemilik</IonSelectOption>
              <IonSelectOption value="staf">Staf</IonSelectOption>
            </IonSelect>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton fill="clear" color="danger"
              onClick={() => {
                logoutUser(function (response: any) {
                  if (response === true) {
                    window.location.href = "/"
                  }
                })
              }}
            >Logout</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding-vertical ion-padding-end">
          <IonItem lines="none">
            <IonAvatar>
              {pengguna.photoURL ?
                <img src={pengguna.photoURL} /> :
                <img src="/assets/img/person-circle-outline.svg" />
              }
            </IonAvatar>&nbsp;
          <IonLabel>
              <h3>{pengguna.displayName ? pengguna.displayName : "user tanpa nama"}</h3>
              <p></p>
            </IonLabel>
            <IonIcon onClick={() => $('#btn-edit-akun').click()} icon={createOutline} />
          </IonItem>
        </div>
        <IonItemDivider className="custom-divider" />

        <IonItem lines="none">
          <IonLabel><h3>Email</h3></IonLabel>
          <IonLabel slot="end" className="ion-text-right"><p>{pengguna.email}</p></IonLabel>
        </IonItem>

        <IonItemDivider mode="ios">Gerai</IonItemDivider>
        {!employed ? <div className="ion-padding">Anda tidak bekerja di gerai manapun</div> :
          !gerai.id ? <IonSpinner className="ion-margin" /> : <>
            <IonItem lines="none">
              <IonLabel>
                <h3>{gerai.nama}</h3>
                <p>{gerai.alamat}</p>
              </IonLabel>
            </IonItem>

            <IonItemDivider mode="ios">Waktu Operasional</IonItemDivider>
            {!hasKlaster ? <div className="ion-padding">Gerai ini tidak memiliki klaster layanan</div> :
              <IonItem>
                <IonLabel>
                  <h3>Klaster</h3>
                </IonLabel>

                <IonSelect interface="popover" value={gerai.klasters[0].id} onIonChange={(e) => setChosenKlaster(e.detail.value)}>
                  {gerai.klasters.map((klaster: any) => {
                    return (
                      <IonSelectOption key={klaster.id} value={klaster.id}>
                        {klaster.nama}
                      </IonSelectOption>
                    )
                  })}
                </IonSelect>
              </IonItem>}
            {jadwal === '' ? '' : JSON.parse(jadwal).map((hari: any, index: any) => {
              return (
                <IonItem key={index}>
                  <IonLabel><p>{getHari(index)}</p></IonLabel>
                  <p slot="end">{hari ? hari : 'libur'}</p>
                </IonItem>
              )
            })}
          </>}

        {/* hidden */}
        < IonButton className="ion-hide" id="btn-logout" onClick={() => {
          logoutUser(function (response: any) {
            if (response === true) {
              window.location.href = "/"
            }
          })
        }}>Logout</IonButton>
        <IonButton className="ion-hide" routerLink="/pengantri/akun/edit" id="btn-edit-akun" />
        <div className="custom-filler"></div>
      </IonContent>
    </>
  )
}

export default AkunStaf