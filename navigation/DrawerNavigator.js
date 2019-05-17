import React from 'react';
import { Platform, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {createAppContainer,createDrawerNavigator,createStackNavigator,createBottomTabNavigator} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapsPage from '../screens/MapsPage';
import TodosPage from '../screens/TodosPage';

import InfoPage from '../Tab/InfoPage';
import ContactPage from '../Tab/ContactPage';

import MenuDrawer from '../components/MenuDrawer';


const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.78,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}

const Tabs = createBottomTabNavigator({
    Home: HomeScreen,
    Info: InfoPage,
    Contact: ContactPage
},
 {defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      if (routeName === 'Home') {
        return (
          <Ionicons
          name ="md-home" color ="#9b59b6" size={25}
            style={{ width: 25, height: 25, }} />
        );
      } else if(routeName === 'Info') {
        return (
            <Ionicons
            name ="md-information-circle" color ="#9b59b6" size={25}
              style={{ width: 25, height: 25, }} />
        );
      } else if(routeName === 'Contact') {
        return (
            <Ionicons
            name ="md-contact" color ="#9b59b6" size={25}
              style={{ width: 25, height: 25, }} />
        );
      } 
    },
  }),
    
});

const DrawerNavigator = createDrawerNavigator(
    {
		Home: {
			screen: Tabs
		},
		Profile: {
			screen: ProfileScreen
		},
		Todos: {
			screen: TodosPage
		},
		Map: {
			screen: MapsPage
    }
	},
    DrawerConfig

);


const StackNavigator = createStackNavigator({
    DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null,
        },tabBarOptions: {
          activeTintColor: '#000',
          inactiveTintColor: 'white',
          style: {
              backgroundColor: '#9b59b6',
              fontSize: 25,
          },
          indicatorStyle: {
              backgroundColor: '#fff',
          },
      }
    }
});

export default  createAppContainer (StackNavigator);