import React from 'react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
//import antrianPage from '../pages/antrianPage'
import Tabs from './Tabs'
import { IonPage } from '@ionic/react'
import { useSelector } from 'react-redux'

const Pengantri: React.FC = () => {
  return (
    <IonReactRouter>
      <Route exact path="/pengantri" render={() => <Redirect to="/pengantri/antrian" />} />
      <Route exact path="/pengantri/antrian" component={AntrianPage} />
      <Route path="/pengantri" component ={Tabs} />
    </IonReactRouter>
  )
}

const AntrianPage: React.FC = () => {
  const username = useSelector((state:any) => state.user.username)
  return (
    <IonPage>
      <p>Hello {username}</p>
    </IonPage>
  )
}

export default Pengantri