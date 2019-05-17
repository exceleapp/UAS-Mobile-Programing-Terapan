import React, { Component } from 'react';
import MenuButton from '../components/MenuButton';

import { View,StyleSheet, Text } from 'react-native';

export default class InfoPage extends Component {
  static navigationOptions ={ title : 'Info'}
  render() {
    return (

      <View style={styles.container}>
      <MenuButton navigation={this.props.navigation}/>
        <Text>173140714111001 M Naufal Dzikrullah</Text>
        <Text>173140714111002 Ilham Khoirul L</Text>
        <Text>173140714111007 Faris Wibowo P</Text>
        <Text>173140714111008 Excel Anggara P P</Text>
      </View>
      
    );
  }
}

const styles= StyleSheet.create({
  container:  {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  text:{
    fontSize: 30,
    color: '#8e44ad'
  }
})
