import React, { Component } from 'react';
import { View , StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Header, Icon, Tile, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Spinner } from '../components';
import { updateProfile, initProfile } from '../actions';
import { sbUpdateProfile } from '../sendbirdActions';
import SendBird from 'sendbird';

const { width } = Dimensions.get('window');
class ProfileInit6 extends Component {

  state = { profileUrl: '',
            profileImgData:'',
            selfIntro:'',
            sendId:'',
            like:'',
            liked:'',
            isLoading:false,
          }

  _imagePick() {
    const sb = SendBird.getInstance();
    const pickerOptions = {
     title: '프로필 사진 변경',
     customButtons: [
     ],
     storageOptions: {
       skipBackup: true,
       path: 'subyeon/images',
     },
     quility: 0.1,
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
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      this.setState({
        profileUrl: response.uri ,
        profileImgData: response.data,
        sendId: sb.currentUser.userId,
      });
    }
  });
}


  onSelfIntroChanged(value: String){
    this.setState({selfIntro:value});
  }

  async _updateProfile(){
    this.setState({isLoading: true});
    const { sex, age, city, number, nickname } = this.props.navigation.state.params;
    const { profileUrl, selfIntro,sendId,like,liked } = this.state;
    if(profileUrl && selfIntro) {
    const userInfo = { sex, age, city, number, nickname, profileUrl, selfIntro, sendId, isProfile:'1', heart:10};
    sbUpdateProfile(nickname);
    await this.props.updateProfile(userInfo);}
    else{
    this.setState({isLoading: false});
    return
    }
    sbUpdateProfile(nickname);
  }

  componentDidMount() {
      this.props.initProfile();
  }

  componentWillReceiveProps(props){
    const { userInfo, isSaved, error } = props;
    if(isSaved){
      this.setState({isLoading:false});
      this.props.navigation.navigate('MainStack');
    }
  }
  renderValidationMessage( {profileUrl, selfIntro} ) {
    if( !profileUrl ){
    return(
        <FormValidationMessage>사진을 선택해주세요</FormValidationMessage>
    )
  }
    if( !selfIntro ){
      return(
        <FormValidationMessage>자기소개를 입력해주세요</FormValidationMessage>
      )
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style = {styles.container}>
        <Spinner visible={this.state.isLoading} />
        <Header
          leftComponent={
            <Icon
              name= 'chevron-left'
              onPress={() => this.props.navigation.pop()}
              color= '#8395a7'
            />
          }
          backgroundColor='transparent'
        />
        <View style = {styles.formContainer}>
          <Text h4 >친구들과 함께찍은 사진을 올려주세요.</Text>
          <Text style={{color:'#8395a7', marginBottom: 10}}>간단한 자기소개도 부탁드립니다.</Text>
          <Tile
            imageSrc={this.state.profileUrl ? {uri:this.state.profileUrl} : require('../img/default.png')}
            title={this.state.profileUrl ? ('') : ('Touch Me')}
            onPress={this._imagePick.bind(this)}
            featured
            imageContainerStyle={{width: width - 40, height: width-100}}
          />
          <FormLabel>자기소개</FormLabel>
          <FormInput
            onChangeText={this.onSelfIntroChanged.bind(this)}
            placeholder='같이 소주한잔 어때요?'
          />
          {this.renderValidationMessage(this.state)}
        </View>
        <View style ={styles.buttonContainer}>
          <Button
            title='다음'
            backgroundColor= '#74b9ff'
            onPress={() => this._updateProfile()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
  },
  formContainer:{
    paddingHorizontal: 20,
    flex:8,
  },
  buttonContainer:{
    flex:1
  }
})

function mapStateToProps({ profile }) {
    const { userInfo, error, isSaved } = profile;
    return { userInfo, error, isSaved };
}
export default connect(mapStateToProps, { updateProfile, initProfile })(ProfileInit6);
