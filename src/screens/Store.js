import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { ListItem, Divider, Button, Text } from 'react-native-elements'
import { connect } from 'react-redux';
import { initHeart, getHeart, updateHeart } from '../actions';
import { SHeader } from '../components';

const renderRightButton = (dallars) => {
  return (
    <View
       style={{width:100, height:45, marginRight:15, borderWidth:1,  borderRadius: 10, borderColor: '#00cec9'
       ,alignItems: 'center', justifyContent: 'center'
    }}>
      <Text style={{color: '#00cec9', fontSize: 15}}>US{dallars}$</Text>
      </View>
  )
}

const list = [
  {
    name: '   20 하트',
    element: renderRightButton(2),
    heart: 20
  },
  {
    name: '   50 하트',
    element:renderRightButton(5),
    heart: 50
  },
  {
    name: '   100 하트',
    element: renderRightButton(8),
    heart: 100
  },
  {
    name: '   200 하트',
    element: renderRightButton(14),
    heart: 200
  },
  {
    name: '   500 하트',
    element: renderRightButton(30),
    heart: 500
  },
]


class Store extends Component {


  state = {
    heart: 0,
    error: '',
  }


  componentDidMount() {

    this.props.initHeart();
    this.setState( () => { this.props.getHeart();});

  }

  componentWillReceiveProps(props) {
    const { error , heart } = props;
    if(heart){
      this.setState({heart: heart});
    }
  }

  onButtonBuyHeart = async (heart) => {
    const currentHeart = this.state.heart;
    await this.props.updateHeart(currentHeart + heart);
    await this.props.getHeart();
  }

  render() {
    return (
      <View style={styles.container}>
        <SHeader
          onLeftPress={()=>this.props.navigation.navigate('StoreStack')}
          onRightPress={()=>this.props.navigation.navigate('MenuStack')}
          heart={this.state.heart}
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
            onPress={async () => {this.onButtonBuyHeart(item.heart)}}
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

const mapStateToProps = ({store}) =>{
  const { heart, error } = store;
  return { heart , error };
}

export default connect(mapStateToProps, {initHeart , getHeart, updateHeart})(Store);

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
