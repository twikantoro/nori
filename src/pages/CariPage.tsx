import React, { useState } from 'react'
import { IonToolbar, IonTitle, IonHeader, IonContent, IonLoading, IonSearchbar, IonCol, IonRow, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonButtons, IonItemDivider, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, IonIcon, IonAvatar, IonInput, IonSpinner, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react'
import { starSharp, starHalfSharp, chevronDownOutline, chevronBackOutline, filterSharp, filterOutline, settingsOutline, funnelOutline, funnelSharp, search, searchOutline } from 'ionicons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { searchGeraiOrLayanan, setIsSearching } from '../redux/actions'
import { Link } from 'react-router-dom'
import kotkab from '../json/kota-kabupaten'
import kotaKabupaten from '../json/kota-kabupaten'
import $ from 'jquery'

const CariPage: React.FC = () => {
  const [busy, setBusy] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filterExpanded, setFilterExpanded] = useState(false)
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state)
  const [lastSearch, setLastSearch] = useState('')

  interface CardSearchProps {
    props: any
  }

  const hasilSearchLocal = state.hasilSearch
  const isSearchingLocal = state.isSearching
  const [chosenWilayah, setChosenWilayah] = useState('Surakarta')

  //cardSearch component
  const CardSearch: React.FC<CardSearchProps> = ({ props }) => {
    var layanansNames = ''
    if (props.layanans.length > 0) {
      var layanansNamesArray = props.layanans.map((layanan: any) => layanan.nama)
      layanansNames = layanansNamesArray.join(', ')
    } else {
      layanansNames = '-'
    }
    return (
      <IonCard button routerLink={'/pengantri/cari/' + props.kode}>
        <IonCardHeader className="ion-no-padding ion-padding-vertical">
          <IonItem lines="none">
            <IonAvatar>
              <img src="/assets/img/location-outline.svg" />&nbsp;
            </IonAvatar>
            <IonLabel>
              <h3>{props.nama}</h3>
              <p>@{props.kode}</p>
            </IonLabel>
            <div slot="end" className="ion-text-right ion-justify-content-right custom-review-text ion-hide">
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
            {props.deskripsi}
          </p>
          <p>
            <b>Alamat: </b>
            {props.alamat}
          </p>
          <p>
            <b>Wilayah: </b>
            {props.wilayah}
          </p>
          {props.layanans.length < 1 ? "" :
            <p>
              <b>Layanan: </b>
              {layanansNames}
            </p>
          }
        </IonCardContent>
      </IonCard>
    )
  }

  const TiadaHasil: React.FC = () => {
    return (
      <>
        <p className="ion-padding-horizontal">Tiada hasil untuk <b>"{searchText}"</b></p>
      </>
    )
  }

  async function goSearch() {
    setLastSearch(searchText)
    console.log('search: ' + searchText)
    let params = {
      searchText: searchText
    }
    dispatch(setIsSearching(true))
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
        <IonRefresher slot="fixed" onIonRefresh={(r) => {
          setSearchText('')
          setFilterExpanded(false)
          setTimeout(() => r.detail.complete(), 1)
          $('#search-bar').val('')
        }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonLoading isOpen={busy} />
        <IonRow className="ion-align-items-center">
          <IonCol>
            <IonSearchbar id="search-bar" onIonChange={(e: any) => { setSearchText(e.detail.value) }}
              placeholder='misal "bank" atau "tukar"'
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  $('input').blur()
                  goSearch()
                }
              }}
            />
          </IonCol>

          <div className="ion-margin-end">
            <IonButton onClick={() => goSearch()}><IonIcon icon={searchOutline} /></IonButton>
            <IonButton color="primary" fill={!filterExpanded ? "outline" : "solid"} className="ion-margin-vertical"
              onClick={() => setFilterExpanded(!filterExpanded)}
            ><IonIcon size="small" icon={funnelSharp} /></IonButton>
          </div>
        </IonRow>
        {filterExpanded ?
          <>
            <IonItem lines="none">
              <IonLabel>Wilayah:</IonLabel>
              <IonSelect onIonChange={(e) => setChosenWilayah(e.detail.value)} value={chosenWilayah} interface="alert">
                {kotaKabupaten.map(k => {
                  return (
                    <IonSelectOption key={k} value={k}>{k}</IonSelectOption>
                  )
                })}
              </IonSelect>
            </IonItem>
            <IonItemDivider className="custom-divider" />
          </>
          : ""}

        {
          isSearchingLocal ? <div className="ion-padding">
            <IonSpinner /></div> :
            (Array.isArray(hasilSearchLocal) && hasilSearchLocal.length > 0 && searchText === lastSearch) ?
              hasilSearchLocal.map(gerai => {
                //console.log(gerai)
                return !filterExpanded ?
                  <CardSearch key={gerai.id} props={gerai} /> :
                  gerai.wilayah == chosenWilayah ?
                    <CardSearch key={gerai.id} props={gerai} /> : ''
              })
              : searchText === '' ?
                <div className="ion-padding ion-text-center">                  
                  Anda bisa mencari gerai berdasarkan nama gerai atau layanan yang ada di dalamnya. Misal "bank ngadirejo" atau "tukar uang"
              </div>
                : searchText === lastSearch ? <TiadaHasil /> : ""
        }
        <Link className="ion-hide" to="/pengantri/cari/geraibaru/priksamata" >shortcut</Link>
        <div className="custom-filler"></div></IonContent>
    </>
  )
}

export default CariPage