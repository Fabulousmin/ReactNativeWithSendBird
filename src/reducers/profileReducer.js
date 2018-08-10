import {
    INIT_PROFILE,
    GET_PROFILE_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    //fb
    SUCCESS_GET_USERINFO,
    FAIL_GET_USERINFO
} from '../actions/types';

const INITIAL_STATE = {
    userInfo: null,
    error: '',
    isSaved: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_PROFILE:
            return { ...state, ...INITIAL_STATE };
        case GET_PROFILE_SUCCESS:
            return { ...state, userInfo: action.userInfo };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, error: '', isSaved: true };
        case UPDATE_PROFILE_FAIL:
            return { ...state, error: action.error, isSaved: false };
        case SUCCESS_GET_USERINFO:
            return { ...state, userInfo: action.payload };
        case FAIL_GET_USERINFO:
            return { ...state, error: action.error };
        default:
            return state;
    }
};
