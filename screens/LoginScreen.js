import React from 'react';
import { Alert, StyleSheet,ScrollView, View, Image, TextInput, Button,AsyncStorage,Text,KeyboardAvoidingView} from "react-native";
import firebase from "firebase";
import Spinner from "../Spinner/Spinner";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '', error: '', success: '', loading: false };
    }
    _onPressLogin = () => {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async data => {
                this.setState({ error: '', success: 'Authentication success!', loading: false });
                this.props.navigation.navigate('App');
                console.log(data.user)
                await AsyncStorage.setItem('userToken', data.user.accessToken);
            })
            .catch(e => {
                console.log(e)
                this.setState({ error: 'Authentication failed.', success: '', loading: false });
            });
    }
    _onPressCancel = () => {
        this.setState({ email: '' })
        this.setState({ password: '' })
        this.setState({ error: '', success: '', loading: false });

    }

    renderButtonOrSpinner() {
        if (this.state.loading) {
            return <Spinner />;
        }
        return <Button onPress={this._onPressLogin.bind(this)} title="Log in" />;
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Image source={require('../assets/user.png')} style={styles.image}></Image>
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                <Text style={styles.successTextStyle}>{this.state.success}</Text>
                <TextInput
                    value={this.state.email}
                    onChangeText={(inputan) => this.setState({ email: inputan })}
                    style={styles.email} placeholder="Email"></TextInput>
                <TextInput
                    value={this.state.password}
                    onChangeText={(inputan) => this.setState({ password: inputan })}
                    style={styles.password} placeholder="Password" secureTextEntry={true}></TextInput>
                <View style={styles.button}>
                    {this.renderButtonOrSpinner()}
                </View>
            </KeyboardAvoidingView>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8e44ad'
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 55,
    },
    email: {
        backgroundColor: 'white',
        borderRadius: 9,
        width: '65%',
        padding: 5,
        marginBottom: 30,
    },
    password: {
        backgroundColor: 'white',
        borderRadius: 9,
        width: '65%',
        padding: 5,
        marginBottom: 100,
    },
    button: {
        width: '28%',
        backgroundColor: '#ff9f43',
        marginBottom: 25,
    },
    errorTextStyle: {
        color: '#E64A19',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    successTextStyle: {
        color: '#33691e',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
    }
});