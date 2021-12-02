import React, { useState, useEffect } from 'react'
import {
    View,
     StyleSheet,
      Text, 
      TextInput,
       Button,
       TouchableWithoutFeedback,
       Keyboard,
       Alert,
       Dimensions,
       ScrollView,
       KeyboardAvoidingView
     } from 'react-native'

import Card from './../Components/Card'
import Colors from '../constant/colors'
import Input from '../Components/Input'
import NumberContainer from './../Components/NumberContainer'
import BodyText from '../Components/BodyText'
import MainButton  from '../Components/MainButton'

export default function StartGameScreen({onStart}) {

    const [number , setNumber ] = useState('');
    const [ confirmed , setConfirmed ] = useState(false); 
    const [ selectedNumber , setSelectedNumber ] = useState('');
    const [buttonWidth , setButtonWidth ] = useState(Dimensions.get('window').width/4);

   


    /* Function */
    const _handelNumberChange =(text)=>{
            setNumber(text.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler =()=>{
            setNumber('');
            setConfirmed(false)
    }

    const confirmInputHandler =() => {
        const convertedNumber = parseInt(number);
        if ( isNaN(convertedNumber) || convertedNumber <= 0 || convertedNumber > 99 ){
            Alert.alert('Invalid number!','Number has to be between 1 and 99' ,
             [{text:'Okay', style:'destructive' , onPress:resetInputHandler}])
            return ; 
        }
        setSelectedNumber(convertedNumber)
        setConfirmed(true)
        setNumber('');
        Keyboard.dismiss()
    }
    useEffect(()=>{
      // if screen width change 
        const updateLayout=()=>{
            setButtonWidth(Dimensions.get('window').width/4)
            }
         Dimensions.addEventListener('change' , updateLayout); 
        return()=>{
            Dimensions.removeEventListener('change',updateLayout)
        }
    })

    let confirmedOupput ; 
    if (confirmed){
        confirmedOupput =
        <Card style={styles.confirmedCrad}>
            <BodyText>You Selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
           
                    <MainButton title="START GANE" onPress={()=>{onStart(selectedNumber)}} />
           
        </Card>
    }



    return (
        <ScrollView>
            {/* behavior for IOS : position , and adnroid :padding*/}
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="30">
                <TouchableWithoutFeedback onPress={()=>{  Keyboard.dismiss()}}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>  Start a New Game! </Text>

                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                        <Input style={styles.input} 
                            blurOnSubmit 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            keyboardType="number-pad" 
                            maxLength={2}
                            onChangeText={_handelNumberChange}
                            value={number}
                            />


                            <View style={styles.buttonContainer}>
                                <View style={{width:buttonWidth}}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                                </View>
                                <View style={{width:buttonWidth}}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                                </View>
                            </View>

                        </Card>

                    
                        {confirmedOupput}
                    
                    

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        paddingVertical:10
    },
    title:{
        fontSize:20,
      
        fontFamily:'open-sans-bold'
    },

    inputContainer:{
        width:'80%',
        minWidth:300,
        maxWidth:'95%',
        justifyContent:"center",
        alignItems:"center",
    },
    input :{
        width:50,
        textAlign:'center',
        marginBottom:15
    },
    buttonContainer:{
        flexDirection:"row",
        width:'100%',
        justifyContent:"space-between"

    },
   
    confirmedCrad:{
        marginTop:20,
        justifyContent:'space-between',
        alignItems:'center'
    }
})