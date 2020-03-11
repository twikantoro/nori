import React from 'react'
import { IonPage, IonTabBar } from '@ionic/react'
import PengantriTabBar from './PengantriTabBar'

const Tabs: React.FC<() => {}> = () => {
  let shit = 'pengantri'
  switch (shit) {
    case 'pengantri':
      return (<PengantriTabBar />)
      break;
  
    default:
      break;
  }
}

export default Tabs