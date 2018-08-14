import React, { Component } from 'react';
import { View , StyleSheet} from 'react-native';
import { Text, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { initProfile } from '../actions';

class ProfileInit5 extends Component {

  state = {
    selectedIndex: '1'
  }

  onButtonPress(key) {
    this.setState({
      selectedIndex: key
    });
  }

  renderList(number) {
    return(
    <ListItem
      containerStyle={{paddingTop: 15, paddingBottom: 15}}
      key = { number +'명'}
      title = { number +'명'}
      onPress = {() => this.onButtonPress( number +'' ) }
      rightIcon = {(this.state.selectedIndex == number + '') ?
      ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
    />
  );
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
              <Text h4 >몇명이서 오신거죠?</Text>
              <Text style={{color:'#8395a7'}}>2~3명이 제일 좋다던데..</Text>
            </View>
            <View style ={styles.itemContainer}>
              <List>
                {this.renderList(1)}
                {this.renderList(2)}
                {this.renderList(3)}
                {this.renderList(4)}
                {this.renderList(5)}
                <ListItem
                  containerStyle={{paddingTop: 15, paddingBottom: 15}}
                  key = '기타'
                  title = '니들끼리놀아'
                  onPress = {() => this.onButtonPress('6')}
                  rightIcon = {(this.state.selectedIndex == '6') ?
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
                const { sex, age, nickname, city } = this.props.navigation.state.params;
                const { selectedIndex } = this.state;
                this.props.navigation.navigate('ProfileInit6',
                 {sex, age, nickname, city,
                   number:selectedIndex
                 })}}
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
export default connect(mapStateToProps, { initProfile })(ProfileInit5);
