import React, { useEffect } from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const SplashBackground=require("../../assets/studiu.png");

export default function Splash(){
  const {navigate}=useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigate('Started');
    }, 2000); // Change this number to adjust the time that the splash screen is displayed
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={SplashBackground}
        style={styles.logo}
      />
      <Text style={styles.Text}>Studiu</Text>
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff'
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'contain'
    },
    Text:{
       fontSize:30,
       fontWeight:'bold',
       fontFamily:'Montserrat-Regular',
    }
  });