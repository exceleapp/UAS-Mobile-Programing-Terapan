import React from 'react';
import firebase from "firebase";
import {createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';

import AuthLoadingScreen from './components/AuthLoadingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import DrawerNavigator from './navigation/DrawerNavigator';

import { StyleSheet, Text, View } from 'react-native';

const AppStack = createStackNavigator({ Home: DrawerNavigator},{headerMode:'none'});
const AuthStack = createStackNavigator({ Login: LoginScreen }, { headerMode: 'none' });

const AppContaner =  createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends React.Component {
  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyDz3uRdRc8Ev0zciqh68PgFTOu1eAil6Bs",
    authDomain: "striped-option-225207.firebaseapp.com",
    databaseURL: "https://striped-option-225207.firebaseio.com",
    projectId: "striped-option-225207",
    storageBucket: "striped-option-225207.appspot.com",
    messagingSenderId: "840046022951",
    appId: "1:840046022951:web:164ff813c5d8cc77"
    });

  }
  render() {
    return (
      <AppContaner />
    );
  }
}
