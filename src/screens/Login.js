import React, { Component } from 'react';
import { View, TextInput, Image, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import {
    sbRegisterPushToken
  } from '../sendbirdActions';
import { NavigationActions } from 'react-navigation';
import { Spinner } from '../components';
import { Container, Header, Content, Button, Icon, Text, Input, Form, Item, Label  } from 'native-base';
import { initLogin, sendbirdLogin, kakaoLogin  } from '../actions'
import NativeButton from 'apsl-react-native-button';

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
        }
    }

    componentDidMount() {
        this.props.initLogin();
    }

    componentWillReceiveProps(props) {
        let { user, error } = props;
        if (user) {
            AsyncStorage.getItem('pushToken', (err, pushToken) => {
                if(pushToken) {
                    sbRegisterPushToken(pushToken)
                        .then(res => {})
                        .catch(err => {});
                }
                this.props.navigation.navigate('Main');
            });
        }
        if (error) {
            this.setState({ isLoading: false });
        }
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
      this.setState({ isLoading: true } , () =>{
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
                        style={{width: 150, height: 150}}
                        source={require('../img/logo.png')}
                    />
                </View>

                <View style={styles.formViewStyle}>
                  <Form>
                    <Item>
                      <Label>이메일</Label>
                      <Input
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
                    </Item>

                    <Item>
                      <Label>비밀번호</Label>
                      <Input
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
                    </Item>

                  </Form>

                  <View style ={styles.buttonContainer}>
                      <Button
                        iconLeft
                        block
                        success
                        onPress={this._onButtonPress}
                        disabled={this.state.isLoading}>
                        <Icon name='home'/>
                        <Text>로그인</Text>
                      </Button>

                      <Button
                        warning
                        iconLeft
                        block
                        onPress={this._onKakaoButtonPress.bind(this)}
                        >
                        <Icon name='home' />
                        <Text>카카오톡으로 로그인</Text>
                      </Button>
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

function mapStateToProps({ login }) {
    const { error, user } = login;
    return { error, user };
};

export default connect(mapStateToProps, { initLogin, sendbirdLogin, kakaoLogin })(Login);

const styles = {
    containerStyle: {
        backgroundColor: '#74b9ff',
        flex: 1
    },
    logoViewStyle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formViewStyle: {
      flex: 2.5,
    },
    buttonContainer: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 10,
        justifyContent: 'space-around'
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
