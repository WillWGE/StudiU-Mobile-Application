

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {Button} from "react-native-paper";
import auth from '@react-native-firebase/auth';



var user= auth().currentUser

function AccountScreen() {
  const handleLogout = () => {
    auth().signOut();
  }
  // console.log('User email: ', user.email);
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} />
        <Text style={styles.name}>Will</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.infoText}>Email: </Text>
            <Text style={styles.infoText}>Phone: (123) 456-7890</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing Information</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.infoText}>Credit Card: **** **** **** 1234</Text>
            <Text style={styles.infoText}>Expiry Date: 12/23</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4DC868',
   
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#4682b4',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    marginHorizontal: 20,
    paddingHorizontal:10,
     borderRadius: 20,
     borderWidth:3,
     backgroundColor:"white"
  },
  section: {
    paddingTop:10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    marginLeft: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  logoutButton: {
    flex:0.1,
    backgroundColor:'#92A3FD',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth:2,
    marginHorizontal:20,
 
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
  },
});

export default AccountScreen;