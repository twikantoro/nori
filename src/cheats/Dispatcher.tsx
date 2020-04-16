import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

interface OwnProps {
  dispatched: any
}

const Dispatcher : React.FC<OwnProps> = (dispatched: any) => {
  const [isDispatched, setDispatched] = useState(false)
  const dispatch = useDispatch()
  dispatch(dispatched)
  setDispatched(true)
  return (
    <></>
  )
}

export default Dispatcher