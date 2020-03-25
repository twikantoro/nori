import React from 'react'
import { IonPage, IonTabBar, IonRouterOutlet } from '@ionic/react'
import PengantriTabBar from './PengantriTabBar'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import PengantriTabs from './PengantriTabBar'

const Tabs: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path='/pengantri/' component={PengantriTabs} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Tabs