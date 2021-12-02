import React from 'react'
import {View, StyleSheet } from 'react-native'


export default function Card({children, style}) {

    return (
        <View style={{...styles.card, ...style}}>
            {children}
        </View>
    )
}

const styles= StyleSheet.create({
        card:{
           
            marginTop:15,
            shadowOffset:{width:0, height:2 },
            shadowRadius:6,
            shadowColor:'black',
            shadowOpacity:0.24,
            backgroundColor:"#fff",
            elevation:8,
            padding :20,
            borderRadius:10
        }
})