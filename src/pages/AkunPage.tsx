import React, { useState, useEffect } from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonRefresher, IonRefresherContent, IonList, IonListHeader, IonItem, IonBadge, IonSelect, IonSelectOption, IonButtons, IonButton, IonAvatar, IonIcon, IonItemDivider, IonPage } from "@ionic/react"
import CardAntrian from "../components/CardAntrian"
import { useSelector, connect, useDispatch } from "react-redux"
import $ from 'jquery'
import { logoutUser, getTanggalDisplay } from "../config/firebaseConfig"
import { createOutline, logoGoogle } from "ionicons/icons"
import { setUserState, setPenggunaData, retrieveFcmToken } from "../redux/actions"
import firebase from "../config/firebaseConfig"

const DefaultAkunPage: React.FC = () => {
  const antrians = useSelector((state: any) => state.antrians)
  const theState = useSelector((state: any) => state)
  const role = useSelector((state: any) => state.role)
  const [activeSegment, setActiveSegment] = useState('berlangsung')
  //console.log(antrians)
  const shown = { display: 'block' }
  const hidden = { display: 'none' }
  const state = useSelector((state: any) => state)
  const pengguna = state.pengguna
  const dispatch = useDispatch()
  const fcmTokenLocal = state.fcmToken

  const swithSegmentTo = (segment: any) => {
    setActiveSegment(segment)
    //console.log(activeSegment)
    $('.customSegments').hide()
    $('#segment-' + segment).show()
  }

  const switchViewTo = (view: any) => {
    window.location.href = "/" + view
  }

  function refreshAkun() {
    dispatch(setPenggunaData(firebase.auth().currentUser))
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
        <IonRefresher slot="fixed" onIonRefresh={(r) => {
          dispatch(setPenggunaData(firebase.auth().currentUser))
          setTimeout(() => r.detail.complete(), 1)
        }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
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
            {firebase.auth().currentUser?.emailVerified ? <IonIcon icon={logoGoogle} /> : ''}
            <IonIcon className={firebase.auth().currentUser?.emailVerified ? 'ion-hide' : ''} onClick={() => $('#btn-edit-akun').click()} icon={createOutline} />
          </IonItem>
        </div>
        <IonItemDivider className="custom-divider" />

        <IonItem lines="none">
          <IonLabel><h3>Email</h3></IonLabel>
          <IonLabel slot="end" className="ion-text-right"><p>{pengguna.email}</p></IonLabel>
        </IonItem>

        <IonItemDivider mode="ios">Pengantri</IonItemDivider>
        <IonItem lines="none">
          <IonLabel><h3>Jumlah keterlambatan</h3></IonLabel>
          <p slot="end">{state.pengantri.penalti ? state.pengantri.penalti.length : '0'}</p>
        </IonItem>
        {state.pengantri.banned ?
          <IonItem lines="none">
            <IonLabel><h3>Berakhirnya hukuman</h3></IonLabel>
            <p slot="end">{getTanggalDisplay(state.pengantri.banned)}</p>
          </IonItem>
          : ''}
          <IonButton onClick={()=>dispatch(retrieveFcmToken(''))}>Retrieve FCM Token</IonButton>
          <p>Token: {fcmTokenLocal}</p>

        {/* Hidden */}

        <IonButton className="ion-hide" id="btn-logout" onClick={() => {
          logoutUser(function (response: any) {
            if (response === true) {
              window.location.href = "/"
            }
          })
        }}>Logout</IonButton>
        <IonButton className="ion-hide" routerLink="/pengantri/akun/edit" id="btn-edit-akun" />
      <div className="custom-filler"></div></IonContent>
    </>
  )
}

export default connect()(DefaultAkunPage)