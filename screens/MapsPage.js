import React, { Component } from 'react';
import { Text, View, StyleSheet,Dimensions } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
const window = Dimensions.get('window');
const { width, height } = window;
import MenuButton from '../components/MenuButton';

export default class MapsPage  extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        mapRegion: { latitude: -7.966620, longitude: 112.632629, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        locationResult: null,
        location: { coords: { latitude: -7.966620, longitude: 112.632629 } },   
    };
  };
  
  componentWillMount() {
      this._getLocationAsync();
  }

  _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
          this.setState({
              locationResult: 'Permission to access location was denied',
              location,
          });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location), location });
  
  };

  render() {
      return (
          <View style={styles.container}>
          <MenuButton navigation={this.props.navigation}/>
              <MapView
                  style={{ alignSelf: 'stretch', height: window.height*0.8 }}
                  region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                  zoomEnabled={true}
                  scrollEnabled={true}
                  showsScale={true}
                  animateToRegion={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                  <MapView.Marker
                      coordinate={this.state.location.coords}
                      title="My Marker"
                      description="Some description"
                  />
              </MapView>

              <Text>
                  Location: {this.state.locationResult}
              </Text>

          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
  },
});