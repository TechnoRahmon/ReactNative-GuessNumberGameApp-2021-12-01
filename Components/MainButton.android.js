import React from 'react'
import {View , TouchableOpacity , Text , StyleSheet, TouchableNativeFeedback, Platform  } from 'react-native'
import Color from '../constant/colors'

export default function MainButton({title , onPress }) {

    let ButtonComponent = TouchableOpacity;

    if (  Platform.Version >= 21 ){
        ButtonComponent = TouchableNativeFeedback; 
    }

    return (
        <View style={styles.buttonContainer }>
            <ButtonComponent onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}> {title} </Text>
                </View>
            </ButtonComponent>
        </View>
       
    )
}
const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius:25,
        overflow:'hidden'
    },
    button:{
        backgroundColor:Color.primary,
        paddingVertical :12,
        paddingHorizontal:30,
        borderRadius:25
    },
    buttonText:{
        color: '#fff',
        fontFamily:'open-sans',
        fontSize:18
    }
})