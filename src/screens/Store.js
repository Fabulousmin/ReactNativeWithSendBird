/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { ListItem, Divider, Button, Text } from 'react-native-elements'
import { SHeader } from '../components';

const list = [
  {
    name: '   2000 하트',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    element: <Button title='US2$' style={{width:100, borderWidth:1, borderRadius: 10, borderColor: '#00cec9'}}  backgroundColor='transparent' color='#00cec9' />
  },
  {
    name: '   5000 하트',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    element: <Button title='US5$' style={{width:100, borderWidth:1, borderRadius: 10, borderColor: '#00cec9'}}  backgroundColor='transparent' color='#00cec9' />
  },
  {
    name: '   10000 하트',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    element: <Button title='US8$' style={{width:100, borderWidth:1, borderRadius: 10, borderColor: '#00cec9'}}  backgroundColor='transparent' color='#00cec9' />
  },
  {
    name: '   20000 하트',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    element: <Button title='US14$' style={{width:100, borderWidth:1, borderRadius: 10, borderColor: '#00cec9'}}  backgroundColor='transparent' color='#00cec9' />
  },
  {
    name: '   50000 하트',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      element: <Button title='US30$' style={{width:100, borderWidth:1, borderRadius: 10, borderColor: '#00cec9'}}  backgroundColor='transparent' color='#00cec9' />
  },
]


export default class Store extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SHeader
          onLeftPress={()=>this.props.navigation.navigate('Store')}
          onRightPress={()=>this.props.navigation.navigate('MenuStack')}
        />
        <ScrollView>
          <View style={styles.divider}>
            <Text h4 style={styles.title}>Heart Shop</Text>
            <Text style={styles.subtitle}>매시지를 보내려면 하트가 필요해요</Text>
          </View>
          {
        list.map((item, i) => (
          <ListItem
            key={i}
            leftIcon={{type:'font-awesome', name: 'heart', color:'#74b9ff'}}
            title={item.name}
            containerStyle={{paddingTop: 20, paddingBottom: 20, paddingLeft:10, borderBottomColor: '#dfe6e9'}}
            badge={{ element: item.element }}
            hideChevron
          />
        ))
        }
        <View style={styles.divider}>
          <Text h4 style={styles.title}>Free Shop</Text>
          <Text style={styles.subtitle}>무료로 아이템을 얻을 수 있는 방법</Text>
        </View>
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    backgroundColor: '#dfe6e9',
    paddingVertical: 10,
    alignItems: 'center'
  },
  title:{
    color:'#2d3436'
  },
  subtitle:{
    color: '#636e72'
  }
});
