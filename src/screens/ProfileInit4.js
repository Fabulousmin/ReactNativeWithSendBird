import React, { Component } from 'react';
import { View , StyleSheet} from 'react-native';
import { Text, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { initProfile } from '../actions';

class ProfileInit4 extends Component {

  state = {
    selectedIndex:'부산'
  }

  onButtonPress(key) {
    this.setState({
      selectedIndex: key
    });
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
            <Text h4 >현재 위치를 알려주세요.</Text>
            <Text style={{color:'#8395a7'}}>부산이신거 맞죠?</Text>
          </View>
          <View style ={styles.itemContainer}>
            <List>
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = '광안리'
                title = '광안리'
                rightIcon = {(this.state.selectedIndex == '광안리') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
                onPress = {() => this.onButtonPress('광안리')}
              />
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = '부산'
                title = '부산'
                rightIcon = {(this.state.selectedIndex == '부산') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
                onPress = {() => this.onButtonPress('부산')}
              />
              <ListItem
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                key = '부산 외 지역'
                title = '부산 외 지역'
                rightIcon = {(this.state.selectedIndex == '부산 외 지역') ?
                ({name:'check-circle',color:'black'}) : ({name:'check-circle',color:'white'})}
                onPress = {() => this.onButtonPress('부산 외 지역')}
              />

            </List>
          </View>
        </View>
        <View style ={styles.buttonContainer}>
          <Button
            title='다음'
            backgroundColor= '#74b9ff'
            onPress={() => {
              const { sex, age, nickname } = this.props.navigation.state.params;
              this.props.navigation.navigate('ProfileInit5',
            { sex, age, nickname,
              city: this.state.selectedIndex
            }
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
export default connect(mapStateToProps, { initProfile })(ProfileInit4);
