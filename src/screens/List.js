import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  Dimensions
} from 'react-native';
import { initUserlist,
  getUserlist,
  createGroupChannel,
  initInvite,
  groupChannelProgress,
  addGroupChannelItem,
  onGroupChannelPress,
  getCurrentUserInfo
} from '../actions';
import { UserList } from '../UserList';
import { CardImage, Spinner, SHeader } from '../components';
import { connect } from 'react-redux';
import { sOnPressLike, sGetCurrentUserInfo } from '../subyeonActions';
import { Header, Icon, Text } from 'react-native-elements';

const { width } = Dimensions.get('window');
class List extends Component {

  state = {
      refreshing: false,
      isLoading: false,
      data: [],
      error: '',
      heart: null,
    }
    onEndReached = async () => {

   };

   onRefresh = async () => {

   }

   onCreateButtonPress = (sendId) => {
    const inviteUserIdList = [sendId]
    console.log('inviteUserIdList:', inviteUserIdList)
    Alert.alert(
              'Create Group Channel',
              'Please select distinct option.',
              [
                  {text: 'Distinct', onPress: () => {
                      const isDistinct = true;
                      this.props.createGroupChannel(inviteUserIdList, isDistinct);
                      console.log("goooossSS")
                  }},
                  {text: 'Non-Distinct', onPress: () => {
                      const isDistinct = false;
                      this.props.createGroupChannel(inviteUserIdList, isDistinct);
                  }},
                  {text: 'Cancel'}
              ]
          );


    }

    getUpdatedBefore(updatedAt) {
      const now = new Date();
      const before = new Date(updatedAt);
      if(before.getDate() == now.getDate())
      {let result = (now - before)/60000
        result = result /60
        result = Math.floor(result*10)/10
        console.log(result);
        return result + ' 시간전'
      }
      else
      return '1일전'
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
            onpress={()=>this.onCreateButtonPress(item.sendId)}
            updatedAt={this.getUpdatedBefore(item.updatedAt)}
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
        this.props.getCurrentUserInfo();
        this.props.initInvite();
        this.setState({ isLoading: true }, async () => {
          await this.props.getUserlist();
        });

    }

    componentWillReceiveProps(props){
      const { userlist, error, channel, userInfo} = props;
        if(userInfo){
        this.setState({heart: userInfo.heart})
      }
        if (userlist.length > 0 ) {
            this.setState({data: userlist, isLoading: false})
        }
        if (channel) {
          console.log('channel',channel)
            this.props.groupChannelProgress(true);
            this.props.addGroupChannelItem(channel);
            this.props.navigation.navigate('GroupChannel')
            this.props.onGroupChannelPress(channel.url);

        }
    }


   _keyExtractor(item, index) {
     return item.nickname
   }



  render() {
    return (
      <View>
        <Spinner visible={this.state.isLoading} />
        <SHeader
          onLeftPress={()=>this.props.navigation.navigate('Store')}
          onRightPress={()=>this.props.navigation.navigate('Menu')}
          heart={this.state.heart}
        />
        {this.renderFlatList()}
      </View>
    );
  }
}

const mapStateToProps = ({ list, groupChannelInvite, profile}) => {
  const { userlist, error } = list;
  const { channel } = groupChannelInvite;
  const { userInfo } = profile;

  return {userlist, error, channel, userInfo};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
    mapStateToProps,
    { initUserlist,
      initInvite,
      getUserlist,
      createGroupChannel,
      groupChannelProgress,
      addGroupChannelItem,
      onGroupChannelPress,
      getCurrentUserInfo
    }
)(List);
