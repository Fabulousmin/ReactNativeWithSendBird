import React, { Component } from 'react';
import { View , StyleSheet} from 'react-native';
import { Text, Button, Header, Icon } from 'react-native-elements';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { connect } from 'react-redux';
import { initProfile } from '../actions';

class ProfileInit3 extends Component {

  state = {
    nickname:''
  };

  onNicknameChanged(value: String) {
    this.setState({nickname: value})
  }

  render() {
    return (

      <View style = {styles.container}>
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
          <Text h4 >닉네임을 입력해주세요</Text>
          <Text style={{color:'#8395a7'}}>차후 변경이 불가능 합니다.</Text>
          <View style = {styles.itemContainer}>
            <FormLabel>닉네임</FormLabel>
            <FormInput
              placeholder='닉네임을 입력해 주세요'
              placeholderColor='#8395a7'
              onChangeText={this.onNicknameChanged.bind(this)}
              value={this.state.nickname}
            />
            <FormValidationMessage>중복된 닉네임이 있습니다.</FormValidationMessage>
          </View>
        </View>
        <View style ={styles.buttonContainer}>
          <Button
            title='다음'
            backgroundColor= '#74b9ff'
            onPress={() => {
              const { sex, age } = this.props.navigation.state.params;
              this.props.navigation.navigate('ProfileInit4',
              {sex,
              age,
              nickname: this.state.nickname
              }
            );
          }
        }
          />
        </View>
      </View>

  );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
  },
  formContainer:{
    paddingHorizontal: 20,
    flex:8,
  },
  itemContainer:{
    marginTop:10
  },
  buttonContainer:{
    flex:1
  }
})

const mapStateToProps = ({ profile }) => {
    const { userInfo, error, isSaved } = profile;
    return { userInfo, error, isSaved };
};
export default connect(mapStateToProps, { initProfile })(ProfileInit3);
