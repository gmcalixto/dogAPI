import React from "react";

import {
StyleSheet,
View,
Platform,
TextInput,
Keyboard,
Text,
TouchableWithoutFeedback,
TouchableOpacity,
ToastAndroid,
Alert,
ActivityIndicator
} from "react-native";

import User from './components/User';

//verifica se o dicionario está vazio
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

//criar alerta para iOS
function createAlert() {
    Alert.alert(
      "Tarefa 1",
      "Informe um ID válido",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
}

export default class ExemploGetJSON extends React.Component {
  


  constructor(props) {
      super(props);
  }

  state = {
        image_source: '',
        animating: false
      };

  componentDidMount(){
    this.fetchJSON();

  }

  fetchJSON(){
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then((responseJson)=> {

      console.log(responseJson)

      if(isEmpty(responseJson)){
          if(Platform.OS === 'ios'){
            createAlert();
          }
          else{
            ToastAndroid.show("Infome um ID válido", ToastAndroid.SHORT);
          }
      }
      else{

        var image_source = { uri: responseJson['message'] };
        this.setState({image_source: image_source})
      }

      this.setState({animating: false});

    
    })
    .catch(error=>console.log(error))
  }



render(){

  return( 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.loader}>
        
        <User 
          image_source={this.state.image_source}/>

        <TouchableOpacity
              onPress={
                ()=>{
                  this.setState({animating: true});
                  this.fetchJSON();
                }}>
                    <Text style={styles.button}>Buscar</Text>
        </TouchableOpacity>

        <ActivityIndicator 
          animating={this.state.animating}
          size="small" 
          color="#00ff00"/>


      </View>
    </TouchableWithoutFeedback>
)
}

}
const styles = StyleSheet.create({
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
button:{
    borderColor:'black',
    borderWidth: 1,
    fontSize: 20,
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto',
    marginTop: 20,
    backgroundColor: 'grey',
    textAlign: 'center'
  },
});
