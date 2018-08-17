import {
  INIT_USERLIST,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAIL,
} from '../actions/types'

const INITIAL_STATE = {
  userlist: [],
  error: null,
}

export default ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
      case INIT_USERLIST:
        return { ...state, ...INITIAL_STATE };
      case GET_USERLIST_SUCCESS:
        return { ...state, userlist: action.userlist };
      case GET_USERLIST_FAIL:
        return { ...state, error: action.error };
      default:
        return state
    }
}
