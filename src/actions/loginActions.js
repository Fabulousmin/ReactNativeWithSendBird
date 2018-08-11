import {
    INIT_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';
import { sbConnect } from '../sendbirdActions';
import firebase from 'firebase';

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
        console.log('user created');
        firebase.auth().signInWithEmailAndPassword(userId, password)
        .then(() => {
        console.log('user loggedIn');
        fbInitUserInfo();
        sbConnect(userId)
        .then( (user) => loginSuccess(dispatch, user) )
        .catch( (error) => loginFail(dispatch, error) );} )

        .catch((error) => loginFail(dispatch, error.message) );
      })
        .catch((error) => loginFail(dispatch, error.message) );
      });
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
    const userInfo = {
    profileUrl: '',
    nickname: '',
    selfIntro: '',
    sex: '',
    city: '',
    number: ''
  };
  const uid = firebase.auth().currentUser.uid;
  if(uid) {
    database.ref('users/'+ uid).set(userInfo)
    .then(() => console.log('success init userInfo'))
    .catch(() => console.log('fail init userInfo'))
  }
  else{
    console.log('cannot resolve uid from firebase server')
  }
}
