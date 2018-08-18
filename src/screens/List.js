import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View
} from 'react-native';
import { initUserlist, getUserlist, getCurrentUserInfo} from '../actions';
import { UserList } from '../UserList';
import { CardImage, Spinner } from '../components';
import { connect } from 'react-redux';
class List extends Component {

  state = {
      refreshing: false,
      isLoading: false,
      data: [],
      error: '',
    }
    onEndReached = async () => {
    await this.props.getUserlist();
   };

   onRefresh = async () => {
    await this.props.getUserlist();
   }

   renderFlatList(isLoading) {
     return (<FlatList
      data={this.state.data}
      initialNumToRender={1}
      onEndReachedThreshold={1}
      onEndReached={this.onEndReached}
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh}
      keyExtractor={this._keyExtractor}
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
    />)
   }

   componentDidMount() {
        this.props.initUserlist();
        this.setState({ isLoading: true }, async () => {
            await this.props.getUserlist();
            await this.props.getCurrentUserInfo();
        });
    }

    componentWillReceiveProps(props){
      const { userlist, userInfo, error } = props;
      console.log(userInfo ,userlist)
        if (userlist.length >0) {
            this.setState({data: userlist, isLoading: false})
        }
    }
   _keyExtractor(item, index) {
     return item.nickname
   }



  render() {
    return (
      <View>
        <Spinner visible={this.state.isLoading} />
        {this.renderFlatList()}
      </View>
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
