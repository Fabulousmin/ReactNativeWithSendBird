import React, { Component } from 'react';
import { View, AsyncStorage, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Picker } from 'native-base'
import { connect } from 'react-redux';
import { sendbirdLogout, initMenu, fbLogOut, initProfile, getCurrentUserInfo, updateUserInfo } from '../actions';
import {
    sbUnregisterPushToken
  } from '../sendbirdActions';
import ImagePicker from 'react-native-image-picker';
import { NavigationActions } from 'react-navigation';
import { HR, Spinner } from '../components';
import { Header, Icon, Text, Button, ListItem, List } from 'react-native-elements';


const {width, height} = Dimensions.get('window')

class Menu extends Component {
  static navigationOptions = ({ navigation }) => {
    return {header: null}
  }

    state = {
            isLoading: false,
            profileUrl:'',
            profileImgData:'',
            sex:'',
            age:'',
            selfIntro:'',
            city:'',
            number:'',
            nickname:'',
          }

          _imagePick() {
            const pickerOptions = {
              title: '프로필 사진 변경',
              customButtons: [
              ],
              storageOptions: {
                skipBackup: true,
                path: 'subyeon/images',
              },
              quility: 0.5,
              allowsEditing: true,
            };

            ImagePicker.showImagePicker(pickerOptions, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              this.setState({
                profileUrl: response.uri,
                profileImgData: response.data
              })
            }
            });
            }

    async componentDidMount() {
        this.props.initProfile();
        this.props.initMenu();
        await this.props.getCurrentUserInfo()
    }

    componentWillReceiveProps(props) {
      const { isDisconnected, userInfo } = props;
      if(userInfo) {
        const { profileUrl, sex, age, selfIntro, city, number, nickname} = userInfo;
        this.setState({
          profileUrl, sex, age, selfIntro, city, number, nickname
        })
      }
      AsyncStorage.getItem("user", (err, result) => {
            if(!result){
            this.props.navigation.navigate('Start');
          }
        }
      )
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

    _onSaveButtonPress= () => {
      return
    }

    _renderList = () => {
      const list = [
        {
          title: '닉네임',
          icon: {type: 'font-awesome', name: 'user', color: '#b2bec3'},
          value: this.state.nickname,
          textInput: false
        },
        {
          title: '성별',
          icon: {type: 'font-awesome', name: 'transgender', color: '#b2bec3'},
          value: this.state.sex,
          textInput: false
        },
        {
          title: '나이',
          icon: {type: 'font-awesome', name: 'sort-numeric-desc', color: '#b2bec3'},
          value: this.state.age,
          textInput: false
        }
      ]

      return(<List containerStyle={{marginBottom: 10}}>
                  {
          list.map((item) => (
            <ListItem
              leftIcon={item.icon}
              key={item.title}
              title={item.title}
              rightTitle={<Text >{item.value}</Text>}
            />
          ))
          }
          </List>)
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
                  rightComponent={
                    <Text onPress={() => this._onSaveButtonPress()} style={{color:'white'}}>저장</Text>
                  }
                  backgroundColor='#74b9ff'
                />
                <ScrollView>
                  <ImageBackground
                    source={this.state.profileUrl ? {uri:this.state.profileUrl} : require('../img/default.png')}
                   style={{width:width, height: 300, flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}
                  >
                    <View
                     style={{marginRight: 20, marginBottom:20}}
                    >
                      <Button
                        title='사진변경'
                        leftIcon={{type:'font-awesome', name:'user'}}
                        backgroundColor='#00cec9'
                        borderRadius={10}
                        onPress={this._imagePick.bind(this)}
                      />
                    </View>
                  </ImageBackground>
                  {this._renderList()}
                  <Picker
                    note
                    mode="dropdown"
                    style={{ width: 120 }}
                    selectedValue={this.state.selected}
                  >
                    <Picker.Item label="Wallet" value="key0" />
                    <Picker.Item label="ATM Card" value="key1" />
                    <Picker.Item label="Debit Card" value="key2" />
                    <Picker.Item label="Credit Card" value="key3" />
                    <Picker.Item label="Net Banking" value="key4" />
                  </Picker>
                  <Button
                      containerViewStyle={styles.menuViewStyle}
                      buttonStyle={styles.buttonStyle}
                      backgroundColor='#fff'
                      color='#000000'
                      icon={{name: 'sign-out', type: 'font-awesome' , color: '#000000', size: 16}}
                      title='로그아웃'
                      onPress={this._onDisconnectButtonPress}
                  />
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps({ menu, profile }) {
    const { isDisconnected } = menu;
    const { userInfo } = profile;
    return { isDisconnected, userInfo };
};

export default connect(mapStateToProps, { sendbirdLogout, initMenu, fbLogOut, initProfile, getCurrentUserInfo, updateUserInfo })(Menu);

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
