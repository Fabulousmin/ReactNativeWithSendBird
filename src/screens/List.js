import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View
} from 'react-native';
import { initUserlist, getUserlist } from '../actions';
import { UserList } from '../UserList';
import { CardImage, Spinner } from '../components';
import { connect } from 'react-redux';
import { sOnPressLike, sGetCurrentUserInfo } from '../subyeonActions';

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
            onPress={() => this.onPressLike(item.uid)}
          />
        );
      }}
    />)
   }

   onPressLike(uid) {
     sGetCurrentUserInfo()
     .then((userInfo)=> {
       const { nickname } = userInfo;
       sOnPressLike(uid, nickname);
     })
   }

   componentDidMount() {
        this.props.initUserlist();
        this.setState({ isLoading: true }, async () => {
          await this.props.getUserlist();
        });
    }

    componentWillReceiveProps(props){
      const { userlist, error} = props;
      console.log(userlist.length)
        if (userlist.length > 0 ) {
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

const mapStateToProps = ({ list  }) => {
  const { userlist, error } = list;

  return { userlist, error  };
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

    }
)(List);
