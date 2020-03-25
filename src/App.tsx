import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import pengantriTabBar from './components/PengantriTabBar'
import Antrian from './pages/antrianPage'
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
import antrianPage from './pages/antrianPage';
import Tabs from './components/Tabs';
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/actions';
import { getCurrentUser } from './config/firebaseConfig'

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/signup" component={Signup} exact={true} />
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
        window.history.replaceState({}, '', '/pengantri')
      } else {
        window.history.replaceState({}, '', '/')
      }
      setBusy(false)
    })
  }, [])

  return <IonApp>{busy ? <IonSpinner /> : <RoutingSystem />}</IonApp>


};

export default App;
