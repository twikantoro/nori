import Axios from "axios"
import queryString from "query-string"
import apiSite from "../config/apiSite"
import { stringify } from "querystring"

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
    Axios.get(apiSite + "/gerai/deletebykode?" + queryString.stringify(payload)).then(response => {
      dispatch(removeGerai(payload))
    })
  }
}

export const setLayanans = (payload: any) => {
  return { type: 'SET_LAYANANS', payload }
}

export const fetchLayanansAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/layanan/getAllByKode?" + queryString.stringify(payload)).then(response => {
      var newPayload = {
        kode: payload.kode,
        layanans: response
      }
      dispatch(setLayanans(newPayload))
    })
  }
}

export const layanansAreUpdated = (payload: any) => {
  return { type: 'LAYANANS_ARE_UPDATED', payload }
}

export const loadLayanansAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/layanan/getAllByKode?" + queryString.stringify(payload)).then(response => {
      var newPayload = {
        kode: payload.kode,
        layanans: response
      }
      dispatch(setLayanans(newPayload))
    })
  }
}

export const loadingLayananIsCompleteGlobal = (payload: any) => {
  return { type: 'LOADING_LAYANAN_IS_COMPLETE', payload }
}

export const setJadwal = (payload: any) => {
  return { type: 'SET_JADWAL', payload }
}

export const addLayananIsComplete = (payload: any) => {
  return { type: 'ADD_LAYANAN_IS_COMPLETE', payload }
}

export const setLayananIsComplete = (payload: any) => {
  return { type: 'SET_LAYANAN_IS_COMPLETE', payload }
}

export const addLayananAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/layanan/create?" + stringify(payload)).then(response => {
      //console.log(payload)
      console.log("addLayanan?: " + response.data)
      dispatch(addLayananIsComplete(true))
    })
  }
}

export const fetchLayanansByKodeAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/layanan/getAllByKode?" + stringify(payload)).then(response => {
      console.log("fetchLayanan?: ", response.data)
      var payloadNew = {
        kode: payload.kode,
        layanans: new Array(0)
      }
      if (Array.isArray(response.data)) {
        payloadNew.layanans = response.data
        dispatch(setLayanans(payloadNew))
      } else {
        dispatch(setLayanans(payloadNew))
      }
    })
  }
}