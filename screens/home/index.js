
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Alert,ImageBackground,TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from "../../config/theme";
import Account from '../account';
import Notes from '../subject';
import Habit from "../habit";
import { useNavigation } from "@react-navigation/native";
import { firebase } from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useAuth } from "../../contexts/AuthProvider";
import firestore from '@react-native-firebase/firestore';


const Tab=createBottomTabNavigator();
var user= firebase.auth().currentUser

function Main () {
    const navigation=useNavigation();
    const route=useRoute();
    const [data,setData]=useState([]);
    const {user}=useAuth();
    useEffect(()=>{
        const snapshot=firestore().collection("Study_Subject")
        .where("userId","==",user?.uid)
        .orderBy("createdAt","desc")
        .onSnapshot((snapshots)=>{
            const subject=[];
            snapshots.forEach((snapshots)=>{
            subject.push({
                ...snapshots.data(),
                id:snapshots.id,
                // createdAt,
                // description,
                // subject,
                // updateAt,
                // userId
                })
            })
            console.log("subject",subject)  
            setData(subject);
        })
        return ()=>{
            snapshot?.();
        }
    },[user?.uid]) //pake dependency array 

    return <View style={styles.container}>
        <View style={styles.Text}>
        <Text variant="headlineMedium" style={styles.title}>Dashboard </Text>
        <Text variant="headlineMedium" style={styles.title}>Your Study</Text>
        </View>
        <FlatList
            style={styles.feed}
            data={data}
            renderItem={({ item }) => {

        return < View style={styles.feedItem}>      
                    <View style={styles.buttonContainer}>                                      
                                <Text style={styles.subject}>{item.subject} </Text>
                                {/* <Text style={styles.TimeElapsed}>Time Elapsed:</Text> */}
                                <Text style={styles.TimeElapsed}></Text>
                                <TouchableOpacity onPress={()=> navigation.navigate("TimerScreen",{data:item})} style={styles.logoutButton}>
                                    <Text style={styles.logoutButtonText}>Continue</Text>
                                </TouchableOpacity>
                    </View>
                </View>      
                       
                }}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ></FlatList>

            </View>
         
    
};

export default function Home() {
    
    return (
    <Tab.Navigator initialRouteName="Main">
                <Tab.Screen name="Main" component={Main} options={{headerShown: false,tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="home" color={"black"} size={size}/>),}}/>
                <Tab.Screen name="Notes" component={Notes} options={{headerShown: false,tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="clipboard" color={"black"} size={size}/>),}} />
                <Tab.Screen name="Habit" component={Habit} options={{headerShown: false,tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="lightning-bolt" color={"black"} size={size}/>),}} />
                <Tab.Screen name="Profile" component={Account} options={{headerShown: false,tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="account" color={"black"} size={size}/>),}}/>
    </Tab.Navigator>
    )
    }
       
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#4DC868'
    },
    buttonContainer: {
        flex:1,
        marginTop: 10
    },
    subject: {
        color: theme.colors.primary,
        fontSize:24,
        fontWeight: "500",
        fontFamily:"Rubik-SemiBold",
        alignSelf:'center'
    },
    TimeElapsed: {
        fontSize: 10,
        color: theme.colors.primary,
        marginTop: 10,
        fontFamily:"Rubik-SemiBold"
    },
    fab: {
        position: "absolute",
        right: 40,
        bottom: 40,
        borderRadius:40
    },
    actionBtns: {
        flexDirection: "row"
    }
   ,
    // tambahan
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        marginVertical: 8
    },

    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    },
    title: {
        fontFamily:'Montserrat-Bold',
        color:'white'
    },
    Text:{
        paddingVertical:20,
        alignItems:'center'
    },
    logoutButton: {
        width:100,
        backgroundColor:'#92A3FD',
        marginTop: 15,
        marginBottom:15,
        paddingVertical: 10,
        borderRadius: 16,
        borderWidth:1,
        alignSelf:'center'
     
      },
      logoutButtonText: {
        color: 'black',
        fontSize: 12,
        fontFamily:'Montserrat-Bold',
        textAlign:'center',
      },
})

