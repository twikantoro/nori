import React, { useState, useEffect } from 'react'

const TimeDisplay: React.FC = () => {
  const [time, setTime] = useState('')
  const [initiated, setInitiated] = useState(false)

  useEffect(() => {
    if (!initiated) {
      setInitiated(true)
      initTimer()
    }
  })

  function initTimer() {
    setInterval(() => {
      let date = new Date()
      let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      setTime(hour + ':' + minute + ':' + second)
    }, 1000)
  }

  return (
    <>{time}</>
  )
}

export default TimeDisplay