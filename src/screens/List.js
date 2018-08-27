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
  getCurrentUserInfo,
  initHeart,
  getHeart
} from '../actions';
import { UserList } from '../UserList';
import { CardImage, Spinner, SHeader } from '../components';
import {sbGetChannelTitle,
  sbCreateGroupChannelListQuery,
  sbGetGroupChannelList,
  sbCreateGroupChannel,
} from '../sendbirdActions';
import { connect } from 'react-redux';
import { sOnPressLike, sGetCurrentUserInfo } from '../subyeonActions';
import { Header, Icon, Text } from 'react-native-elements';
import firebase from '@firebase/app'
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

   async checkChannel(sendId){
     const arr = [];
     const query = sbCreateGroupChannelListQuery();
     const channelList = await sbGetGroupChannelList(query);
     const channel = await sbCreateGroupChannel([sendId],true)
     const channelUrl = channel.url
     for (var i=0; i<channelList.length;i++){
       arr.push(channelList[i].lastMessage.channelUrl)
     }
    const check = arr.includes(channelUrl)
    return check
   }


   onCreateButtonPress = (sendId) => {
    const inviteUserIdList = [sendId]
    console.log('보자아이디',sendId)
    const arr=[];
    const currentuser  = firebase.auth().currentUser.uid
    const database = firebase.database();
    const heart = database.ref().child("users/"+currentuser)
    this.checkChannel(sendId)
      .then((check) =>{
        if(check == false){
    heart.on('child_added',function(snap){
      arr.push(snap.val())})
    const userheart = arr[2]
    if (userheart >= 5) {
       Alert.alert(
         '채팅방 열기',
          '하트 5개가 사용됩니다',
          [
              {text: '확인', onPress: () => {
                const updatedheart = userheart - 5
                database.ref('users/'+currentuser).update({heart:updatedheart})
                const isDistinct = true;
                this.props.createGroupChannel(inviteUserIdList, isDistinct);
              }},
              {text: '취소'}
          ])
    }
    else{
      Alert.alert(
                '하트가 부족합니다.',
                '채팅을 하기 위해서는 하트가 필요합니다.',
                [
                    {text: '충전하기', onPress: () => {
                        this.props.navigation.navigate('Store')
                    }},
                    {text: '취소'}
                ]
            );
          }
        }
        else{
            this.props.createGroupChannel(inviteUserIdList, true);
        }
      })
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
        this.props.initInvite();
        this.props.initHeart();
        this.props.getCurrentUserInfo();
        this.props.getHeart();
        this.setState({ isLoading: true }, async () => {
          await this.props.getUserlist();
        });

    }

    componentWillReceiveProps(props){
      const { userlist, error, channel, userInfo, heart} = props;
        if(userInfo){
        this.setState({heart: heart})
      }
        if (userlist.length > 0 ) {
            this.setState({data: userlist, isLoading: false})
        }
        if (channel) {
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
          onRightPress={()=>this.props.navigation.navigate('MenuStack')}
          heart={this.state.heart}
        />
        {this.renderFlatList()}
      </View>
    );
  }
}

const mapStateToProps = ({ list, groupChannelInvite, profile , store}) => {
  const { userlist, error } = list;
  const { channel } = groupChannelInvite;
  const { userInfo } = profile;
  const { heart } = store;
  return {userlist, error, channel, userInfo, heart};
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
      getCurrentUserInfo,
      initHeart,
      getHeart
    }
)(List);
