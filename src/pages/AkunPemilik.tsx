import { IonAvatar, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonLoading, IonSelect, IonSelectOption, IonToolbar, IonButton } from "@ionic/react"
import { addCircleOutline, createOutline, logOutOutline } from "ionicons/icons"
import $ from 'jquery'
import React, { useState } from "react"
import { connect, useSelector } from "react-redux"
import { logoutUser, penggunaData, getCurrentUser } from "../config/firebaseConfig"

const AkunPemilik: React.FC = () => {
  //others
  const state = useSelector((state: any) => state)
  const [busy, setBusy] = useState(false)
  const role = useSelector((state: any) => state.role)
  const [activeSegment, setActiveSegment] = useState('berlangsung')
  const pengguna = state.pengguna

  const switchViewTo = (view: any) => {
    window.location.href = "/" + view
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
        <IonLoading isOpen={busy} />
        <IonItemDivider mode="ios">Gerai</IonItemDivider>
        <IonItem routerLink="/pemilik/akun/gerai/daftar" mode="md">
          <IonIcon icon={addCircleOutline} />&nbsp;
          <IonLabel>
            <h3>Buat gerai baru</h3>
          </IonLabel>
        </IonItem>
        <IonItemDivider mode="ios">Logout</IonItemDivider>
        <IonItem onClick={() => {
          logoutUser(function (response: any) {
            if (response === true) {
              window.location.href = "/"
            }
          })
        }}>
          <IonIcon icon={logOutOutline} />&nbsp;
          <IonLabel>
            <h3>Logout</h3>
          </IonLabel>
        </IonItem>
        <IonButton className="ion-hide" routerLink="/pemilik/akun/edit" id="btn-edit-akun" />
      </IonContent>
    </>
  )
}

export default connect()(AkunPemilik)