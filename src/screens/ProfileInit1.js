import React, { Component } from 'react';
import { View , StyleSheet } from 'react-native';
import { Text, Button, Header, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { initProfile } from '../actions';

class ProfileInit1 extends Component {

  state = {
    selectedIndex: '여',
  };

  onButtonPress(key) {
    this.setState({
      selectedIndex: key
    })
  }

  render() {
    return (
      <View style = {styles.container}>
        <Header
          leftComponent={{ icon: 'clear', color: '#8395a7' }}
          backgroundColor='transparent'
        />
        <View style = {styles.formContainer}>
          <View style = {styles.titleContainer}>
            <Text h4 >성별을 알려주세요</Text>
            <Text style={{color:'#8395a7'}}>차후 변경이 불가능합니다.</Text>
          </View>
          <View style ={styles.itemContainer}>
            <List>
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = 'female'
                title = '여자'
                onPress = {() => this.onButtonPress('여')}
                rightIcon = {(this.state.selectedIndex == '여') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
              />
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = 'male'
                title = '남자'
                onPress = {() => this.onButtonPress('남')}
                rightIcon = {(this.state.selectedIndex == '남') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
              />
            </List>
          </View>
        </View>
        <View style ={styles.buttonContainer}>
          <Button
            title='다음'
            backgroundColor= '#74b9ff'
            onPress={() => {
              this.props.navigation.navigate('ProfileInit2',
              { sex: this.state.selectedIndex }
            )}}
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
  titleContainer:{

  },
  itemContainer:{

  },
  buttonContainer:{
    flex:1
  }
})

const mapStateToProps = ({ profile }) => {
    const { userInfo, error, isSaved } = profile;
    return { userInfo, error, isSaved };
};
export default connect(mapStateToProps, { initProfile })(ProfileInit1);
