import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  Member: { screen: Member },
  BlockUser: { screen: BlockUser },
  GroupChannel: { screen: GroupChannel },
  GroupChannelInvite: { screen: GroupChannelInvite },
}, {
  initialRouteName: 'Menu',

})

const ListStack = StackNavigator({
  List1: {screen: List}
},{
  initialRouteName: 'List1',
  headerMode: 'none',
})

const ChatStack = StackNavigator({
  Chat1: {screen: ChatSelection},
  Chat: { screen: Chat },
},{
  initialRouteName: 'Chat1',
})

const StoreStack = StackNavigator({
  Store1: {screen: Store}
},{
  initialRouteName: 'Store1',
  headerMode: 'none',
})



const MainTab =  TabNavigator({
       ListStack: ListStack,
       ChatStack: ChatStack,
       StoreStack: StoreStack
  },
{
  navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'ListStack') {
            iconName = `ios-flame${focused ? '' : '-outline'}`;
          } else if (routeName === 'ChatStack') {
            iconName = `ios-chatbubbles${focused ? '' : '-outline'}`;
          }
            else if (routeName === 'StoreStack') {
              iconName = `ios-appstore${focused ? '' : '-outline'}`;
          }
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
      }),
  tabBarOptions: {
    activeTintColor:'#54a0ff',
    inactiveTintColor: '#8395a7'
  },
  tabBarPosition: 'bottom',
  animationEnabled: false,
})

const MainStack = SwitchNavigator({
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
  initialRouteName: 'Start',
  headerMode: 'none'
})
