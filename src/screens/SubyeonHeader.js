import React, { Component } from 'react';
import { View, Text, Header } from 'react-native-elements';

const SubyeonHeader = (props) => {
  return(
    <Header
      leftComponent={

        <Icon type='font-awesome' name='heart' color='white' onPress={()=>this.props.navigation.navigate('Store')}/>
        <Text>+30</Text>
      }
      centerComponent={<Text style={{color:'white',fontWeight: '600'}}>수변의 온도</Text>}
      rightComponent={<Icon type='font-awesome' name='cog' color='white' onPress={()=>this.props.navigation.navigate('Menu')}/>}
      backgroundColor='#74b9ff'
    />
  )
}

export { SubyeonHeader };
