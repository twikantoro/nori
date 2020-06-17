import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../config/firebaseConfig'
import { unsetState } from '../redux/actions'
import { IonLoading, IonContent } from '@ionic/react'
import firebaseConfig from '../config/firebaseConfig'

const Logout: React.FC = () => {
  const dispatch = useDispatch()
  const [busy,setBusy] = useState(true)
  firebaseConfig.auth().signOut().then(()=>{
    setBusy(false)
  })
  document.location.href = ""
  return (
    <IonContent>
      <p>Logging out...</p>
      <IonLoading isOpen={busy}></IonLoading>
    <div className="custom-filler"></div></IonContent>
  )
}

export default Logout