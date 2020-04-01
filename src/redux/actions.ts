export const setUserState = (payload: any) => {
  return { type: 'SET_USER_STATE', payload}
}

export const unsetState = (payload: any) => {
  return { type: 'UNSET_STATE', payload}
}

export const setAntrians = (payload: any) => {
  return { type: 'SET_ANTRIANS', payload }
}

export const setRole = (payload: string) => {
  return { type: 'SET_ROLE', payload }
}