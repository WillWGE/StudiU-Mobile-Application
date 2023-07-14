
import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, HelperText, IconButton, Text, TextInput } from "react-native-paper";
import theme from "../../config/theme";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../../contexts/AuthProvider";
import { useRoute } from '@react-navigation/native';

const backimage=require("../../assets/images/signup.png");


export default function SubjectForm() {
        const navigation =useNavigation();
        const {user}=useAuth();
        const route=useRoute();
        const [subject,setSubject]=useState(route.params?.item?.subject ?? "");
        const [description,setDescription]=useState(route.params?.item?.description ?? "");
        const [errors, setErrors] = useState({});
        

        const handleChange =setField => text => {
            setField(text);
            setErrors({})
        }
        // const validate = () => {

        //     const newErrors = {};
    
        //     if (!subject) {
        //         newErrors.subject = "Subject is required";
        //     } else if (subject.length <= 3) {
        //         newErrors.subject = "Subject must be at least 4 characters";
        //     }
        //     if (!description) {
        //         newErrors.description = "Description is required";
        //     } else if (description.length <= 8) {
        //         newErrors.description = "Description must be at least 8 characters";
        //     }
    
        //     return newErrors;
    
        // }
    
        const handleSubmit = async () => {
                // const findErrors=validate();
                // if (Object.values(findErrors)?.some(value => value !== "")) {
                //     setErrors(findErrors);
                // }else{
                    try {
                      if (route.params?.mode === 'create'){
                        await firestore().collection("Study_Subject").add({
                            userId: user.uid,
                            subject,
                            description,
                            timer : 0,
                            createdAt: firestore.FieldValue.serverTimestamp(),
                            updatedAt: firestore.FieldValue.serverTimestamp(),
                        });
                      } else {
                            await firestore().collection('Study_Subject').doc(route.params?.item?.id).set({
                                // subject:user.uid ganti jadi user.uid,
                                userId:user.uid,
                                subject,
                                description,
                                updatedAt:firestore.FieldValue.serverTimestamp()
                            },{merge:true})
                      }
                    navigation.navigate("Home");
                    
                } catch (e) {
                    console.log("e", e)
                }
              
            }
            
            return <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=> navigation.navigate("Home")}><Image source={require('../../assets/images/back.png')}/></TouchableOpacity>
                        <Text variant="headlineMedium" style={styles.headerText}>{route.params?.mode === "create" ? "Create " : "Update "}Note</Text>
                    </View>       
               <View style={styles.formContainer}>
                   <TextInput
                       mode="outlined"
                       placeholder="Write the Title of the Note...."
                       value={subject}
                       onChangeText={handleChange(setSubject)}
                       left={<TextInput.Icon icon="format-title" />}
                       autoFocus
                       error={errors?.subject ? true : false}
                   />
                    <HelperText
                        type="error"
                        visible={errors?.subject ? true : false}
                    >
                        {errors.subject}
                    </HelperText>

                   <TextInput
                       mode="outlined"
                       placeholder="Write the Note..."
                       value={description}
                       onChangeText={handleChange(setDescription)}
                       multiline
                       numberOfLines={5}
                       style={{ height: 200 }}
                       autoFocus
                       error={errors?.description ? true : false}
                   />
                        <HelperText
                            type="error"
                            visible={errors?.description ? true : false}
                        >
                            {errors.description}
                        </HelperText>
                        <TouchableOpacity onPress={handleSubmit} style={styles.logoutButton}>
                                <Text style={styles.logoutButtonText}>{route.params?.mode === "create" ? "Create" : "Update"}</Text>
                        </TouchableOpacity>
                       {/* <Button style={styles.btntext}
                           mode="contained" onPress={handleSubmit}>{route.params?.mode === "create" ? "Create" : "Update"}</Button> */}
                       
                  
               </View>
           </View>
       
    }
   
   const styles = StyleSheet.create({
       container: {
           flex: 1,
           backgroundColor:'#4DC868'
       },
       formContainer: {
           width: "100%",
           padding: 20,
           marginTop: 8,
       },
       btnContainer: {
           marginTop: 20,
           alignItems:'center',
          
       },
       btnContent:{
           width:"100%",
           backgroundColor: '#4DC868',
           marginTop: 20,
           marginBottom:20,
           paddingVertical: 15,
           paddingHorizontal: 10,
           borderRadius: 30,
           borderWidth:1,
           marginHorizontal:20,
           textAlign:'center',
           color:'white'
       },
       title: {
           marginTop:'20%',
           color: 'white',
           textAlign:'center'
       },
       subtitle: {
           color: 'white',
           fontFamily:'Montserrat-Bold',
           fontWeight:'bold',
           textAlign:'center',
           marginTop:'20%'
       },
       signincont:{
           marginLeft:'15%',
           marginTop:'70%',
           flexDirection:'row',
       },
       btntext:{
        color:'black'
       },
       header: {
        flexDirection: 'row',
      },
      backBtn: {
        backgroundColor: 'blue',
      },
      headerText: {
        marginTop:50,
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        alignSelf:'center',
        paddingLeft:'20%'
    },
    or:{
        alignSelf:'center'
    },
    logoutButton: {
        
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
   })


