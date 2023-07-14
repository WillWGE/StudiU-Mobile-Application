

import { FlatList, StyleSheet, View, Alert,ImageBackground,TouchableOpacity,Image } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text} from "react-native-paper";
import theme from "../../config/theme";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";



const background=require("../../assets/images/homebackground.png");
export default function Notes() {
        const navigation=useNavigation();
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

        
        const handleDelete = item => e => {
            Alert.alert( 'Are you sure want to delete this subject?','Alert Message', [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
    
                        await firestore().collection("Study_Subject").doc(item.id).delete();
    
                    }
                },
            ]);
    
        }
        
        // const ListItem =({item}) => {
        //     return (
        //         <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
        //             <Text >william</Text>
        //         </TouchableOpacity>
        //     );
        // };
       
        return <ImageBackground source={background} style={styles.background}>
                    <View style={styles.Text}>
                        <Text variant="headlineLarge" style={styles.title}>Study Notes</Text>
                    </View>
            <FlatList
                    style={styles.feed}
                    data={data}
                    renderItem={({ item }) => {
                            return < View style={styles.feedItem}>      
                                        <TouchableOpacity style={{ flex: 1 }} onPress={()=> navigation.navigate("EachSubject",{data:item})}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View>
                                                    <Text style={styles.subject}>{item.subject}</Text>
                                                    <Text numberOfLines={1} style={[styles.description,{width:150}]}>{item.description}</Text>
                                                </View>
                                                <View style={styles.actionBtns}>
                                                    {/* <IconButton onPress={() => navigation.navigate("SubjectForm", {
                                                        mode: "update",
                                                        item
                                                    })} icon="pencil" 
                                                    /> */}
                                                    <TouchableOpacity style={{width:50}} onPress={() => navigation.navigate("SubjectForm", {
                                                        mode: "update",
                                                        item
                                                    })}><Image source={require('../../assets/images/pencil.png')}/></TouchableOpacity>
                                                    {/* <IconButton
                                                        onPress={handleDelete(item)}
                                                        icon="delete" 
                                                    /> */}
                                                    <TouchableOpacity onPress={handleDelete(item)}><Image source={require('../../assets/images/trash.png')}/></TouchableOpacity>   
                                                </View>                                                
                                            </View>
                                        </TouchableOpacity>
                                    </View>      
                            // <TouchableOpacity onPress={()=> navigation.navigate("Home")}><Image source={require('../../assets/images/back.png')}/></TouchableOpacity>                       
                    }}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
            ></FlatList>
        <FAB
            onPress={() => navigation.navigate("SubjectForm", { mode: "create" })}
            style={styles.fab}
            icon={"plus"}
        />
    </ImageBackground>
    

}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    buttonContainer: {
        marginTop: 20
    },
    subject: {
        color: theme.colors.primary,
        fontSize:32
    },
    description:{
        color: theme.colors.secondary
    },
    fab: {
        position: "absolute",
        right: 40,
        bottom: 40,
        borderRadius:30
    },
    actionBtns: {
        flexDirection: "row",
        marginHorizontal:10
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    subject: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    description: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
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

})
 

