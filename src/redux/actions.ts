export const setUserState = (payload: any) => {
  return { type: 'SET_USER_STATE', payload}
}

export const unsetState = (payload: any) => {
  return { type: 'UNSET_STATE', payload}
}

export const setAntrians = (payload: any) => {
  return { type: 'SET_ANTRIANS', payload }
}

export const setRole = (payload: any) => {
  return { type: 'SET_ROLE', payload}
}

export const setTempMessage = (payload: any) => {
  return {type: 'SET_TEMP_MESSAGE', payload}
}