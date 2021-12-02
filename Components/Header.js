import React from 'react'
import {StyleSheet ,View , Text, Platform } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import colors from '../constant/colors'


export default function Header({ title }) {
    return (
        <View style={{...styles.headerBase, ...Platform.select({ios:styles.headerIOS , android: styles.headerAndroid }) } }> 
                <Text style={styles.headerTitle} >{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase :{
        width:'100%',
        height:90,
        paddingTop:36,
        justifyContent:'center',
        alignItems:'center',

    },
    headerIOS:{        
        borderBottomColor:'#ccc',
        backgroundColor:  '#fff',
        borderBottomWidth:1
    },
    headerAndroid:{
        backgroundColor: colors.primary,
    },
    headerTitle:{
        fontSize:18,
        fontFamily:'open-sans-bold',
        color:Platform.OS==='ios'?colors.primary:"#fff"
       
    }
})