import React from 'react'
import {View , TouchableOpacity , Text , StyleSheet  } from 'react-native'
import Color from '../constant/colors'

export default function MainButton({title , onPress }) {

 

    return (
      
            <TouchableOpacity onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}> {title} </Text>
                </View>
            </TouchableOpacity>
      
       
    )
}
const styles = StyleSheet.create({

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