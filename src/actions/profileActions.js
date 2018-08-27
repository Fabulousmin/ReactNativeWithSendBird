import {
    INIT_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

} from './types';
import { sbGetCurrentInfo, sbUpdateProfile } from '../sendbirdActions';
import { sUpdateProfile, sUploadImage, sGetCurrentUserInfo } from '../subyeonActions';

import firebase from '@firebase/app'

export const initProfile = () => {
    return { type: INIT_PROFILE }
}


export const getCurrentUserInfo = () => {
  return (dispatch) => {
  sGetCurrentUserInfo()
  .then((userInfo) => getProfileSuccess(dispatch, userInfo))
  .catch((error) => getProfileFail(dispatch, error))
  }
}

const getProfileSuccess = (dispatch ,userInfo) => {
  dispatch({
      type: GET_PROFILE_SUCCESS,
      userInfo: userInfo,
  })
}

const getProfileFail = (dispatch, error) => {
  dispatch({
      type: GET_PROFILE_FAIL,
      error: error,
  })
}

export const updateProfile = ( userInfo ) => {
    return (dispatch) => {
        const { profileUrl } = userInfo;
        const { currentUser } = firebase.auth();
        sUploadImage(profileUrl)
        .then((downloadURL) =>{
          sUpdateProfile({...userInfo, profileUrl: downloadURL, uid: currentUser.uid})
          .then((res) => {console.log('update ok');updateSuccess(dispatch, res)})
          .catch((error) =>  {console.log(error);updateFail(dispatch, error)})
        })
        .catch((error)=> updateFail(dispatch, error))
    }
}

const updateFail = (dispatch, error) => {
    dispatch({
        type: UPDATE_PROFILE_FAIL,
        error: error
    });
}

const updateSuccess = (dispatch, userInfo) => {
    dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        userInfo: userInfo
    });
}
