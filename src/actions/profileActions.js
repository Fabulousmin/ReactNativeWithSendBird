import {
    INIT_PROFILE,
    GET_PROFILE_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

} from './types';
import { sbGetCurrentInfo, sbUpdateProfile } from '../sendbirdActions';
import { sUpdateProfile, sUploadImage } from '../subyeonActions';

const firebase = require('firebase');
export const initProfile = () => {
    return { type: INIT_PROFILE }
}

export const getCurrentUserInfo = () => {
    return {
        type: GET_PROFILE_SUCCESS,
        userInfo: sbGetCurrentInfo()
    }
}

export const updateProfile = ( userInfo ) => {
    return (dispatch) => {
        const { sex, age, nickname, city, number, profileUrl, selfIntro } = userInfo;
        sUploadImage(profileUrl, 'application/octet-stream')
        .then((downloadURL) => {
          sUpdateProfile({ ...userInfo , profileUrl: downloadURL })
          .then((userInfo) => updateSuccess(dispatch, userInfo))
          .catch((error) => updateFail(dispatch, error))
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

const updateSuccess = (dispatch, user) => {
    dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        userInfo: sbGetCurrentInfo()
    });
}
