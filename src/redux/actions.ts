import Axios from "axios"
import queryString from "query-string"
import apiSite from "../config/apiSite"

export const setUserState = (payload: any) => {
  return { type: 'SET_USER_STATE', payload }
}

export const unsetState = (payload: any) => {
  return { type: 'UNSET_STATE', payload }
}

export const setAntrians = (payload: any) => {
  return { type: 'SET_ANTRIANS', payload }
}

export const setRole = (payload: any) => {
  return { type: 'SET_ROLE', payload }
}

export const setTempMessage = (payload: any) => {
  return { type: 'SET_TEMP_MESSAGE', payload }
}

export const setPemilikData = (payload: any) => {
  return { type: 'SET_PEMILIK_DATA', payload }
}

export const geraiNeedsUpdate = (payload: any) => {
  return { type: 'GERAI_NEEDS_UPDATE', payload }
}

export const geraisLoaded = (payload: any) => {
  return { type: 'GERAIS_LOADED', payload }
}

export const setGerais = (payload: any) => {
  return { type: 'SET_GERAIS', payload }
}

export const setLocalToken = (payload: any) => {
  return { type: 'SET_LOCAL_TOKEN', payload }
}

export const newState = (payload: any) => {
  return { type: 'NEW_STATE', payload }
}

export const addGerai = (payload: any) => {
  return { type: 'ADD_GERAI', payload }
}

export const createGeraiAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/gerai/create?" + queryString.stringify(payload)).then(response => {
      delete payload.token
      delete payload.id_pemilik
      dispatch(addGerai(payload))
    }).catch(error => {
      console.log(error)
    }).then(() => {

    })
  }
}

export const removeGerai = (payload: any) => {
  return { type: 'REMOVE_GERAI', payload }
}

export const hapusGeraiAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite+"/gerai/deletebykode?"+queryString.stringify(payload)).then(response => {
      dispatch(removeGerai(payload))
    })
  }
}