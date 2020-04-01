import React from 'react'
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { homeOutline, peopleOutline, fileTrayFullOutline, personOutline } from 'ionicons/icons'

const PemilikTabBar: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="gerai" href="/pemilik/gerai">
        <IonIcon icon={homeOutline} />
        <IonLabel>Gerai</IonLabel>
      </IonTabButton>
      <IonTabButton tab="layanan" href="/pemilik/layanan">
        <IonIcon icon={fileTrayFullOutline} />
        <IonLabel>Layanan</IonLabel>
      </IonTabButton>
      <IonTabButton tab="staf" href="/pemilik/staf">
        <IonIcon icon={peopleOutline} />
        <IonLabel>Staf</IonLabel>
      </IonTabButton>
      <IonTabButton tab="akun" href="/pemilik/akun">
        <IonIcon icon={personOutline} />
        <IonLabel>Akun</IonLabel>
      </IonTabButton>
    </IonTabBar>
  )
}

export default PemilikTabBar