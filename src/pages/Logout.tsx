import React from 'react'
import { Redirect } from 'react-router'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../config/firebaseConfig'
import { unsetState } from '../redux/actions'

const Logout: React.FC = () => {
  const dispatch = useDispatch()
  console.log(unsetState([]))
  logoutUser()

  return (
    <Redirect to="/login"></Redirect>
  )
}

export default Logout