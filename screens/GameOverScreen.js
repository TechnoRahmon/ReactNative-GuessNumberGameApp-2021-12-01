import React, {useState , useEffect } from 'react'
import {View ,Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native'
import TitleText from '../Components/TitleText'
import BodyText from '../Components/BodyText'
import Color from './../constant/colors'

import MainButton from '../Components/MainButton'

export default function GameOverScreen({numOfRounds , userNumber,onRestart}) {
    const [ availableDeviceWidth , setAvailableDeviceWidth ] = useState(Dimensions.get('window').width)
    const [ availableDeviceHeight , setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    const [dynamicStyle , setDynamicStyle ] = useState({
        imageContainer:{
            width:Dimensions.get('window').width*0.7,
            height:Dimensions.get('window').width*0.7,
            borderRadius:Dimensions.get('window').width*0.7/2,
            marginVertical:Dimensions.get('window').height /30
        },
        ResultContainer:{
            marginVertical:Dimensions.get('window').height /60
        },
        resultText:{
            fontSize:Dimensions.get('window').height < 500 ? 16 :20
        },
    })
    
    useEffect(()=>{
         // if screen width change 
         const updateLayout=()=>{
                setDynamicStyle({ 
                    imageContainer:{
                        width:Dimensions.get('window').width*0.7,
                        height:Dimensions.get('window').width*0.7,
                        borderRadius:Dimensions.get('window').width*0.7/2,
                        marginVertical:Dimensions.get('window').height /30
                    },
                    ResultContainer:{
                        marginVertical:Dimensions.get('window').height /60
                    },
                    resultText:{
                        fontSize:Dimensions.get('window').height < 500 ? 16 :20
                    },
                })
            }
            
         Dimensions.addEventListener('change' , updateLayout); 
        return()=>{
            Dimensions.removeEventListener('change',updateLayout)
        }
    })



    return (
      
            <ScrollView>
                <View style={styles.screen}>
                    <TitleText>The Game is Over!</TitleText> 
                    <View style={{...styles.imageContainer,...dynamicStyle.imageContainer}}>
                        <Image 
                        style={styles.image} 
                        // source={require('./../assets/success-1.jpg')} 
                        source={{uri:'https://image.shutterstock.com/image-vector/concept-robotics-engineering-children-hold-260nw-2002693655.jpg'}} 
                        />
                    </View>

                    <View style={{...styles.ResultContainer, ...dynamicStyle.ResultContainer}}>
                        <BodyText style={{...styles.resultText,...dynamicStyle.resultText}}>
                            Your Phone Needed <Text style={styles.hightlight}> {numOfRounds}</Text> Rounds To Guess  
                            Number <Text style={styles.hightlight}>{userNumber}</Text>
                        </BodyText>
                    </View>
                
                
                    <View  >
                        <MainButton title="New Game" onPress={onRestart} />
                    </View>
                
                </View>
            </ScrollView>
   
    )
}

const styles = StyleSheet.create({  
    screen:{
        flexGrow:1,
        justifyContent:"center",
        alignItems:'center',
        paddingVertical:10
    },
    button:{
        marginVertical:15
    },
    imageContainer:{
     
        borderWidth:3,
        borderColor:'black',
      
        overflow:'hidden',
        justifyContent:'flex-start',
      
    },
    image:{
        width:'100%',
        height:'100%'
    },
    ResultContainer:{
        marginHorizontal:30,
        marginVertical:Dimensions.get('window').height /60
    },
    resultText:{
        textAlign:'center',
        fontSize:Dimensions.get('window').height < 500 ? 16 :20
    },
    hightlight:{
        color:Color.primary,
        fontFamily:'open-sans-bold',
        margin:5
        

    }
})
