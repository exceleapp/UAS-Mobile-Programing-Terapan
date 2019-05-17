import React, { Component } from 'react';
import MenuButton from '../components/MenuButton';

import { View,StyleSheet, TouchableOpacity,Text } from 'react-native';

export default class HomeScreen  extends Component {
    static navigationOptions ={ title : 'Home'}

  render() {
    return (

      <View style={styles.container}>
      <MenuButton navigation={this.props.navigation}/>

      <View style={styles.buttontext} >

        <TouchableOpacity onPress={ ()=> this.props.navigation.navigate('Profile')}>
                <View style={styles.button}>
                    <Text style={styles.textbutton}>
                        Profile
                    </Text>
                </View>
            </TouchableOpacity>
        </View>

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container: {
      
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
  button:{
    marginTop: 300,
    marginBottom:60,
    width: 120,
    height: 120,
    borderRadius: 150/2,
    alignItems:'center',
    shadowColor: 'rgba(46, 229, 157, 0.4)',
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 10,
    shadowOffset : { width: 1, height: 13},
    justifyContent: 'center',
    backgroundColor: '#9b59b6'
  },
   textbutton:{
    padding:5,
    textShadowColor: '#E91E63',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 5,
    fontSize:24,
    color:'white'
},
})
