import {
    INIT_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';
import { sbConnect } from '../sendbirdActions';
import firebase from 'firebase';
import RNKakaoLogins from 'react-native-kakao-logins';
import axios from 'axios';

export const initLogin = () => {
    return { type: INIT_LOGIN };
}

export const sendbirdLogin = ({ userId, password }) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(userId, password)
        .then(user => {
          console.log(user);
          sbConnect(userId)
        .then((user) => loginSuccess(dispatch, user) )
        .catch((error) => loginFail(dispatch, error.message) );
      })
      .catch((error) => {
        console.log(error);
        firebase.auth().createUserWithEmailAndPassword(userId, password)
        .then( () => {
        fbInitUserInfo();
        console.log('user created');
        firebase.auth().signInWithEmailAndPassword(userId, password)
        .then(() => {
        console.log('user loggedIn');
        sbConnect(userId)
        .then( (user) => loginSuccess(dispatch, user) )
        .catch( (error) => loginFail(dispatch, error) );} )

        .catch((error) => loginFail(dispatch, error.message) );
      })
        .catch((error) => loginFail(dispatch, error.message) );
      });
    }
}



export const kakaoLogin = () => {
  return (dispatch) => {
  RNKakaoLogins.login((err, result) => {
      if (err){
        console.log(err);
        return;
      }
      const token = result.slice(8, 62);
      axios.post('http://13.125.213.67:8000/verifyToken', {
          token: token
      })
      .then(result => {
        console.log(result);
        const firebaseToken = result.data.firebase_token;
        firebase.auth().signInWithCustomToken(firebaseToken)
        .then( ({ user }) => {
          const userId = user.email;
          sbConnect(userId)
          .then((user) => loginSuccess(dispatch, user))
          .catch((error) => loginFail(dispatch, error.message));
        })
        .catch( error => {
            var errorCode = error.code;
          var errorMessage = error.message;
          console.log('error code:' + errorCode,'error message:' + errorMessage );
          loginFail(dispatch, error.message);
        });

      })
      .catch( error => {console.log(error);
        loginFail(dispatch, error.message);
      });
    })
  }
}


const loginFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_FAIL,
        payload: error
    });
}

const loginSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: user
    });
}

const fbInitUserInfo = () => {
    const database = firebase.database();
  const uid = firebase.auth().currentUser.uid;
  const userInfo = {
  uid: uid
};
  if(uid) {
    database.ref('users/'+ uid).set(userInfo)
    .then(() => console.log('success init userInfo'))
    .catch(() => console.log('fail init userInfo'))
  }
  else{
    console.log('cannot resolve uid from firebase server')
  }
}
