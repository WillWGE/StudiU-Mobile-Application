import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions,Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import theme from '../../config/theme';


export default function EachSubject({ route, navigation}) {
    
    return <View style={styles.background}>
    <View style={styles.header}>
      <TouchableOpacity onPress={()=> navigation.navigate("Home")}><Image source={require('../../assets/images/back.png')}/></TouchableOpacity>
    </View>
    <View style={styles.DetailBox}>
      <View style={styles.Detailssection}>
          <Text style={styles.DetailsTitle}>{route.params.data.subject}</Text>
        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsNote}>{route.params.data.description}</Text>
        </View>
      </View>
    </View>

</View>
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor:'#4DC868'
    },
    buttonContainer: {
        marginTop: 20
    },
    description:{
        
        fontFamily:"Rubik-SemiBold",
        fontWeight:'bold'
    },
    header: {
        flexDirection: 'row',
      },
    DetailBox: {
        marginHorizontal: 20,
        paddingHorizontal:10,
         borderRadius: 15,
        backgroundColor:'white',
        marginTop:40
      },
      Detailssection: {
        paddingTop:10,
      },
      DetailsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf:'flex-start',
        fontFamily:'Rubik-Bold',
      },
      DetailsContent: {
        marginLeft: 20,
      },
      DetailsNote: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily:'Rubik-Bold',
        
        alignSelf:'center',
      },

})