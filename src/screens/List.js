import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList
} from 'react-native';
import { UserList } from '../UserList';
import { CardImage } from '../components';
import { connect } from 'react-redux';

export default class List extends Component {

  state = {
      refreshing: false,
      data: UserList(1),
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
               source={{ uri: item.profileUrl }}
               nickname={item.nickname}
               city={item.city}
               sex={item.sex}
               number={item.number}
               selfIntro={item.selfIntro}
               age={item.age}
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
