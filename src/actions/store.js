import {
  INIT_HEART,
  GET_HEART_FAIL,
  GET_HEART_SUCCESS,
  UPDATE_HEART_SUCCESS,
  UPDATE_HEART_FAIL,
} from './types';
import { sGetHeart, sUpdateHeart } from '../subyeonActions';


export const initHeart = () => {
  return ({
    type: INIT_HEART
  })
}

export const getHeart = () => {
  return (dispatch) => {
    sGetHeart()
    .then((heart) => {getHeartSuccess(dispatch, heart)})
    .catch((error) => getHeartFail(dispatch, error))
  }
}

const getHeartSuccess = (dispatch, heart) => {
  dispatch({
    type: GET_HEART_SUCCESS,
    heart: heart
  })
}

const getHeartFail = (dispatch, error) => {
  dispatch({
    type: GET_HEART_FAIL,
    error: error
  })
}

export const updateHeart = (heart) => {
  return (dispatch) => {
    sUpdateHeart(heart)
    .then(() => updateHeartSuccess(dispatch))
    .catch((error) => updateHeartFail(dispatch, error))
  }
}

const updateHeartSuccess = (dispatch) => {
  dispatch({
    type: UPDATE_HEART_SUCCESS
  })
}
const updateHeartFail = (dispatch, error) => {
  dispatch({
    type: UPDATE_HEART_FAIL,
    error: error
  })
}
