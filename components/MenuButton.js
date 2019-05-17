import React, { Component } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text,StyleSheet } from 'react-native';

export default class MenuButton extends Component {
  render() {
    return (

      <Ionicons
      name ="md-planet"
      color ="#9b59b6"
      size={32}
      style={styles.menuIcon}
      onPress={() => this.props.navigation.toggleDrawer()}
      />
    );
  }
}

const styles = StyleSheet.create({
  menuIcon:  {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,

  }
})
