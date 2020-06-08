const initialGerais = {
  layanans: new Array(0),
  klasters: new Array(0)
}

const initialState = {
  antrians: [
    {
      id: 1234,
      gerai: "Bank Ngadirejo",
      subLayanan: "Tukar Uang",
      prefix: "A",
      slot: 117,
      current: 67,
      perkiraan: "12:34",
      status: 'berlangsung'
    }, {
      id: 1235,
      gerai: "Bank Masahan",
      subLayanan: "Tukar Uang",
      prefix: "A",
      slot: 222,
      current: 12,
      perkiraan: "Besok pukul 14:30",
      status: 'terlambat'
    }, {
      id: 1236,
      gerai: "Bank Ngadirejo",
      subLayanan: "Tukar Uang",
      prefix: "A",
      slot: 117,
      current: 67,
      perkiraan: "12:34",
      status: 'dipesan'
    }
  ],
  pemilik: {
    isRegistered: false,
    gerais: initialGerais
  },
  geraisLoaded: false,
  gerais: new Array(0),
  geraiNeedsUpdate: false,
  layanansAreUpated: false,
  layanans: new Array(0),
  jadwal: ["", "", "", "", "", "", ""],
  addLayananIsComplete: false,
  setLayananIsComplete: false,
  geraisWithLayanansLoaded: new Array(0),
  addKlasterIsComplete: false,
  pemilikBelongingsUpToDate: false,
  fetchingPemilikBelongings: false,
  chosenGeraiKode: '',
  error: '',
  backURLs: new Array(0),
  isSearching: false,
  pengantri: {
    id: ''
  },
  pengguna: {
    uid: ''
  },
  tabRefresh: 'antrian',
  sacredPath: {
    antrian: '',
    riwayat: '',
    cari: '',
    notifikasi: '',
    akun: ''
  },
  pathHistory: {
    antrian: '',
    riwayat: '',
    cari: '',
    notifikasi: '',
    akun: ''
  },
  isFetching: false,
  sedangPesan: false,
  pesanans: new Array(0),
  klasterRelateds: new Array(0),
  isDeleting: false,
  isFetchingUser: false
}

export default function reducer(state = initialState,
  { type, payload }: { type: string, payload: any }): any {
  //work with state
  switch (type) {
    case 'SET_TEMP_MESSAGE':
      return {
        ...state,
        temp_message: payload
      }
    case 'SET_USER_STATE':
      return {
        ...state,
        user: {
          username: payload.split('@')[0]
        }
      }
    case 'UNSET_STATE':
      console.log('cekstate', state)
      return {
        state: []
      }
    case 'SET_ANTRIANS':
      return {
        ...state,
        antrians: payload
      }
    case 'SET_ROLE':
      return {
        ...state,
        role: payload
      }
    case 'SET_PEMILIK_DATA':
      return {
        ...state,
        pemilik: payload
      }
    case 'GERAI_NEEDS_UPDATE':
      return {
        ...state,
        geraiNeedsUpdate: payload
      }
    case 'GERAIS_LOADED':
      return {
        ...state,
        geraisLoaded: payload
      }
    case 'SET_GERAIS':
      var newPemilik = state.pemilik
      newPemilik.gerais = payload
      return {
        ...state,
        pemilik: newPemilik
      }
    case 'SET_LOCAL_TOKEN':
      return {
        ...state,
        tokenLastUpdated: payload.updated,
        token: payload.token
      }

    case 'ADD_GERAI':
      var newGerai = state.gerais
      newGerai[payload.kode] = payload
      return {
        ...state,
        gerais: newGerai,
        isFetching: false
      }

    case 'REMOVE_GERAI':
      var newGerais = new Array
      var i = 0
      state.gerais.forEach(oldGerai => {
        if (oldGerai.kode !== payload.kode) {
          newGerais[i] = oldGerai
        }
        i++
      })
      return {
        ...state,
        gerais: newGerais,
        geraiNeedsUpdate: true
      }
    case 'LAYANANS_ARE_UPDATED':
      return {
        ...state,
        layanansAreUpated: payload
      }
    case 'SET_LAYANANS':
      var temp = state.geraisWithLayanansLoaded
      if (state.geraisWithLayanansLoaded.includes(payload.kode)) {

      } else {
        temp.push(payload.kode)
      }
      return {
        ...state,
        layanans: payload.layanans,
        setLayananIsComplete: true,
        geraisWithLayanansLoaded: temp
      }
    case 'SET_JADWAL':
      var newJadwal = state.jadwal
      newJadwal[payload.hari] = payload.jadwal
      return {
        ...state,
        jadwal: newJadwal
      }
    case 'ADD_LAYANAN_IS_COMPLETE':
      var justInCase = payload ? false : state.pemilikBelongingsUpToDate
      return {
        ...state,
        addLayananIsComplete: payload,
        pemilikBelongingsUpToDate: justInCase
      }
    case 'SET_LAYANAN_IS_COMPLETE':
      return {
        ...state,
        setLayananIsComplete: payload
      }
    case 'ADD_KLASTER_IS_COMPLETE':
      var justInCase = payload ? false : state.pemilikBelongingsUpToDate
      return {
        ...state,
        addKlasterIsComplete: payload,
        pemilikBelongingsUpToDate: justInCase
      }
    case 'SET_KLASTER_BY_KODE':
      var newPemilik = state.pemilik
      return {
        ...state,
        pemilik: newPemilik
      }
    case 'SET_PEMILIK_BELONGINGS':
      var newPemilik = state.pemilik
      newPemilik = {
        ...newPemilik,
        ...payload
      }
      var chosenGerai = state.chosenGeraiKode
      if (chosenGerai == '') {
        chosenGerai = Array.isArray(payload.gerais) ? payload.gerais[0].kode : ""
      }
      return {
        ...state,
        pemilik: newPemilik,
        pemilikBelongingsUpToDate: true,
        fetchingPemilikBelongings: false,
        chosenGeraiKode: chosenGerai
      }
    case 'SET_FETCHING_PEMILIK_BELONGINGS':
      return {
        ...state,
        fetchingPemilikBelongings: payload
      }
    case 'SET_CHOSEN_GERAI':
      console.log("state.chosengeraikode: " + payload)
      return {
        ...state,
        chosenGeraiKode: payload
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: payload
      }
    case 'ADD_BACK_URL':
      var currBackUrl = state.backURLs
      var newBackUrl = {
        payload,
        ...currBackUrl
      }
      return {
        ...state,
        backURLs: newBackUrl
      }
    case 'DEL_BACK_URL':
      var currBackUrl = state.backURLs
      currBackUrl.shift()
      return {
        ...state,
        backURLs: currBackUrl
      }
    case 'SET_PEMILIK_UP_TO_DATE':
      return {
        ...state,
        pemilikBelongingsUpToDate: payload
      }
    case 'SET_IS_SEARCHING':
      return {
        ...state,
        isSearching: payload
      }
    case 'SET_HASIL_SEARCH':
      var newPayload = new Array(0)
      if (Array.isArray(payload)) {
        newPayload = payload
      }
      return {
        ...state,
        hasilSearch: newPayload,
        isSearching: false
      }
    case 'SET_PENGGUNA_DATA':
      return {
        ...state,
        pengguna: payload
      }
    case 'SET_TAB_REFRESH':
      return {
        ...state,
        tabRefresh: payload
      }
    case 'SET_SACRED_PATH':
      var newSacredPath = state.sacredPath
      if (payload.tab === 'antrian') {
        newSacredPath.antrian = payload.path
      } else if (payload.tab === 'riwayat') {
        newSacredPath.riwayat = payload.path
      } else if (payload.tab === 'cari') {
        newSacredPath.cari = payload.path
      } else if (payload.tab === 'notifikasi') {
        newSacredPath.notifikasi = payload.path
      } else if (payload.tab === 'akun') {
        newSacredPath.akun = payload.path
      }
      return {
        ...state,
        sacredPath: newSacredPath
      }
    case 'SMART_PATH_MANAGER':
      let tab = payload.split("/")[4]
      return {
        ...state,
        pathHistory: ''
      }
    case 'ADD_LAYANAN_CACHE':
      var newLayanans = state.layanans
      newLayanans[payload.identifier] = payload
      return {
        ...state,
        layanans: newLayanans,
        isFetching: false
      }
    case 'SET_IS_FETCHING':
      return {
        ...state,
        isFetching: payload
      }
    case 'SET_IS_DELETING':
      return {
        ...state,
        isDeleting: payload
      }
    case 'SET_PENGANTRI_DATA':
      return {
        ...state,
        isFetchingUser: false,
        pengantri: payload
      }
    case 'SEDANG_PESAN':
      return {
        ...state,
        sedangPesan: payload
      }
    case 'SET_PESANANS':
      return {
        ...state,
        pesanans: payload
      }
    case 'ADD_KLASTER_RELATED':
      var newKlasterRelateds = state.klasterRelateds
      newKlasterRelateds[payload.identifier] = payload
      return {
        ...state,
        klasterRelateds: newKlasterRelateds,
        isFetching: false
      }
    case 'SET_IS_FETCHING_USER':
      return {
        ...state,
        isFetchingUser: payload
      }
  }
}