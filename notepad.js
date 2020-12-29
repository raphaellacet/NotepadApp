import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from "react-native-community/async-storage";
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';

export default function Notepad() {

    const [estado,setarEstado] = useState('leitura');
    const [anotacao,setarAnotacao] = useState('');


    useEffect(()=>{

        //Read the Key note when the App runs

        (async () => {
            try{
                const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
                setarAnotacao(anotacaoLeitura); 
            }catch(error){}
        })();

    },[])

    
    setData = async() => {
        try{
            await AsyncStorage.setItem('anotacao',anotacao);
        }catch(error){

        }

        alert('Your notes were saved!');
    }
    
    function atualizarTexto(){
        setarEstado('leitura');
        setData();
    }

    if(estado == 'leitura'){
    return(
      <View style={{flex:1}}>
        <StatusBar hidden />
        <View style={styles.header}><Text style={{textAlign:'center',color:'white',fontSize:20}}>Notepad</Text></View>
        {
        (anotacao != '')?
        <View style={{padding:20}}><Text style ={styles.anotacao}>{anotacao}</Text></View>
        :
        <View style={{padding:20}}><Text style={{opacity:0.3}}>NO notes were found!</Text></View>
        }
        <TouchableOpacity onPress={()=> setarEstado('atualizando')} 
        style={styles.btnAnotacao}>
          {
          (anotacao == "")?
          <Text style={styles.btnAnotacaoTexto}>+</Text>
          :
          <Text style={{fontSize:12,color:'white',textAlign:'center',marginTop:22}}>EDIT</Text>
          }
          </TouchableOpacity>       
      </View>

  )
  }else if(estado == 'atualizando'){
    return(
    <View style={{flex:1}}>
      <StatusBar hidden />
      <View style={styles.header}><Text style={{textAlign:'center',color:'white',fontSize:18}}>Notepad</Text></View>
    
      <TextInput autoFocus={true} onChangeText={(text)=>setarAnotacao(text)} style={{padding:20,textAlignVertical:'top'}} multiline={true} numberOfLines={5} value={anotacao}></TextInput>

      <TouchableOpacity onPress={()=> atualizarTexto()} style={styles.btnSalvar}><Text style={{textAlign:'center',color:'white'}}>Save</Text></TouchableOpacity>
    </View>
  );
  }

}


const styles = StyleSheet.create({
      header:{
        width: '100%',
        paddingTop: 30,
        backgroundColor: '#069'
      },
      anotacao:{
        fontSize:14
      },
      btnAnotacao:{
        position:'absolute',
        right:20,
        bottom:20,
        width:60,
        height:60,
        backgroundColor:'#069',
        borderRadius:30
      },
      btnAnotacaoTexto:{
        color:'white',
        position:'relative',
        textAlign:'center',
        top:10,
        fontSize:30
      },
      btnSalvar:{
        position:'absolute',
        right:0,
        bottom:20,
        height:360,
        width:100,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#069'
      },
});


