import React from 'react';
import firebase from 'firebase';
import { View, ActivityIndicator,StatusBar} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
      super(props);
      this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync =  () => {
     firebase.auth().onAuthStateChanged((user)=>{
         if(user){
             this.props.navigation.navigate('App')
         }else {
            this.props.navigation.navigate('Auth');
         }
     })
  };

  // Render any loading content that you like here
  render() {
      return (
          <View>
              <ActivityIndicator />
              <StatusBar barStyle="default" />
          </View>
      );
  }
}