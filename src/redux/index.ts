const initialState = {
  antrians: [
    {
      id: 1234,
      gerai: "Bank Ngadirejo",
      subLayanan: "Tukar Uang",
      prefix: "A",
      slot: 117,
      current: 67,
      perkiraan: "12:34"
    },{
      id: 1235,
      gerai: "Bank Masahan",
      subLayanan: "Tukar Uang",
      prefix: "A",
      slot: 222,
      current: 12,
      perkiraan: "Besok pukul 14:30"
    },{
      id: 1236,
      gerai: "Bank Ngadirejo",
      subLayanan: "Tukar Uang",
      prefix: "A",
      slot: 117,
      current: 67,
      perkiraan: "12:34"
    }
  ]
}

export default function reducer(state = initialState,
  { type, payload }: { type: string, payload: any }): any {
  //work with state
  switch (type) {
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
      console.log('ROLE: '+payload)
      return {
        ...state,
        role: payload
      }
  }
}