import React, { useState } from 'react'
import { IonToolbar, IonTitle, IonHeader, IonContent, IonLoading, IonSearchbar, IonCol, IonRow, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonButtons, IonItemDivider, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, IonIcon, IonAvatar, IonInput } from '@ionic/react'
import { starSharp, starHalfSharp, chevronDownOutline, chevronBackOutline, filterSharp, filterOutline, settingsOutline, funnelOutline, funnelSharp } from 'ionicons/icons'
import { useDispatch } from 'react-redux'
import { searchGeraiOrLayanan } from '../redux/actions'

const CariPage: React.FC = () => {
  const [busy, setBusy] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filterExpanded, setFilterExpanded] = useState(true)
  const dispatch = useDispatch()

  //cardSearch component
  const CardSearch: React.FC = () => {
    return (
      <IonCard>
        <IonCardHeader className="ion-no-padding ion-padding-vertical">
          <IonItem lines="none">
            <IonAvatar>
              <img src="/assets/img/location-outline.svg" />&nbsp;
            </IonAvatar>
            <IonLabel>
              <h3>Ali's Barbershop</h3>
              <p>Surakarta</p>
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
        </IonCardHeader>
        {/* <IonItemDivider className="custom-divider"></IonItemDivider> */}
        <IonCardContent>
          <p>
            <b>Deskripsi: </b>
          Melayani tukar uang dan layanan lainnya
        </p>
          <p>
            <b>Alamat: </b>
          Jl. Perintis kemerdekaan No 69 Surakarta
        </p>
        </IonCardContent>
      </IonCard>
    )
  }

  async function goSearch() {
    console.log('search: '+searchText)
    let params = {
      searchText: searchText
    }
    dispatch(searchGeraiOrLayanan(params))
  }

  //CariPage's return
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Reservasi
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={busy} />
        <IonRow>
          <IonCol>
            <IonSearchbar value={searchText} onIonChange={(e: any) => { setSearchText(e.detail.value); goSearch() }} mode="ios"
              placeholder="Cari gerai atau layanan"
            />
          </IonCol>
          <div className="ion-margin-end">
            <IonButton mode="md" color="primary" fill={!filterExpanded ? "outline" : "solid"} className="ion-margin-vertical"
              onClick={() => setFilterExpanded(!filterExpanded)}
            ><IonIcon size="small" icon={funnelSharp} /></IonButton>
          </div>
        </IonRow>
        {filterExpanded ?
          <IonItem lines="none">
            <IonLabel>Wilayah:</IonLabel>
            <IonSelect value="surakarta" interface="alert">
              <IonSelectOption value="surakarta">Surakarta</IonSelectOption>
            </IonSelect>
          </IonItem>
          : ""}
        <IonItemDivider className="custom-divider" />
        <CardSearch />
      </IonContent>
    </>
  )
}

export default CariPage