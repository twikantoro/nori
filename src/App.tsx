import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import './App.css';
import { getCurrentUser } from './config/firebaseConfig';
import BusyPage from './pages/Busy';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { setRole, setUserState } from './redux/actions';
import Pemilik from './tabs/Pemilik';
import Pengantri from './tabs/Pengantri';
import Staf from './tabs/Staf';
import './theme/facebook.css';
import './theme/google.css';
/* Theme variables */
import './theme/variables.css';

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/pengantri" component={Pengantri} />
        <Route exact path="/pemilik" component={Pemilik} />
        <Route exact path="/staf" component={Staf} />
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
  const [fcmInitiated, setFcmInitiated] = useState(false)

  // isPemilik(function (result: any) {
  //   setAmiPemilik(result)
  // })
  // isStaf(function (result: any) {
  //   setAmiStaf(result)
  // })

  useEffect(() => {
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
    //firebase cloud messaging
    // if (!fcmInitiated) {
    //   setFcmInitiated(true)
    //   initFcm()
    // }
  }, [])

  /*
  function initFcm() {
    //init
    fcmTokenUpdater()
    //listen
    fcmListener()
  }

  function fcmTokenUpdater() {
    messaging.getToken().then((currToken: any) => {
      console.log("messaging token", currToken)
    }).catch(e => {
      console.log("error fcm gettoken", e)
    })
  }

  function fcmListener() {
    console.log("fcm listener initiated")
    messaging.onTokenRefresh(() => {
      fcmTokenUpdater()
    })
    messaging.onMessage((message) => {
      console.log("got message:", message)
    })
  }
  */

  return <IonApp>{busy ? <BusyPage /> : <RoutingSystem />}</IonApp>
};

export default connect()(App);
