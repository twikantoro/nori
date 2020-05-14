import React, { useState, useEffect } from 'react'
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSpinner, IonItem, IonLabel, IonItemDivider, IonSelect, IonSelectOption, IonRow, IonCol, IonButton } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { setTabRefresh } from '../redux/actions'
import $ from 'jquery'

const LayananView: React.FC = () => {
  let URLarray = window.location.href.split("/")
  let kodeGerai = URLarray[5]
  let kodeLayanan = URLarray[6]
  const state = useSelector((state:any)=>state)
  const tabRefresh = state.tabRefresh
  const dispatch = useDispatch()

  const [busy, setBusy] = useState(false)

  useEffect(()=>{
    if (tabRefresh === 'cari') {
      $('#btn-cari-refresh').click()
      dispatch(setTabRefresh(''))
    }
  })

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref={"/pengantri/cari/" + kodeGerai}></IonBackButton>
          </IonButtons>
          <IonTitle>{kodeLayanan}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {busy ? <div className="ion-padding"><IonSpinner /></div> :
          <>
            <IonItemDivider mode="ios">Detail</IonItemDivider>
            <div className="ion-padding-horizontal">
              <p><b>Deskripsi</b><br />Menukar uang dengan yang baru</p>
              <p><b>Syarat</b><br />- Uang lama</p>
            </div>
            <IonItemDivider mode="ios">Pesan untuk</IonItemDivider>
            <IonItem className="ion-no-margin" lines="none">
              <IonLabel><b>Hari</b></IonLabel>
              <IonSelect value="0" interface="popover">
                <IonSelectOption value="0">Kamis, 14 Mei</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem lines="none">
              <IonLabel><b>Waktu</b></IonLabel>
              <p slot="end">07.30-11.00,12.00-15.00</p>
            </IonItem>
            <IonItemDivider className="custom-divider" />
            <div className="ion-padding">
              <IonButton expand="block">Pesan cepat (07.30)</IonButton>
              <IonButton expand="block" fill="outline">Pesan (pilih waktu)</IonButton>
            </div>
          </>
        }
        <IonButton className="ion-hide" id="btn-cari-refresh" routerLink="/pengantri/cari"></IonButton>
      </IonContent>
    </>
  )
}

export default LayananView