/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SHeader } from '../components';
export default class ChatSelection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SHeader
          onLeftPress={()=>this.props.navigation.navigate('Store')}
          onRightPress={()=>this.props.navigation.navigate('MenuStack')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
