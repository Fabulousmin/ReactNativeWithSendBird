import { combineReducers } from 'redux';
import login from './loginReducer';
import menu from './menuReducer';
import profile from './profileReducer';
import openChannel from './openChannelReducer';
import openChannelCreate from './openChannelCreateReducer';
import chat from './chatReducer';
import member from './memberReducer';
import blockUser from './blockUserReducer';
import groupChannel from './groupChannelReducer';
import groupChannelInvite from './groupChannelInviteReducer';
import list from './listReducer';
import store from './storeReducer';

export default combineReducers({
    login, menu, profile,
    openChannel, openChannelCreate,
    chat, member, blockUser,
    groupChannel, groupChannelInvite,
    list, store
});
