import { FlatList, StyleSheet, View, Alert,ImageBackground,TouchableOpacity,Image } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, Text} from "react-native-paper";
import theme from "../../config/theme";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import {Checkbox} from 'react-native'

export default function Habit(){


            const [isChecked, setIsChecked] = useState(false);

            const handleToggleCheckbox = () => {
            setIsChecked(!isChecked);
            };

        return <View  style={styles.container}>
                    
                    <View style={styles.Text}>
                        <Text variant="headlineLarge" style={styles.title}>Atomic Habits</Text>
                    </View>
         
                <FlatList
                    style={styles.feed}
                    data={[{key: 'Belajar Gitar 30 Menit'},
                    {key: 'Baca Buku 30 Menit'},
                    {key: 'Olahraga 30 Menit'},
                    {key: 'Menyiram Tanaman'}, ]}
                    renderItem={({ item }) => {
                            return < View style={styles.feedItem}>      
                                        <TouchableOpacity style={{ flex: 1 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View>
                                                    <Text style={styles.subject}>{item.key}</Text>
                                                    <Text  style={styles.description}>Completion Rate:</Text>
                                                    <Text  style={styles.description}>100%</Text>
                                                </View>
                                                <View style={styles.actionBtns}>
                                              
                                                    {/* <TouchableOpacity style={{width:50}}><Image source={require('../../assets/images/pencil.png')}/></TouchableOpacity> */}
                                                    <TouchableOpacity style={styles.checkbox} onPress={handleToggleCheckbox}>
                                                    <View style={[isChecked && styles.checkboxChecked]} />
                                                    </TouchableOpacity>
                                                           
                                                            
                                            
                                                </View>                                                
                                            </View>
                                        </TouchableOpacity>
                                    </View>      
                            // <TouchableOpacity onPress={()=> navigation.navigate("Home")}><Image source={require('../../assets/images/back.png')}/></TouchableOpacity>                       
                    }}
            
            ></FlatList>
                   
        <FAB
       
            style={styles.fab}
            icon={"plus"}
        />
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#4DC868'
    },
    buttonContainer: {
        marginTop: 20
    },
    fab: {
        position: "absolute",
        right: 40,
        bottom: 40,
        borderRadius:40
    },
    actionBtns: {
        flexDirection: "row"
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
        fontSize: 18,
        fontFamily:'Rubik-Bold',
        fontWeight: "800",
        color: "black"
    },
    description: {
        fontSize: 13,
        color: "black",
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
    checkbox: {
        alignSelf: 'center',
        width:25,
        height:25,
        borderWidth:2,
        borderColor:'black',
        marginRight:5,
        borderRadius:10
      },
      checkboxChecked: {
        backgroundColor: 'gray',
      },

})