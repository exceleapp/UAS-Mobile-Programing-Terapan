import React, { Component } from 'react'
import MenuButton from '../components/MenuButton';
import { KeyboardAvoidingView,TextInput,Text, View, Button, ActivityIndicator, StatusBar, FlatList, StyleSheet} from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

export default class TodosPage  extends Component {
  constructor(props){
    console.disableYellowBox=true;
    super(props)
    this.ref = firebase.firestore().collection('todos');
    this.unsubscribe=null;
    this.state={
      title:'',
      todos:[],
      loading:true
    };
  };

  componentDidMount(){
      this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount = () => {
      this.unsubscribe();
  };
  
  onCollectionUpdate=(querySnapshot)=>{
      const todos=[];
      querySnapshot.forEach((doc)=>{
        const {title, complete}=doc.data();
        todos.push({
          key:doc.id,
          doc,
          title,
          complete
        })
      });
      this.setState({
        todos,
        loading:false
      })
  }

  _addTodo=()=>{
      this.ref.add({
        title:this.state.title,
        completed:false
      });

      this.setState({title:''})
  }
render() {
  if(this.state.loading){
    return(
      <View>
        <ActivityIndicator></ActivityIndicator>
        <StatusBar barStyle="default"></StatusBar>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView behavior="padding" enabled >
            <View style={styles.container}>
            <MenuButton navigation={this.props.navigation}/>
            <View style={{ flexDirection: 'row', marginTop: 100, alignSelf:'center' }}>
        <TextInput
          placeholder="Your todos"
          value={this.state.todo}
          onChangeText={(text)=>this.setState({title:text})}
          style={{width: '80%', padding: 5, borderRadius: 5, borderColor: '#ccc', borderBottomWidth: 1}}/>
        <Button
        title="Add"
        disabled={!this.state.title.length}
        onPress={this._addTodo}
         />
      </View>
      
      <FlatList style={{marginLeft: 20}}
        data={this.state.todos}
        renderItem={({item})=>
          <Text>{item.title}</Text>}
          style={{marginLeft:10}}>
      </FlatList>
      </View>
    </KeyboardAvoidingView>
    
  )
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
