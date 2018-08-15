import React, { Component } from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Content,
   Form,
    Picker,
     Icon,
      Label,
       Item,
        Text,
         Input,
          Button } from 'native-base';
import { initProfile, getCurrentUserInfo, updateProfile, } from '../actions';
import { Spinner } from '../components';

const { width } = Dimensions.get('window');

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

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            profileUrl: '',
            profileImgData: '',
            nickname: '',
            selfIntro: '',
            age: '',
            sex: '',
            city: '',
            number: '',
        };
    }

   componentDidMount() {
        this.props.initProfile();
        this.setState({ isLoading: true }, async () => {
            await this.props.getCurrentUserInfo();
        });
    }

    componentWillReceiveProps(props) {
        const { userInfo, isSaved } = props;
        if (userInfo) {
            const { profileUrl, nickname, selfIntro, age, sex, city, number } = userInfo;
            this.setState({
              profileUrl,
               nickname,
                selfIntro,
                 age,
                 sex,
                  city,
                   number,
                    isLoading: false });
        }
        if (isSaved) {
            this.props.navigation.goBack();
        }
    }

    onNicknameChanged(nickname) {
        this.setState({
           nickname: nickname
         });
    }

    onSelfIntroChanged(selfIntro) {
      this.setState({
          selfIntro: selfIntro
      });
    }

    onSexChanged(value: string) {
    this.setState({
      sex: value
    });
  }
    onCityChanged(value: string) {
    this.setState({
      city: value
    });
  }
    onNumberChanged(value: string) {
    this.setState({
      number: value
    });
  }
    onAgeChanged(value: string) {
      this.setState({
     age: value
  });
}


_imagePick() {
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
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    this.setState({
      profileUrl: response.uri ,
      profileImgData: response.data
    });
  }
});
  }

render() {
  return (
    <View style={styles.containerStyle}>
      <Spinner visible={this.state.isLoading} />
      <Content>
        <ImageBackground
          source={this.state.profileUrl ? {uri:this.state.profileUrl} : require('../img/default.png')}
         style={{width:width, height: 300, flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}
        >
          <View
           style={{marginRight: 20, marginBottom:20}}
          >
            <Button
              iconLeft
              info
              onPress={this._imagePick.bind(this)}
              >
               <Icon name='person'/>
               <Text>사진변경</Text>
            </Button>
          </View>
        </ImageBackground>
                  <Form>
                    <Item stackedLabel>
                      <Label>닉네임</Label>
                      <Input
                      maxLength={12}
                      onChangeText={this.onNicknameChanged.bind(this)}
                      value={this.state.nickname}
                      />
                    </Item>
                    <Item stackedLabel>
                      <Label>자기소개</Label>
                      <Input
                      maxLength={30}
                      onChangeText={this.onSelfIntroChanged.bind(this)}
                      value={this.state.selfIntro}
                      />
                    </Item>
                    <Item inlineLabel>
                    <Label>성별</Label>
                    <Picker
                      mode="dropdown"
                      placeholder="성별을 선택해 주세요"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      iosIcon={<Icon name="ios-arrow-down-outline" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.sex}
                      onValueChange={this.onSexChanged.bind(this)}
                    >
                      <Picker.Item label="남" value="남" />
                      <Picker.Item label="여" value="여" />
                    </Picker>
                    </Item>
                    <Item inlineLabel>
                    <Label>나이</Label>
                    <Picker
                      mode="dropdown"
                      placeholder="연령대를 선택해 주세요"
                      iosIcon={<Icon name="ios-arrow-down-outline" />}
                      style={{ width: undefined }}
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.age}
                      onValueChange={this.onAgeChanged.bind(this)}
                    >
                      <Picker.Item label="20대 초반" value="20대 초반" />
                      <Picker.Item label="20대 중반" value="20대 중반" />
                      <Picker.Item label="20대 후반" value="20대 후반" />
                      <Picker.Item label="30대 초반" value="30대 초반" />
                      <Picker.Item label="30대 중반" value="30대 후반" />
                    </Picker>
                    </Item>
                    <Item inlineLabel>
                    <Label>거주</Label>
                    <Picker
                      mode="dropdown"
                      placeholder="거주지를 선택해 주세요"
                      iosIcon={<Icon name="ios-arrow-down-outline" />}
                      style={{ width: undefined }}
                      placeholderStyle={{ color: '#bfc6ea' }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.city}
                      onValueChange={this.onCityChanged.bind(this)}
                    >
                      <Picker.Item label="부산" value="부산" />
                      <Picker.Item label="부산외 지역" value="부산외지역" />
                    </Picker>
                    </Item>
                    <Item inlineLabel>
                    <Label>동행</Label>
                    <Picker
                      mode="dropdown"
                      placeholder="동행 인원수를 선택해 주세요"
                      iosIcon={<Icon name="ios-arrow-down-outline" />}
                      style={{ width: undefined }}
                      placeholderStyle={{ color: '#bfc6ea' }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.number}
                      onValueChange={this.onNumberChanged.bind(this)}
                    >
                      <Picker.Item label="1" value="1" />
                      <Picker.Item label="2" value="2" />
                      <Picker.Item label="3" value="3" />
                      <Picker.Item label="4" value="4" />
                      <Picker.Item label="5" value="5" />
                    </Picker>
                    </Item>
                  </Form>
                </Content>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1,
    },
    defaultMargin: {
        marginLeft: 14,
        marginRight: 14
    }
};

function mapStateToProps({ profile }) {
    const { userInfo, error, isSaved } = profile;
    return { userInfo, error, isSaved };
}

export default connect( mapStateToProps, { initProfile, getCurrentUserInfo, updateProfile })(Profile);
