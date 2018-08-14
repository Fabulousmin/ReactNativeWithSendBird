import React, { Component } from 'react';
import { View , StyleSheet } from 'react-native';
import { Text, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { initProfile } from '../actions';

class ProfileInit2 extends Component {

  state = {
    selectedIndex:'20대 초반'
  }

  onButtonPress(key) {
    this.setState({
      selectedIndex: key
    })
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
          <View style = {styles.titleContainer}>
            <Text h4 >연령대를 알려주세요</Text>
            <Text style={{color:'#8395a7'}}>차후 변경이 불가능합니다</Text>
          </View>
          <View style ={styles.itemContainer}>
            <List>
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = '20대 초반'
                title = '20대 초반'
                rightIcon = {(this.state.selectedIndex == '20대 초반') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
                onPress={() => this.onButtonPress('20대 초반')}
              />
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = '20대 중반'
                title = '20대 중반'
                rightIcon = {(this.state.selectedIndex == '20대 중반') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
                onPress={() => this.onButtonPress('20대 중반')}
              />
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = '20대 후반'
                title = '20대 후반'
                rightIcon = {(this.state.selectedIndex == '20대 후반') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
                onPress={() => this.onButtonPress('20대 후반')}
              />
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = '30대 초반'
                title = '30대 초반'
                rightIcon = {(this.state.selectedIndex == '30대 초반') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
                onPress={() => this.onButtonPress('30대 초반')}
              />
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = '30대 중반'
                title = '30대 중반'
                rightIcon = {(this.state.selectedIndex == '30대 중반') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
                onPress={() => this.onButtonPress('30대 중반')}
              />
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = '기타'
                title = '기타'
                rightIcon = {(this.state.selectedIndex == '기타') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
                onPress={() => this.onButtonPress('기타')}
              />
            </List>
          </View>
        </View>
        <View style ={styles.buttonContainer}>
          <Button
            title='다음'
            backgroundColor= '#74b9ff'
            onPress={() =>
            { const { navigation } = this.props
                navigation.navigate('ProfileInit3',
            {sex: this.props.navigation.getParam('sex','noSex'),
             age: this.state.selectedIndex
             })
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
export default connect(mapStateToProps, { initProfile })(ProfileInit2);
