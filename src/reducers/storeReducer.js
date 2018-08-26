import {
    INIT_HEART,
    GET_HEART_SUCCESS,
    GET_HEART_FAIL,
    UPDATE_HEART_SUCCESS,
    UPDATE_HEART_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    heart:'',
    error:'',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_HEART:
            return { ...state, ...INITIAL_STATE };
        case GET_HEART_SUCCESS:
            return { ...state, heart: action.heart };
        case GET_HEART_FAIL:
            return { ...state, error: action.error};
        case UPDATE_HEART_SUCCESS:
            return { ...state, error: ''};
        case UPDATE_HEART_FAIL:
            return { ...state, error: action.error};
        default:
            return state;
    }
};
