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

export const fbProfileUpdate = ({ profileImgData, nickname, selfIntro, age, sex, city, number}) =>{
 return (dispatch) => {
   const database = firebase.database();
   const uid = firebase.auth().currentUser.uid;
   fbImageUpload( profileImgData )
   .then(() => {
     fbGetProfileImgUrl(uid)
     .then((profileUrl)=> {
       const userInfo = {
        uid,
        profileUrl,
        nickname,
        selfIntro,
        age,
        sex,
        city,
        number,
       };
       database.ref('users/'+ uid).set(userInfo)
       .then(() => {
       fbSuccessGetUserInfo(dispatch, userInfo);
       console.log('user info updated');
       })
       .catch(error => {
       console.log('fail to update userinfo' + error);
       updateFail(dispatch, error);})
     })
    .catch((error) => {console.log(error + 'fail to get profileUrl')}); })
  .catch(() => {
      console.log('fail to upload image');
      updateFail(dispatch, error);
  })
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
    .catch( () => {
      const error = 'fail to load profile'
      fbFailGetUserInfo(dispatch, error);
      }
    )
  }
  else {
      const error = 'fail to get userinfo';
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

const fbImageUpload = (profileImgData) => {
  return new Promise ((resolve, reject) => {
    const uid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref();
    const profileImagesRef = storageRef.child ( 'users/'+ uid +'/images/profileImg.jpg');
    const metadata = {
      contentType: 'image/jpeg'
    }
    const message = profileImgData;
    profileImagesRef.putString(message, 'base64', metadata)
    .then( snapshot => {
      console.log('Uploaded a base64url string!');
      resolve();
    })
    .catch( error => {
      console.log(err);
      reject();
    });
  })
}


const fbGetProfileImgUrl = ( uid ) => {
  return new Promise ((resolve, reject) => {
    const storage = firebase.storage();
    const storageRef = storage.ref( 'users/'+ uid+'/' );
    const profileRef = storageRef.child('images/profileImg.jpg');
    profileRef.getDownloadURL()
    .then(url => {
      console.log('get url success url:' + url);
      resolve(url);
    })
    .catch(err => {
      console.log('fail to get url' + err );
      reject();
    });
  })
}
