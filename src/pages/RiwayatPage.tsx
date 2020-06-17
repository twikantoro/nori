import React from "react"
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonBadge, IonLabel, IonItemDivider, IonRefresher, IonRefresherContent } from "@ionic/react"
import { useSelector, connect } from "react-redux"
import CardRiwayat from "../components/CardRiwayat"
import { Redirect } from "react-router"

const DefaultRiwayatPage: React.FC = () => {
  const curl = "/pengantri/riwayat"
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Riwayat
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" id="refresher">
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList mode="md">
          <IonItemDivider mode="ios">
            <IonLabel>Kemarin</IonLabel>
          </IonItemDivider>
          <IonItem button routerLink={curl+"/detail"}>
            <IonLabel>
              <h3><b>Bank Ngadirejo</b></h3>
              <p>Tukar uang</p>
            </IonLabel>
            <IonBadge color="success">Sukses</IonBadge>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <h3><b>Bank Ngadirejo</b></h3>
              <p>Tukar uang</p>
            </IonLabel>
            <IonBadge color="success">Sukses</IonBadge>
          </IonItem>
          <IonItemDivider mode="ios">
            <IonLabel>1 April</IonLabel>
          </IonItemDivider>
          <IonItem button>
            <IonLabel>
              <h3><b>Bank Ngadirejo</b></h3>
              <p>Tukar uang</p>
            </IonLabel>
            <IonBadge color="success">Sukses</IonBadge>
          </IonItem>
          <IonItem button>
            <IonLabel>
              <h3><b>Bank Ngadirejo</b></h3>
              <p>Tukar uang</p>
            </IonLabel>
            <IonBadge color="success">Sukses</IonBadge>
          </IonItem>
        </IonList>
      <div className="custom-filler"></div></IonContent>
    </>
  )
}

export default connect()(DefaultRiwayatPage)