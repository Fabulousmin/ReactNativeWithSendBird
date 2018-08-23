/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SHeader } from '../components';
export default class Store extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SHeader
          onLeftPress={()=>this.props.navigation.navigate('Store')}
          onRightPress={()=>this.props.navigation.navigate('Menu')}
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
