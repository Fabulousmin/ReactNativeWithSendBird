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
    }
    onEndReached = async () => {

   };

   onRefresh = async () => {

   }

   onCreateButtonPress = (send) => {
    const inviteUserIdList = [send]
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
        this.props.initInvite();
        this.setState({ isLoading: true }, async () => {
          await this.props.getUserlist();
        });

    }

    componentWillReceiveProps(props){
      const { userlist, error,channel} = props;
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
        />
        {this.renderFlatList()}
      </View>
    );
  }
}

const mapStateToProps = ({ list,groupChannelInvite}) => {
  const { userlist, error } = list;
  const { channel } = groupChannelInvite;

  return {userlist, error,channel};
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
    }
)(List);
