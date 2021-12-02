import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';

// import font 
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

// impoting component
import Header from './Components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

// fetchFonts 
const fetchFonts =  ()=>{
   return Font.loadAsync({
      'open-sans':  require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold':  require('./assets/fonts/OpenSans-Bold.ttf'),
    })
}

export default function App() {

  const [ userNumber , setUserNumber ] = useState();
  const [ roundNumber , setRoundNumber ] = useState(0);
  const [ DataLoaded , setDataLoaded ] = useState(false)

    if (!DataLoaded){
        return <AppLoading 
                startAsync={fetchFonts}
                onError={console.log}
                onFinish={()=>{ setDataLoaded(true)}}
                />
    }

    const startGameHandler = (selectedNumber)=>{
        setUserNumber(selectedNumber)
        setRoundNumber(0)

    }
      
    const GameOverHandler= (numOfRounds) => {
        setRoundNumber(numOfRounds)

    }

    const RestratGame =()=>{
        setUserNumber(null);
        setRoundNumber(0);
    }

    // show the startGameScreen as default screen
    let content = <StartGameScreen onStart={startGameHandler}/>

    // if user Number is exisit show the GameScreen 
    if (userNumber && roundNumber<=0 )
      content = <GameScreen userChoice={userNumber} onGameOver={GameOverHandler} />
    else if (roundNumber > 0 )
      content = <GameOverScreen numOfRounds={roundNumber} userNumber={userNumber} onRestart={RestratGame} />


  return (
    <SafeAreaView style={styles.screen}>
     
        <Header title="Guess A Number" />

          {content}

     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screen:{
      flex:1
    }
});
