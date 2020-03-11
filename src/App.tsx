import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import pengantriTabBar from './components/PengantriTabBar'
import Antrian from './pages/antrianPage'
import Tabs from './components/Tabs'

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
import antrianPage from './pages/antrianPage';

const App: React.FC = () => (
  <IonApp className=''>
    <IonContent>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={Login} exact={true} />
          <Route path="/pengantri" component={antrianPage} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/pengantri" />} />
        </IonRouterOutlet>
      </IonReactRouter>
      <Tabs />
    </IonContent>
  </IonApp>
);

export default App;
