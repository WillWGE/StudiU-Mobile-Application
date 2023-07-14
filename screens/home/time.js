import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions,Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useAuth } from "../../contexts/AuthProvider";


const screen = Dimensions.get('window');


export default function TimerScreen(){
    const navigation=useNavigation();
    const {user}=useAuth();
    const route=useRoute();
    const [isRunning, setIsRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(timeElapsed ?? 0);
    const [Timedata,setTimedata]=useState(Timedata ?? 0);
    

    useEffect(() => {
        let interval;
    
        if (isRunning) {
          interval = setInterval(() => {
            setTimeElapsed((timeElapsed) => timeElapsed + 1);
          }, 1000);
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [isRunning]);

      const handleStartStopPress = () => {
        console.log(formatTime(timeElapsed))
        setIsRunning((isRunning) => !isRunning);
        try{
            firestore().collection('Study_Subject').doc(route.params?.item?.id).set({
              userId:user.uid,
              subject:route.params.data.subject,
              description:route.params.data.description,
              timer : firestore.FieldValue.increment(timeElapsed),
              updatedAt:firestore.FieldValue.serverTimestamp()
              },{merge:true})
            } catch (e) {
              console.log("e", e)
            }
      };
    
      const handlePress=() =>{
        
      }
      const handleResetPress = () => {
        setIsRunning(false);
        setTimeElapsed(0);
      };


      const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      };

        useEffect(()=>{
           firestore()
          .collection("Study_Subject")
          .where("userId","==",user?.uid)
          .where('subject','==',route.params?.data?.subject)
          .orderBy("updatedAt","desc")
          .limit(1)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach((documentSnapshot)=>{
              updatedTime=documentSnapshot.data()
          })
              console.log("updatedTime",updatedTime)  
              setTimedata(updatedTime);
        })
      },[isRunning]) //pake dependency array 

    return <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={()=> navigation.navigate({name:"Home",params:{time:Timedata},merge:true})}><Image source={require('../../assets/images/back.png')}/></TouchableOpacity>
      <Text variant="headlineMedium" style={styles.headerText}>StudiU Stopwatch </Text>
    </View>
       
    <View style={styles.circle}>
         <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
    </View>
    <View style={styles.ButtonContainer}>
            <TouchableOpacity
            style={[styles.Button, isRunning ? styles.stopButton : styles.startButton]}
            onPress={handleStartStopPress}
            >
            <Text style={styles.ButtonText}>{isRunning ? 'Pause' : 'Start'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={handleResetPress}>
            <Text style={styles.ButtonText}>Reset</Text>
            </TouchableOpacity>
    </View>
    <View style={styles.DetailBox}>
      <View style={styles.Detailssection}>
          <Text style={styles.DetailsTitle}>Details</Text>
        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsText}>Time Elapsed Today : {formatTime(Timedata.timer)}</Text>
        </View>
      </View>
    </View>
</View>




};


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#4DC868'
    },
    title: {
        fontFamily:'Montserrat-Bold',
        color:'white',
        fontSize:20
    },
    Text:{
        paddingVertical:20,
        alignItems:'center'
    },
    circle:{
        borderWidth: 0,
        backgroundColor:'#FFFFFF',
        width: screen.width / 2,
        height: screen.width / 2,
        borderRadius: screen.width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        marginTop:40
    },
    ButtonContainer: {
        flexDirection: 'row',
        marginTop:30,
        alignSelf:'center',
        
      },
    Button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginHorizontal: 10,
        backgroundColor: '#4682b4',
      
      },
    ButtonText:{
      fontFamily:'Rubik-Bold',
      fontWeight:'bold',
      textAlign:'center',
      marginHorizontal:20
    },
      startButton: {
        backgroundColor: '#FFFFFF',
        
      },
      stopButton: {
        backgroundColor: '#f44336',
       
      },
      header: {
        flexDirection: 'row',
      },
      backBtn: {
        backgroundColor: 'blue',
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        alignSelf:'center',
        paddingLeft:'20%'
    },
    timerText:{
       fontFamily:'Rubik-Bold',
       fontWeight:'bold',
       fontSize:28,
    },
    DetailBox: {
      marginHorizontal: 20,
      paddingHorizontal:10,
       borderRadius: 12,
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
      alignSelf:'center',
      fontFamily:'Rubik-Bold',
    },
    DetailsContent: {
      marginLeft: 20,
    },
    DetailsText: {
      fontSize: 16,
      marginBottom: 5,
      fontFamily:'Rubik-Bold',
      fontWeight:'bold'
    },
})