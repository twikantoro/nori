import { IonApp } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AkunPage from '../pages/Pemilik/Akun'
import GeraiPage from '../pages/Pemilik/Gerai'
import LayananPage from '../pages/Pemilik/Layanan'
import StafPage from '../pages/Pemilik/Staf'

const Pengantri: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/pemilik" render={() => <Redirect to="/pemilik/gerai" />} />
        <Route exact path="/pemilik/gerai" component={GeraiPage} />
        <Route exact path="/pemilik/layanan" component={LayananPage} />
        <Route exact path="/pemilik/staf" component={StafPage} />
        <Route exact path="/pemilik/akun" component={AkunPage} />
      </IonReactRouter>
    </IonApp>
  )
}

export default Pengantri