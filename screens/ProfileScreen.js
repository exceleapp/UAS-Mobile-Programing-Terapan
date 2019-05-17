import React from "react";
import { KeyboardAvoidingView, View, Button,StyleSheet, TextInput, Alert, Image,TouchableOpacity } from 'react-native'
import firebase from "firebase";
import Spinner from "../Spinner/Spinner";
import MenuButton from '../components/MenuButton';
import { ImagePicker,Permissions } from "expo";
import uuid from 'uuid';
export default class ProfileScreen extends React.Component {
  static navigationOptions ={ title : 'Profile'}
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            email: null,
            photoUrl: null,
            hasCameraRollPermission:null,
        }
    }
    
    async componentWillMount() {
        const {statusCameraRoll}=await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({hasCameraRollPermission:statusCameraRoll === 'granted'})
    }
    

    componentDidMount() {
        this._getCurrentUser();
    }

    _getCurrentUser = async () => {
        let user = await firebase.auth().currentUser;
        console.log(user);
        if (user != null) {
            this.setState({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            })
        }
    }

    _updateProfile = () => {
        this.setState({ loading: true })
        var user = firebase.auth().currentUser;
        var credential;

        user.updateProfile({
            displayName: this.state.name,
            photoURL: this.state.photoURL,
        }).then(function () {
            Alert.alert('Success', 'Update Data successfull')
            this.setState({ loading: false })

        }).catch(function (error) {
            Alert.alert('Error', 'Error happened')
        });


        user.updateEmail(this.state.email).then((user) => {
            Alert.alert('Success', 'Email update')
            this.setState({ loading: false })

        }).catch(function (error) {
            Alert.alert('Error', 'Error happened')
        });


    }
    _renderButtonOrSpinner = () => {
        if (this.state.loading) {
            return <Spinner />;
        }
        return <Button onPress={this._updateProfile} title="Update" />;
    }

    static navigationOptions = {
        title: 'Home',
    };

    _pickImage = async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
        // let result = await ImagePicker.launchCameraAsync({
            allowsEditing:true,
            aspect:[1,1]
        });
        if(!result.cancelled){
            this.uploadImage(result.uri)
        }
    }

    uploadImage= async(uri)=>{
        const blob = await new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.onload = function(){
                resolve(xhr.response);
            }
            xhr.onerror = function(e){
                console.log(e);
                reject(new TypeError('Network request failed'));
            }
            xhr.responseType = 'blob';
            xhr.open('GET',uri,true);
            xhr.send(null);
        });

        const ref = firebase.storage().ref().child(uuid.v4());
        const snapshot = await ref.put(blob);
        blob.close();
        snapshot.ref.getDownloadURL().then((url)=>{
            this.setState({ photoURL: url })
        });
        return await snapshot.ref.getDownloadURL();
    }

    render() {
        return (
            <View style={styles.container}>
            <MenuButton navigation={this.props.navigation}/>
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} behavior="padding" enabled>
                <TouchableOpacity onPress={this._pickImage}>
                    <Image source={{ uri: this.state.photoURL }} style={{ width: 200, height: 200, borderRadius: 100 }} />
                </TouchableOpacity>
                <TextInput style={{ width: '90%', borderRadius: 5, borderColor: "grey" }} value={this.state.name} onChangeText={(text) => { this.setState({ name: text }) }} placeholder="Name" />
                <TextInput style={{ width: '90%', borderRadius: 5, borderColor: "grey" }} value={this.state.email} onChangeText={(text) => { this.setState({ email: text }) }} placeholder="Email" />
                <View style={{ width: '90%', marginBottom: 10 }}>
                    {this._renderButtonOrSpinner()}
                </View>
                <View style={{ width: '90%', marginBottom: 10 }}>
                    <Button title="Logout" onPress={this._signOutAsync} />
                </View>
            </KeyboardAvoidingView>
            </View>
        );
    }

    _signOutAsync = () => {
        firebase.auth().signOut().then(function () {
            this.props.navigation.navigate('Auth');
        }).catch(function (error) {
            console.log(error)
        });
    };
}

const styles= StyleSheet.create({
    container:  {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  
    }
  })