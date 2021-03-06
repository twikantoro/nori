import Axios from "axios"
import queryString from "query-string"
import apiSite from "../config/apiSite"
import { stringify } from "querystring"
import { toast } from "../components/toast"

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

export const createGeraiAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/gerai/create?" + queryString.stringify(payload)).then(response => {
      console.log("createGera?", response.data)
      delete payload.token
      delete payload.id_pemilik
      dispatch(editGeraiResponse({
        responded: true,
        message: response.data
      }))
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
      dispatch(setPemilikBelongingsUpToDate(false))
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
      dispatch(editGeraiResponse({
        responded: true,
        message: response.data
      }))
    }).catch(e => {
      dispatch(editGeraiResponse({
        responded: true,
        message: e
      }))
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

export const addKlasterIsComplete = (payload: any) => {
  return { type: 'ADD_KLASTER_IS_COMPLETE', payload }
}

export const addKlasterAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/klaster/create?" + stringify(payload)).then(respone => {
      console.log("addKlaster? " + respone.data)
      dispatch(addKlasterIsComplete(true))
    })
  }
}

export const fetchKlasterByKodeAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/klaster/fetchByKode" + stringify(payload)).then(response => {
      var newPayload = {
        kode: payload.kode,
        klasters: new Array(0)
      }
      if (Array.isArray(response.data) && response.data.length > 0) {
        newPayload.klasters = response.data
        dispatch(setKlasterByKode(newPayload))
      } else {
        dispatch(setKlasterByKode(newPayload))
      }
    })
  }
}

export const setKlasterByKode = (payload: any) => {
  return { type: 'SET_KLASTER_BY_KODE', payload }
}

export const setPemilikBelongings = (payload: any) => {
  return { type: 'SET_PEMILIK_BELONGINGS', payload }
}

export const fetchPemilikBelongingsAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/pemilik/getAllBelongings?" + stringify(payload)).then(response => {
      console.log("belongings?", response.data)
      dispatch(setPemilikBelongings(response.data))
    })
  }
}

export const setFetchingPemilikBelongings = (payload: any) => {
  return { type: 'SET_FETCHING_PEMILIK_BELONGINGS', payload }
}

export const setChosenGerai = (payload: any) => {
  return { type: 'SET_CHOSEN_GERAI', payload }
}

export const setError = (payload: any) => {
  return { type: 'SET_ERROR', payload }
}

export const addBackURL = (payload: any) => {
  return { type: 'ADD_BACK_URL', payload }
}

export const delBackURL = (payload: any) => {
  return { type: 'DEL_BACK_URL', payload }
}

export const setPemilikBelongingsUpToDate = (payload: any) => {
  return { type: 'SET_PEMILIK_UP_TO_DATE', payload }
}

export const editGeraiAsync = (payload: any) => {
  console.log("params:", payload)
  return (dispatch: any) => {
    Axios.get(apiSite + "/gerai/edit?" + stringify(payload)).then(response => {
      console.log(response.data)
      dispatch(editGeraiResponse({
        responded: true,
        message: response.data
      }))
    })
  }
}

export const editGeraiResponse = (payload: any) => {
  return { type: 'EDIT_GERAI_RESPONSE', payload }
}

export const editKlasterAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/klaster/edit?" + stringify(payload)).then(response => {
      console.log("editklaster?: " + response.data)
      dispatch(setPemilikBelongingsUpToDate(false))
    })
  }
}

export const hapusKlasterAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/klaster/hapus?" + stringify(payload)).then(response => {
      console.log("hapusklaster?: " + response.data)
      dispatch(setPemilikBelongingsUpToDate(false))
    })
  }
}

export const editLayananAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/layanan/edit?" + stringify(payload)).then(response => {
      console.log("editlayanan?: " + response.data)
      dispatch(editGeraiResponse({ responded: true, message: response.data }))
  })
}
}

export const hapusLayananAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/layanan/hapus?" + stringify(payload)).then(response => {
      console.log("hapuslayanan?: " + response.data)
      dispatch(setPemilikBelongingsUpToDate(false))
    })
  }
}

export const deaktivasiLayananAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/layanan/deaktivasi?" + stringify(payload)).then(response => {
      console.log("deaktivasilayanan?: " + response.data)
      dispatch(setPemilikBelongingsUpToDate(false))
    })
  }
}

export const aktivasiLayananAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/layanan/aktivasi?" + stringify(payload)).then(response => {
      console.log("aktivasilayanan?: " + response.data)
      dispatch(setPemilikBelongingsUpToDate(false))
    })
  }
}

export const searchGeraiOrLayanan = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/layanan/searchRefined?" + stringify(payload)).then(response => {
      console.log("searchGeraiOrLayanan?: ", response.data)
      dispatch(setHasilSearch(response.data))
    })
  }
}

export const setHasilSearch = (payload: any) => {
  return { type: 'SET_HASIL_SEARCH', payload }
}

export const setIsSearching = (payload: any) => {
  return { type: 'SET_IS_SEARCHING', payload }
}

export const getGeraiAsyncPublic = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + "/gerai/" + payload).then(response => {
      console.log("gerGerai?", response.data)
      dispatch(addGerai(response.data))
    })
  }
}

export const addGerai = (payload: any) => {
  return { type: 'ADD_GERAI', payload }
}

export const setPenggunaData = (payload: any) => {
  return { type: 'SET_PENGGUNA_DATA', payload }
}

export const setTabRefresh = (payload: any) => {
  return { type: 'SET_TAB_REFRESH', payload }
}

export const getLayananForOrderAsyncPublic = (payload: any) => {
  return (dispatch: any) => {
    //please write
  }
}

export const getLayananData = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/layanan/getLayananData?' + stringify(payload)).then(response => {
      console.log("layananData?", response.data)
      var data = {
        ...response.data,
        identifier: payload.geraiKode + "-" + payload.layananKode
      }
      dispatch(addLayananCache(data))
    })
  }
}

export const addLayananCache = (payload: any) => {
  return { type: 'ADD_LAYANAN_CACHE', payload }
}

export const setIsFetching = (payload: any) => {
  return { type: 'SET_IS_FETCHING', payload }
}

export const setSacredPath = (payload: any) => {
  return { type: 'SET_SACRED_PATH', payload }
}

export const smartPathManager = (payload: any) => {
  return { type: 'SMART_PATH_MANAGER', payload }
}

export const pesanAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/pesanan/pesan?' + stringify(payload)).then(response => {
      console.log("pesan?", response.data)
      dispatch(sedangPesan(false))
    })
  }
}

export const sedangPesan = (payload: any) => {
  return { type: 'SEDANG_PESAN', payload }
}

export const getOrCreatePengantri = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/pengantri/getData?' + stringify(payload)).then(response => {
      //console.log("pengantriData?", response.data)
      dispatch(setPengantriData(response.data))
    })
  }
}

export const setPengantriData = (payload: any) => {
  return { type: 'SET_PENGANTRI_DATA', payload }
}

export const setPesanans = (payload: any) => {
  return { type: 'SET_PESANANS', payload }
}

export const setIsFetchingUser = (payload: any) => {
  return { type: 'SET_IS_FETCHING_USER', payload }
}

export const fetchKlasterRelateds = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/klaster/getRelatedData?' + stringify(payload)).then(response => {
      //console.log("klasterRelated?", response.data)
      var newPayload = {
        ...response.data,
        identifier: response.data.id
      }
      dispatch(addKlasterRelateds(newPayload))
    })
  }
}

export const addKlasterRelateds = (payload: any) => {
  return { type: 'ADD_KLASTER_RELATED', payload }
}

export const batalPesanAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/pesanan/batal?' + stringify(payload)).then(response => {
      console.log("batal?", response.data)
      dispatch(setIsDeleting(false))
    })
  }
}

export const setIsDeleting = (payload: any) => {
  return { type: 'SET_IS_DELETING', payload }
}

export const fetchStafAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/staf/getOrCreate?' + stringify(payload)).then(response => {
      console.log("getstaf?", response.data)
      dispatch(setStafData(response.data))
    })
  }
}

export const setIsFetchingStaf = (payload: any) => {
  return { type: 'SET_IS_FETCHING_STAF', payload }
}

export const setStafData = (payload: any) => {
  return { type: 'SET_STAF_DATA', payload }
}

export const fetchStafs = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/staf/getByGerai?' + stringify(payload)).then(response => {
      console.log("getstafs?", response.data)
      let newPayload = {
        identifier: payload.id_gerai,
        stafs: response.data
      }
      dispatch(addStafsCache(newPayload))
    })
  }
}

export const addStafsCache = (payload: any) => {
  return { type: 'ADD_STAFS_CACHE', payload }
}

export const rekrutStafAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/staf/rekrut?' + stringify(payload)).then(response => {
      console.log("rekrut?", response.data)
      dispatch(rekrutSelesai(response.data))
    })
  }
}

export const rekrutSelesai = (payload: any) => {
  return { type: 'REKRUT_SELESAI', payload }
}

export const setIsFetching2 = (payload: any) => {
  return { type: 'SET_IS_FETCHING', payload }
}

export const setRekrutStatus = (payload: any) => {
  return { type: 'SET_REKRUT_STATUS', payload }
}

export const hapusStafAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/staf/hapus?' + stringify(payload)).then(response => {
      console.log("hapusStaf?", response.data)
      dispatch(rekrutSelesai(response.data))
    })
  }
}

export const fetchGeraiForStaf = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/staf/getWorkplaceData?' + stringify(payload)).then(response => {
      console.log("geraiForStaf?", response.data)
      dispatch(setGeraiForStaf(response.data))
    })
  }
}

export const setGeraiForStaf = (payload: any) => {
  return { type: 'SET_GERAI_FOR_STAF', payload }
}

export const setIsFetchingGerai = (payload: any) => {
  return { type: 'SET_IS_FETCHING_GERAI', payload }
}

export const bukaKLasterAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/pesanan/bukaKlaster?' + stringify(payload)).then(response => {
      console.log("bukaKlaster?", response.data)
      dispatch(setIsFetching(false))
    })
  }
}

export const pesananSelesai = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/pesanan/selesai?' + stringify(payload)).then(response => {
      console.log("selesai?", response.data)
      dispatch(setIsFetching(false))
    })
  }
}

export const pesananTunda = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/pesanan/tunda?' + stringify(payload)).then(response => {
      console.log("tunda?", response.data)
      dispatch(setIsFetching(false))
    })
  }
}

export const diLokasiAsync = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/pesanan/diLokasi?' + stringify(payload)).then(response => {
      console.log("diLokasi?", response.data)
      dispatch(setIsFetching(false))
    })
  }
}

export const clearBan = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/pengantri/clearBan?' + stringify(payload)).then(response => {
      console.log("clearBan?", response.data)
      dispatch(setBanned(false))
    })
  }
}

export const belumSelesai = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/pesanan/belumSelesai?' + stringify(payload)).then(response => {
      console.log("belumSelesai?", response.data)
      dispatch(setIsFetching(false))
    })
  }
}

export const confirmSelesai = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/pesanan/confirmSelesai?' + stringify(payload)).then(response => {
      console.log("confirmSelesai?", response.data)
      dispatch(setIsFetching(false))
    })
  }
}

export const setBanned = (payload: any) => {
  return { type: 'SET_BANNED', payload }
}

export const undurDiri = (payload: any) => {
  return (dispatch: any) => {
    Axios.get(apiSite + '/staf/undurDiri?' + stringify(payload)).then(response => {
      console.log("undurDiri?", response.data)
      dispatch(berhasilUndurDiri(payload))
    })
  }
}

export const berhasilUndurDiri = (payload: any) => {
  return { type: 'BERHASIL_UNDUR_DIRI', payload }
}