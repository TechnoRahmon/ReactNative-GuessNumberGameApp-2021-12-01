import React from 'react'
import {Text , StyleSheet } from 'react-native'
export default function BodyText({children , style}) {
    return (
        <Text style={{...styles.body , ...style }}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    body:{
        fontFamily:'open-sans'
    }
})