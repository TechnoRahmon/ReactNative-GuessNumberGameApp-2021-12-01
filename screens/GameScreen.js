import React , { useState, useRef, useEffect } from 'react'
import {View ,Text,  StyleSheet, ScrollView , Alert , FlatList , Dimensions } from 'react-native'

import NumberContainer from './../Components/NumberContainer'
import Card  from './../Components/Card'
import TitleText from '../Components/TitleText'
import MainButton from '../Components/MainButton'
import { Ionicons } from '@expo/vector-icons'
import BodyText  from './../Components/BodyText'
import * as ScreenOrientation from 'expo-screen-orientation'

const generateRandomBetween =( min , max , exclude ) =>{
    min = Math.ceil(min)
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min) ) +min
    if ( rndNum === exclude ){
        return generateRandomBetween(1,100,exclude)
    }else
        return rndNum ; 
}

// item component for item list 
const ListItem =(listLength, dataItem)=>( 
            <View  style={styles.listItem}>
                <BodyText>#{listLength-dataItem.index }</BodyText>
                <BodyText>{dataItem.item }</BodyText>
             </View> )


export default function GameScreen({userChoice , onGameOver }) {
    
    // to lock the orientatoin to POrtrait 
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    const [currentGuess, setCurrentGuess  ]= useState(generateRandomBetween(1,100,userChoice))

    const [ pastGuesses , setPastGuesses ] = useState([currentGuess]);
    const currentHight = useRef(100);
    const currentLow = useRef(1);
    const [availableDeviceWidth , setAvailableDeviceWidth ] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight , setAvailableDeviceHeight ] = useState(Dimensions.get('window').height)

    const nextGuessHandler = direction =>{
        if ( (direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice ) ){
                Alert.alert('False Hint' , 'You Provided Incorrect Hint...',
                    [{ text:'Sorry' , style:'cancel'}])
            return;
        }
        
        if ( direction ==='lower'){
            currentHight.current = currentGuess;
        }else{
            currentLow.current= currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess);
        setCurrentGuess(nextNumber)
        //setRounds(currentRound => ++currentRound )
        setPastGuesses([ nextNumber , ...pastGuesses  ])
    }


    useEffect(()=>{
        const upddateLayout=()=>{
            setAvailableDeviceHeight(Dimensions.get('window').height)
            setAvailableDeviceWidth(Dimensions.get('window').width)
        }
        Dimensions.addEventListener('change',upddateLayout)
        return()=>{
            Dimensions.removeEventListener('change',upddateLayout)
        }
    })

    useEffect(()=>{
        if ( currentGuess === userChoice ){
            onGameOver(pastGuesses.length);
        }
    },[currentGuess, onGameOver , userChoice ])

    if( availableDeviceHeight<500){
        return (
            <View style={styles.screen}>
            <TitleText >Opponent's Guess</TitleText>
            <View style={styles.controls}>
                <MainButton title={<Ionicons name="remove"  size={24} color="#fff" />} onPress={nextGuessHandler.bind(this,'lower')}/>
                <NumberContainer>{currentGuess} </NumberContainer>
                <MainButton title={<Ionicons name="add"  size={24} color="#fff" />}  onPress={nextGuessHandler.bind(this,'greater')} />
            </View>

                <View style={styles.list}>
                    {/* <ScrollView contentContainerStyle={styles.scrollList}>
                        {pastGuesses.map((item,index)=> ListItem(item,pastGuesses.length-index))}
                    </ScrollView> */}
                    <FlatList 
                    contentContainerStyle={styles.scrollList}
                    keyExtractor={item => item}
                    data={pastGuesses} 
                    renderItem={ListItem.bind(this,pastGuesses.length)}/>
                </View>
              
        </View>
        )
    }

    return (
        <View style={styles.screen}>
            <TitleText >Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess} </NumberContainer>
                <Card style={styles.buttonContainer}>
                    <MainButton title={<Ionicons name="remove"  size={24} color="#fff" />} onPress={nextGuessHandler.bind(this,'lower')}/>
                    <MainButton title={<Ionicons name="add"  size={24} color="#fff" />}  onPress={nextGuessHandler.bind(this,'greater')} />
                </Card>

                <View style={styles.list}>
                    {/* <ScrollView contentContainerStyle={styles.scrollList}>
                        {pastGuesses.map((item,index)=> ListItem(item,pastGuesses.length-index))}
                    </ScrollView> */}
                    <FlatList 
                    contentContainerStyle={styles.scrollList}
                    keyExtractor={item => item}
                    data={pastGuesses} 
                    renderItem={ListItem.bind(this,pastGuesses.length)}/>
                </View>
              
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    controls:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        width:'80%'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:Dimensions.get('window').height>600 ? 20 : 5,
        width:400,
        maxWidth:'90%'
    },
    listItem:{
        borderColor:'grey',
        borderWidth:1,
        padding :15,
        marginVertical:15,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    list :{
        width:Dimensions.get('window').width>350? '60%' : '80%',
        flex:1
    },
    scrollList:{
        // alignItems:'center',
        justifyContent:'flex-end',
        flexGrow:1
    }
})
