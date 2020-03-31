import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent, IonSpinner, IonPage, IonLoading, IonGrid, IonRow, IonAlert } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout'
import Pengantri from './components/Pengantri'
import Pemilik from './components/Pemilik'

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
import './App.css';
import { useDispatch, connect, useSelector } from 'react-redux';
import { setUserState } from './redux/actions';
import { getCurrentUser, isPemilik, isStaf } from './config/firebaseConfig'

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/pengantri" component={Pengantri} />
        <Route exact path="/" render={() => <Redirect to="/pengantri" />} />
      </IonRouterOutlet>

    </IonReactRouter>
  )
}

const App: React.FC = () => {
  const [busy, setBusy] = useState(true)
  const [amiPemilik, setAmiPemilik] = useState(false)
  const [amiStaf, setAmiStaf] = useState(false)
  const [role, setRole] = useState('pengantri')
  const dispatch = useDispatch()

  // isPemilik(function (result: any) {
  //   setAmiPemilik(result)
  // })
  // isStaf(function (result: any) {
  //   setAmiStaf(result)
  // })

  useEffect(() => {
    getCurrentUser().then((user: any) => {
      if (user) {
        //console.log(user)
        dispatch(setUserState(user.email))
        if (/*amiPemilik || amiStaf*/ false) {
          window.history.replaceState({}, '', '/chooseRole')
        } else {
          setRole('pengantri')
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
  return <IonApp>{busy ? <IonPage><IonContent><IonGrid><IonRow className="ion-justify-content-center ion-align-items-end height-50-percent"><IonSpinner name="dots" /></IonRow><IonRow></IonRow></IonGrid></IonContent></IonPage> : <RoutingSystem />}</IonApp>
};

export default connect()(App);
