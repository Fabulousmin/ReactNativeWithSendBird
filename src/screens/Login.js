import React, { Component } from 'react';
import { View, Image, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button, Text } from 'react-native-elements'
import { initLogin, sendbirdLogin, kakaoLogin, getCurrentUserInfo } from '../actions';
import {sbRegisterPushToken,sbCreateUserListQuery,sbGetUserList,sbGetCurrentInfo} from '../sendbirdActions';
import { Spinner } from '../components';
import SendBird from 'sendbird';



class Login extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userId: '',
            password: ''
        };
    }

    async componentDidMount() {
        this.props.initLogin();
      }

      componentWillReceiveProps(props) {
          async () => await getCurrentUserInfo();
          let { user, error, userInfo } = props;
          if (user) {
              AsyncStorage.getItem('pushToken', (err, pushToken) => {
                  if (pushToken) {
                      sbRegisterPushToken(pushToken)
                          .then(res => {})
                          .catch(err => {})
                    }
                  this.checkUsers()
                  .then((currentUserNickname)=>{
                    if(currentUserNickname!=="") {
                      this.props.navigation.navigate('MainStack')
                    }
                    else{
                      this.props.navigation.navigate('ProfileInitStack')
                    }
                      })
                    })
          if (error) {
              this.setState({ isLoading: false });
          }
        }
      }
      async checkUsers(){
      const sb = SendBird.getInstance();
      const currentUserNickname = sb.currentUser.nickname
      return currentUserNickname
    }


    _onUserIdChanged = (userId) => {
        this.setState({ userId });
    }

    _onPasswordChanged =(password) => {
        this.setState({ password });
    }

    _onButtonPress = () => {
        const { userId, password } = this.state;
        this.setState({ isLoading: true }, () => {
            this.props.sendbirdLogin({ userId, password });
        });
    }

    _onKakaoButtonPress = () => {
      this.setState({ isLoading: true }, () => {
        this.props.kakaoLogin();
      });
    }


    render() {
        return (
          <KeyboardAvoidingView
              style={styles.containerStyle}
              behavior="padding"
              enabled
          >
                <Spinner visible={this.state.isLoading} />
                <View style={styles.logoViewStyle}>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={require('../img/logo.png')}
                    />
                </View>

                <View style={styles.formViewStyle}>
                      <FormLabel>이메일</FormLabel>
                      <FormInput
                          placeholder="user@email.com"
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          autoCapitalize="none"
                          returnKeyType="next"
                          keyboardType="email-address"
                          autoCorrect={false}
                          maxLength={40}
                          underlineColorAndroid='transparent'
                          value={this.state.userId}
                          onChangeText={this._onUserIdChanged}
                      />

                      <FormLabel>비밀번호</FormLabel>
                      <FormInput
                          placeholder="password"
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          secureTextEntry
                          autoCapitalize="none"
                          returnKeyType="next"
                          keyboardType="email-address"
                          autoCorrect={false}
                          maxLength={30}
                          underlineColorAndroid='transparent'
                          value={this.state.password}
                          onChangeText={this._onPasswordChanged}
                      />

                  <View style={styles.buttonContainer}>
                      <Button
                        title='로그인'
                        icon={{name:'ios-log-in', color:'black' , type: 'ionicon'}}
                        backgroundColor='#54a0ff'
                        onPress={this._onButtonPress}
                        disabled={this.state.isLoading}
                        borderRadius={5}
                        fontWeight='600'
                      />
                      <Button
                        title='페이스북으로 로그인'
                        icon={{name:'logo-facebook', color:'white', type: 'ionicon'}}
                        backgroundColor='#3b5998'
                        onPress={this._onKakaoButtonPress.bind(this)}
                        borderRadius={5}
                        fontWeight='600'
                      />
                      <Button
                        title='카카오톡으로 로그인'
                        backgroundColor='#fcd411'
                        onPress={this._onKakaoButtonPress.bind(this)}
                        borderRadius={5}
                        fontWeight='600'
                      />
                  </View>

                <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                <View style={[styles.footerViewStyle]}>
                    <Text style={styles.footerTextStyle}>수변팅</Text>
                </View>
              </View>
          </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps({ login, profile }) {
    const { error, user } = login;
    const { userInfo } = profile;
    return { error, user, userInfo };
}

export default connect(mapStateToProps, { initLogin, sendbirdLogin, kakaoLogin, getCurrentUserInfo })(Login);

const styles = {
    containerStyle: {
        backgroundColor: '#74b9ff',
        flex: 1
    },
    logoViewStyle: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formViewStyle: {
      flex: 5,
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 10,
        marginTop:10,
        justifyContent:'space-between',
    },
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#e03131'
    },
    footerViewStyle: {
        paddingLeft: 28,
        paddingRight: 28,
        marginTop: 15,
        flexDirection: 'column'
    },
    footerTextStyle: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#8e8e8e'
    }
}
