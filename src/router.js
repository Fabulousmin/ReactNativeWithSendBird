import BlockUser from './screens/BlockUser';
import Chat from './screens/Chat';
import GroupChannel from './screens/GroupChannel';
import GroupChannelInvite from './screens/GroupChannelInvite';
import List from './screens/List';
import Login from './screens/Login';
import Member from './screens/Member';
import Menu from './screens/Menu';
import OpenChannel from './screens/OpenChannel';
import OpenChannelCreate from './screens/OpenChannelCreate';
import Profile from './screens/Profile';
import ProfileInit1 from './screens/ProfileInit1';
import ProfileInit2 from './screens/ProfileInit2';
import ProfileInit3 from './screens/ProfileInit3';
import ProfileInit4 from './screens/ProfileInit4';
import ProfileInit5 from './screens/ProfileInit5';
import ProfileInit6 from './screens/ProfileInit6';
import Start from './screens/Start';
import Store from './screens/Store';
import ChatSelection from './screens/ChatSelection';

import { StackNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';

const LoginStack = StackNavigator({
   Login: { screen: Login }
}
,{
   initialRouteName: 'Login'
   });

const ProfileInitStack = StackNavigator(
  { ProfileInit1 :{ screen: ProfileInit1 },
    ProfileInit2 :{ screen: ProfileInit2 },
    ProfileInit3 :{ screen: ProfileInit3 },
    ProfileInit4 :{ screen: ProfileInit4 },
    ProfileInit5 :{ screen: ProfileInit5 },
    ProfileInit6 :{ screen: ProfileInit6 }
  },
  { initialRouteName: 'ProfileInit1',
    headerMode: 'none'
});

const MenuStack = StackNavigator({
  Menu: { screen: Menu },
  OpenChannel: { screen: OpenChannel },
  OpenChannelCreate: { screen: OpenChannelCreate },
  Chat: { screen: Chat },
  Member: { screen: Member },
  BlockUser: { screen: BlockUser },
  GroupChannel: { screen: GroupChannel },
  GroupChannelInvite: { screen: GroupChannelInvite },
}, {
  initialRouteName: 'Menu',
})

const MainTab =  TabNavigator({
            List: { screen: List },
         Profile: { screen: ChatSelection},
           Store: { screen: Store},
  },
{
  tabBarOptions: {
    activeTintColor:'#54a0ff',
    inactiveTintColor: '#8395a7'
  },
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: true
})

const MainStack = StackNavigator({
  MainTab: MainTab,
  MenuStack: MenuStack,
},
{
  initialRouteName: 'MainTab',
  headerMode: 'none'
})

export const MainNavigator = SwitchNavigator({
             Start: { screen: Start},
        LoginStack: LoginStack,
  ProfileInitStack: ProfileInitStack,
         MainStack: MainStack,
},
{
  initialRouteName: 'Start'
})
