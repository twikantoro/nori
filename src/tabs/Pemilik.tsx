import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { businessOutline, personOutline } from 'ionicons/icons'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AkunTab from './pemilik/AkunTab'
import GeraiTab from './pemilik/GeraiTab'
import Logout from '../pages/Logout'

const Pemilik: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact from="/pemilik" to="/pemilik/gerai" />
        <Route path="/pemilik/gerai" render={() => <GeraiTab />} exact={true} />
        <Route path="/pemilik/akun" render={() => <AkunTab />} exact={true} />
        <Route path="/logout" render={() => <Logout />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" selectedTab="antrian">
        <IonTabButton tab="gerai" href="/pemilik/gerai" selected>
          <IonIcon icon={businessOutline} />
          <IonLabel>Gerai</IonLabel>
        </IonTabButton>
        <IonTabButton tab="akun" href="/pemilik/akun">
          <IonIcon icon={personOutline} />
          <IonLabel>Akun</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Pemilik