import React from 'react'
import { View , Text , StyleSheet  } from 'react-native'

import Color from './../constant/colors'

export default function NumberContainer({ children}) {

    return (
        <View style={styles.container}>
            <Text style={styles.number}> {children} </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container :{
        borderWidth: 2 , 
        borderColor:Color.accent,
        padding :10, 
        borderRadius:10,
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center'

    },
    number:{
        fontSize:22,
        color : Color.accent
    }
})