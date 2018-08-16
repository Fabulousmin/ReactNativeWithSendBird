import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAIL,
} from './types';




const getProfileSuccess = (dispatch, userInfo) => {
  dispatch({
    type:GET_PROFILE_SUCCESS,
    userInfo: userInfo
  })
}

const getProfileFail = (dispatch, error) => {
  dispatch({
    type:GET_PROFILE_FAIL,
    error:error
  })
}

const getUserlistSuccess = (dispatch, userlist) => {
  dispatch({
    type:GET_USERLIST_SUCCESS,
    userlist: userlist
  })
}

const getUserlistFail = (dispatch, error) => {
  dispatch({
    type:GET_USERLIST_FAIL,
    error: error
  })
}
