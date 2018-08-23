import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { sendbirdLogout, initMenu, fbLogOut } from '../actions';
import {
    sbUnregisterPushToken
  } from '../sendbirdActions';
import { NavigationActions } from 'react-navigation';
import { Button, HR, Spinner } from '../components';
import { Header, Icon, Text } from 'react-native-elements';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    componentDidMount() {
        this.props.initMenu();
    }

    componentWillReceiveProps(props) {
      AsyncStorage.getItem("user", (err, result) => {
            if(!result){
            this.props.navigation.navigate('Start');
          }
        }
      )
        }



    _onProfileButtonPress = () => {
        this.props.navigation.navigate('Profile');
    }

    _onOpenChannelPress = () => {
        this.props.navigation.navigate('OpenChannel');
    }

    _onGroupChannelPress = () => {
        this.props.navigation.navigate('GroupChannel');
    }

    _onDisconnectButtonPress = () => {
        this.setState({ isLoading: true }, () => {
            sbUnregisterPushToken()
                .then(res => {
                    this.props.fbLogOut();
                    this.props.sendbirdLogout();
                })
               .catch(err => {});
        });
    }



    render() {
        return (
            <View style={styles.containerViewStyle}>
                <Spinner visible={this.state.isLoading} />
                <Header
                  leftComponent=
                  {<Icon
                    type='Ionicons'
                    name='arrow-back'
                    color='white'
                    onPress={()=>this.props.navigation.navigate('MainTab')}
                   />}
                  centerComponent=
                  {
                   <Text style={{color:'white', fontWeight:'600'}}>설정</Text>
                  }
                  backgroundColor='#74b9ff'
                />
                <Button
                    containerViewStyle={styles.menuViewStyle}
                    buttonStyle={styles.buttonStyle}
                    backgroundColor='#fff'
                    color='#6e5baa'
                    icon={{name: 'user', type: 'font-awesome' , color: '#6e5baa', size: 16}}
                    title='프로필 설정'
                    onPress={this._onProfileButtonPress}
                />
                <HR />
                <Button
                    containerViewStyle={styles.menuViewStyle}
                    buttonStyle={styles.buttonStyle}
                    backgroundColor='#fff'
                    color='#6e5baa'
                    icon={{name: 'slack', type: 'font-awesome' , color: '#6e5baa', size: 16}}
                    title='오픈채팅'
                    onPress={this._onOpenChannelPress}
                />
                <HR />
                <Button
                    containerViewStyle={styles.menuViewStyle}
                    buttonStyle={styles.buttonStyle}
                    backgroundColor='#fff'
                    color='#6e5baa'
                    icon={{name: 'users', type: 'font-awesome' , color: '#6e5baa', size: 16}}
                    title='1:1 채팅'
                    onPress={this._onGroupChannelPress}
                />
                <HR />
                <Button
                    containerViewStyle={styles.menuViewStyle}
                    buttonStyle={styles.buttonStyle}
                    backgroundColor='#fff'
                    color='#7d62d9'
                    color='#6e5baa'
                    icon={{name: 'sign-out', type: 'font-awesome' , color: '#6e5baa', size: 16}}
                    title='로그아웃'
                    onPress={this._onDisconnectButtonPress}
                />
                <HR />
            </View>
        )
    }
}

function mapStateToProps({ menu }) {
    const { isDisconnected } = menu;
    return { isDisconnected };
};

export default connect(mapStateToProps, { sendbirdLogout, initMenu, fbLogOut })(Menu);

const styles = {
    containerViewStyle: {
        backgroundColor: '#fff',
        flex: 1
    },
    menuViewStyle: {
        marginLeft: 0,
        marginRight: 0
    },
    buttonStyle: {
        justifyContent: 'flex-start',
        paddingLeft: 14
    }
};
