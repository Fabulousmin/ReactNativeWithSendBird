import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import { UserList } from '../UserList';
import { CardImage } from '../components';
export default class List extends Component {

  state = {
      refreshing:false,
      data: UserList(5),
    }
    onEndReached = () => {
     this.setState(state => ({
       data: [
         ...state.data,
         ...UserList(),
       ]
     }));
   };

   onRefresh = () => {
     this.setState({
       data: UserList(5),
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
               nickname={item.nickname}
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
