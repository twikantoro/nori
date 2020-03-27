import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent, IonSpinner, IonPage, IonLoading, IonGrid, IonRow } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout'
import Pengantri from './components/Pengantri'

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
import { useDispatch, connect } from 'react-redux';
import { setUserState } from './redux/actions';
import { getCurrentUser, logoutUser } from './config/firebaseConfig'

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" render={() => <Redirect to="/pengantri" />} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/signup" component={Signup} exact={true} />
        <Route path="/logout" component={Logout} />
        <Route path="/pengantri" component={Pengantri} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () => {
  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser().then((user: any) => {
      console.log(user)
      if (user) {
        dispatch(setUserState(user.email))
        //        window.history.replaceState({}, '', '/')
      } else {
        window.history.replaceState({}, '', '/login')
      }
      setBusy(false)
    })
  }, [])

  return <IonApp>{busy ? <IonPage><IonContent><IonGrid><IonRow className="ion-justify-content-center ion-align-items-end height-50-percent"><IonSpinner name="dots" /></IonRow><IonRow></IonRow></IonGrid></IonContent></IonPage> : <RoutingSystem />}</IonApp>


};

export default connect()(App);
