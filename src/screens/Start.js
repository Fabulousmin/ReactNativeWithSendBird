import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import {
    sbConnect,
    sbGetChannelTitle
} from '../sendbirdActions';
import { Spinner } from '../components';

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
                                                  NavigationActions.navigate({ routeName : "Main" }),
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
                                      else this.props.navigation.navigate('Main')
                                  });
                              });
                          })
                          .catch((err) => {
                              this.setState({ isLoading: false }, () => {
                                  this.redirectTo("Login");
                              });
                          });
                  });
              }
              else this.props.navigation.navigate('Login');
          })}
        }
        else{
          this.props.navigation.navigate('Login');
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
            </View>
        );
    }
}

function mapStateToProps({ login }) {
    const { error, user } = login;
    return { error, user };
};

export default connect(mapStateToProps, {})(Start);

const styles = {
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1
    }
}
