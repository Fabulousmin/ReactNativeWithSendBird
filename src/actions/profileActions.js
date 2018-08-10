import {
    INIT_PROFILE,
    GET_PROFILE_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    //fb
    FAIL_GET_USERINFO,
    SUCCESS_GET_USERINFO,
} from './types';
import { sbGetCurrentInfo, sbUpdateProfile } from '../sendbirdActions';
import firebase from 'firebase';

export const initProfile = () => {
    return { type: INIT_PROFILE }
}

export const getCurrentUserInfo = () => {
    return {
        type: GET_PROFILE_SUCCESS,
        userInfo: sbGetCurrentInfo()
    }
}

export const updateProfile = (nickname) => {
    return (dispatch) => {
        sbUpdateProfile(nickname)
        .then((user) => updateSuccess(dispatch, user))
        .catch((error) => updateFail(dispatch, error))
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

export const fbProfileUpdate = ({ profileUrl, nickname, selfIntro, sex, city, number}) =>{
 return (dispatch) => {
   const database = firebase.database();
   const userInfo = {
    profileUrl: profileUrl,
    nickname: nickname,
    selfIntro: selfIntro,
    sex: sex,
    city: city,
    number: number
   };
   const uid = firebase.auth().currentUser.uid;
   if(uid){
     database.ref('users/'+ uid).set(userInfo)
    .then(() => {
    console.log('user info updated');
    }
  )
    .catch(error => {
    console.log('fail to get userinfo');
    updateFail(dispatch, error);})
  }
  else {
    console.log('fail to get uid');
    updateFail(dispatch, error);
  }
}
}

export const fbGetCurrentUserInfo = (dispatch) => {
  return (dispatch) => {
    const database = firebase.database();
    const uid = firebase.auth().currentUser.uid;
    if(uid){
      database.ref('users/' + uid).once('value')
    .then( snapshot => {
      const userInfo = snapshot.val();
      fbSuccessGetUserInfo(dispatch, userInfo);
      }
    )
    .catch( error => {
      fbFailGetUserInfo(dispatch, error);
      }
    )
  }
  else {
      const error = {message:'fail to get userinfo'};
      fbFailGetUserInfo(dispatch, error);
  }
  }
}


const fbSuccessGetUserInfo = (dispatch, userInfo) => {
  dispatch({
    type: SUCCESS_GET_USERINFO,
    payload: userInfo
  })
}

const fbFailGetUserInfo = (dispatch, error) => {
  dispatch({
    type: FAIL_GET_USERINFO,
    payload: error.message
  })
}
