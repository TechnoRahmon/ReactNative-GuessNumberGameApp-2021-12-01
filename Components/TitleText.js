import React from 'react'
import {Text , StyleSheet } from 'react-native'


export default function TitleText ({children , style }) {
    return (
        <Text style={{ ...styles.title , ...style }}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    title:{
        fontFamily:'open-sans-bold',
        fontSize:18
    }
})