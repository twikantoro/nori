export default function reducer(state = [],
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
      state = []
      console.log('cekstate', state)
      return {
        state: []
      }
    case 'SET_ANTRIANS':
      return {
        ...state,
        antrians: payload
      }
  }
}