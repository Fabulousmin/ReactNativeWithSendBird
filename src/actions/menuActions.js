import {
    INIT_MENU,
    DISCONNECT_SUCCESS
} from './types';
import { sbDisconnect } from '../sendbirdActions';

import firebase from '@firebase/app'

export const initMenu = () => {
    return { type: INIT_MENU };
}

export const sendbirdLogout = () => {
    return (dispatch) => {
        sbDisconnect()
        .then( () => dispatch({ type: DISCONNECT_SUCCESS }) );
    }
}

export const fbLogOut = () => {
  return (dispatch) => {
      firebase.auth().signOut();
    }
  }
