
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import { randomUser } from '../randomUser';
import { CardImage } from '../components';
export default class List extends Component {

  state = {
      refreshing:false,
      data: randomUser(5),
    }
    onEndReached = () => {
     this.setState(state => ({
       data: [
         ...state.data,
         ...randomUser(),
       ]
     }));
   };

   onRefresh = () => {
     this.setState({
       data: randomUser(5),
     });
   }

  render() {
    return (
        <FlatList
         data={this.state.data}
         initialNumToRender={1}
         onEndReachedThreshold={1}
         onEndReached={this.onEndReached}
         refreshing={this.state.refreshing}
         onRefresh={this.onRefresh}
         renderItem={({ item }) => {
           return (
             <CardImage
               source={{uri:item.avatar}}
               nickname={item.name}
               age={item.age}
               city={item.city}
               sex={item.sex}
               number={item.number}
             />
           );
         }}
       />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
