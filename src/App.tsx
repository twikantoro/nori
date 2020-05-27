import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent, IonSpinner, IonPage, IonLoading, IonGrid, IonRow, IonAlert } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pengantri from './tabs/Pengantri'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/facebook.css'
import './theme/google.css'
import './App.css';
import { useDispatch, connect, useSelector } from 'react-redux';
import { setUserState, setRole } from './redux/actions';
import { getCurrentUser, isPemilik, isStaf } from './config/firebaseConfig'
import Pemilik from './tabs/Pemilik';
import BusyPage from './pages/Busy';
import ErrorPage from './pages/ErrorPage';

import socketIOClient from "socket.io-client";
import socketServer from './config/socketServer';

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/pengantri" component={Pengantri} />
        <Route exact path="/pemilik" component={Pemilik} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="/" render={() => <Redirect to="/pengantri" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () => {
  const [busy, setBusy] = useState(true)
  const [amiPemilik, setAmiPemilik] = useState(false)
  const [amiStaf, setAmiStaf] = useState(false)
  const dispatch = useDispatch()

  // isPemilik(function (result: any) {
  //   setAmiPemilik(result)
  // })
  // isStaf(function (result: any) {
  //   setAmiStaf(result)
  // })

  useEffect(() => {
    /*
    const socket = socketIOClient(socketServer);
    socket.on('connect', () => {
      console.log("socket", socket.id)
    })
    socket.on('hello', (data:any) => {
      console.log(data)
    })
    */
    getCurrentUser().then((user: any) => {
      if (user) {
        console.log(user)
        dispatch(setUserState(user.email))
        if (/*amiPemilik || amiStaf*/ false) {
          window.history.replaceState({}, '', '/chooseRole')
        } else if (window.location.href.includes('pengantri')) {
          dispatch(setRole('pengantri'))
          window.history.replaceState({}, '', '/pengantri')
        } else if (window.location.href.includes('pemilik')) {
          dispatch(setRole('pemilik'))
          window.history.replaceState({}, '', '/pemilik')
        } else if (window.location.href.includes('staf')) {
          dispatch(setRole('staf'))
          window.history.replaceState({}, '', '/staf')
        } else {
          dispatch(setRole('pengantri'))
          window.history.replaceState({}, '', '/pengantri')
        }
      } else {
        if (window.location.href.includes('signup')) {
          setRole('signup')
          // let it be
        } else {
          setRole('login')
          window.history.replaceState({}, '', '/login')
        }
      }
      setBusy(false)
    })
  }, [])
  return <IonApp>{busy ? <BusyPage /> : <RoutingSystem />}</IonApp>
};

export default connect()(App);
