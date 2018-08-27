import React, { Component } from 'react';
import { View, AsyncStorage, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
    sbConnect,
    sbGetChannelTitle
} from '../sendbirdActions';
import { Spinner } from '../components';
import { getCurrentUserInfo } from '../actions';


const { width , height } = Dimensions.get('window');
import firebase from '@firebase/app'
class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loggedIn: null
        };
    }

     componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          {AsyncStorage.getItem("user", (err, result) => {
              if(result) {
                  this.setState({ isLoading: true }, () => {
                      const user = JSON.parse(result);
                      sbConnect(user.userId)
                          .then(() => {
                              this.setState({ isLoading: false }, () => {
                                  AsyncStorage.getItem("payload", (err, result) => {
                                      if(result) {
                                          const notif = JSON.parse(result);
                                          const isOpenChannel = () => {
                                              return notif.channelType !== "group_messaging"
                                                  && notif.channelType !== "messaging";
                                          };
                                          const channelType = isOpenChannel() ? "OpenChannel" : "GroupChannel";
                                          this.props.navigation.dispatch(NavigationActions.reset({
                                              index : 3,
                                              actions : [
                                                  NavigationActions.navigate({ routeName : "ProfileInit" }),
                                                  NavigationActions.navigate({ routeName : "MenuStack" }),
                                                  NavigationActions.navigate({ routeName : channelType }),
                                                  NavigationActions.navigate({ routeName : "Chat", params : {
                                                          channelUrl: notif.channel.channel_url,
                                                          title: notif.channel.name,
                                                          isOpenChannel : isOpenChannel(),
                                                          isFromPayload : true
                                                      }
                                                  })
                                              ]
                                          }));
                                      }
                                      else this.props.navigation.navigate('MainStack')
                                  });
                              });
                          })
                          .catch((err) => {
                              this.setState({ isLoading: false }, () => {
                                  this.redirectTo("LoginStack");
                              });
                          });
                  });
              }
              else this.props.navigation.navigate('LoginStack');
          })}
        }
        else{
          this.props.navigation.navigate('LoginStack');
            }
        }
      );
    }




    redirectTo(page, params) {
        this.props.navigation.dispatch(NavigationActions.reset({
            index : 0,
            actions : [
                NavigationActions.navigate({ routeName : page, params : params })
            ]
        }));
    }




    render() {
        return (
            <View style={styles.containerStyle}>
                <Spinner visible={this.state.isLoading} />
                <ImageBackground source={require('../img/loading.png')}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: 'center'
                }}/>
            </View>
        );
    }
}

function mapStateToProps({ login, profile }) {
    const { error, user } = login;
    const { userInfo } = profile;
    return { error, user, userInfo };
};

export default connect(mapStateToProps, {getCurrentUserInfo})(Start);

const styles = {
    containerStyle: {
        backgroundColor: '#74b9ff',
        flex: 1,
        justifyContent:'center'
    }
}
