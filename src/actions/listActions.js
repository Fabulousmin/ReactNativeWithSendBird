import {
  INIT_USERLIST,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAIL,
} from './types';

import { sGetUserlist, sGetCurrentUserInfo } from '../subyeonActions';


export const initUserlist = () => {
  return ({
    type: INIT_USERLIST
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

export const getUserlist = () => {
  return (dispatch) => {
      sGetUserlist()
      .then((userlist)=> {
        getUserlistSuccess(dispatch, userlist);
      })
      .catch((error)=> {
        getUserlistFail(dispatch, error);
      })
  }
}
