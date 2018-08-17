import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList
} from 'react-native';
import { initUserlist, getUserlist, getCurrentUserInfo} from '../actions';
import { UserList } from '../UserList';
import { CardImage } from '../components';
import { connect } from 'react-redux';

class List extends Component {

  state = {
      refreshing: false,
      data: this.props.userlist
    }
    onEndReached = () => {
     this.setState(state => ({
       data: [
         ...state.data,
         ...this.props.userlist,
       ]
     }));
   };

   onRefresh = () => {
     this.setState({
       data: this.props.userlist,
     });
   }

   async componentWillMount(){
     this.props.initUserlist();
     await this.props.getUserlist();
     await this.props.getCurrentUserInfo();
   }


  render() {
    return (
        <FlatList
         data={this.props.userlist}
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

const mapStateToProps = ({ list, profile }) => {
  const { userlist, error } = list;
  const { userInfo } = profile;
  return { userlist, userInfo, error };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
    mapStateToProps,
    {
      initUserlist,
      getUserlist,
      getCurrentUserInfo,
    }
)(List);
