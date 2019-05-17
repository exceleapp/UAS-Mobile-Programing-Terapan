import React, { Component } from 'react'
import { KeyboardAvoidingView,TextInput,View,Button,FlatList,Text,StyleSheet } from 'react-native';
import MenuButton from '../components/MenuButton';

import { SQLite } from "expo";
const db = SQLite.openDatabase('db.db');

export default class ContactPage extends Component {
    static navigationOptions = {
        title: 'Contact'
    }
    constructor(props) {
        super(props)
        
        this.state = {
            title:'' ,
            todos:[]    
        };
        
    };
    componentDidMount() {
        db.transaction(tx =>{
            tx.executeSql(
                'create table todos (id integer primary key not null, title text, complete int)'
            )
        })
        this._getData()

    }
    
    
    render() {
        return (
            
            
            <KeyboardAvoidingView behavior="padding" enabled >
            <View style={styles.container}>
            <MenuButton navigation={this.props.navigation}/>
                <View style={{ flexDirection: 'row', marginTop: 100, alignSelf:'center' }}>
                    <TextInput
                        placeholder="Contact SQLite"
                        value={this.state.title}
                        onChangeText={(text) => this.setState({ title: text })}
                        style={{ width: '80%', padding: 5, borderRadius: 5, borderColor: '#ccc', borderBottomWidth: 1, }}
                    />
                    <Button
                        title="Add"
                        disabled={!this.state.title.length}
                        onPress={this._addData} />
                </View>
                <FlatList style={{marginLeft: 20}}
                    data={this.state.todos}
                    renderItem={({item}) => <Text >{item.title} </Text> }
                    keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
            </KeyboardAvoidingView>
            
        )
    }

    _addData = ()=>{
        let title = this.state.title;
        db.transaction(tx=>{
            tx.executeSql('insert into todos (complete,title) values (0,?) ',[title])
        },
        null, //error
        this.setState({title:''}) //success
        )
        this._getData()
    }

    _getData=()=>{
        db.transaction(tx => {
            tx.executeSql('select * from todos', [],(_,{rows})=>
                this.setState({ todos: rows._array })
            );
        });
    }
}
const styles = StyleSheet.create({
    container: {

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