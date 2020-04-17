import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonRow, IonTitle, IonToolbar, IonItemDivider, IonIcon } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { locationOutline, addCircleOutline } from "ionicons/icons"

const GeraiPage: React.FC = () => {
  const [busy, setBusy] = useState(false)
  const curl = '/pemilik/gerai'
  const [activeSegment, setActiveSegment] = useState('berlangsung')
  const gerais = useSelector((state: any) => state.gerais)
  const geraisLoadedvar = useSelector((state: any) => state.geraisLoaded)
  const dispatch = useDispatch()
  const id_pemilik = useSelector((state: any) => state.pemilik.id)
  const state = useSelector((state: any) => state)
  //gerais
  const [localGerais, setLocalGerais] = useState([])
  //trying
  const [waiting, setWaiting] = useState(true)

  useEffect(() => {
    setLocalGerais(gerais)
    setTimeout(function () {
      setWaiting(false)
    }, 1000)
  })

  console.log("state: ", state)

  interface GeraiProps { data: any }
  const Gerai: React.FC<GeraiProps> = (data: any) => {
    return (
      <IonCard>
        <IonCardHeader>
          <IonItem>
            <IonLabel>
              <h3><b>{data.nama}</b></h3>
              <p>{data.kode}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>
        <IonCardContent>
          <IonRow>
            <IonCol>
              <IonCardSubtitle>SOmething</IonCardSubtitle>
              SOmething else
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>
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
        <IonLoading isOpen={busy} />
        <IonItemDivider mode="ios">
          <IonLabel>
            Gerai
            </IonLabel>
        </IonItemDivider>
        <IonList mode="md">
          {localGerais[0] ? (
            localGerais.map(function (gerai: any) {
              return (
                <IonItem key={gerai.kode} button routerLink={curl + "/" + gerai.kode}>
                  <IonIcon icon={locationOutline} color="black" size="large" /> &nbsp;
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
                  Anda tidak memiliki gerai
                </IonLabel>
              </IonItem>
            )}
          <IonItemDivider mode="ios">
            <IonLabel>
              Action
            </IonLabel>
          </IonItemDivider>
          <IonItem button routerLink={curl + "/daftar"}>
            <IonIcon size="large" icon={addCircleOutline} color="dark" /> &nbsp;
            <IonLabel>
              <p>
                Daftarkan gerai baru
              </p>
            </IonLabel>

          </IonItem>
        </IonList>
      </IonContent>
    </>
  )
}

export default connect()(GeraiPage)