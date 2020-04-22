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
    isRegistered: false
  },
  geraisLoaded: false,
  gerais: new Array(0),
  geraiNeedsUpdate: false,
  layanansAreUpated: false,
  layanans: new Array(0),
  jadwal: ["", "", "", "", "", "", ""],
  addLayananIsComplete: false,
  setLayananIsComplete: false,
  geraisWithLayanansLoaded: new Array(0)
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
      return {
        ...state,
        gerais: payload
      }
    case 'SET_LOCAL_TOKEN':
      return {
        ...state,
        tokenLastUpdated: payload.updated,
        token: payload.token
      }

    case 'ADD_GERAI':
      return {
        ...state,
        gerais: state.gerais.concat(payload),
        geraiNeedsUpdate: true
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
      if(state.geraisWithLayanansLoaded.includes(payload.kode)){
        
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
      return {
        ...state,
        addLayananIsComplete: payload
      }
    case 'SET_LAYANAN_IS_COMPLETE':
      return {
        ...state,
        setLayananIsComplete: payload
      }
  }
}