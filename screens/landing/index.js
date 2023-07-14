import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View,Image, ImageBackground } from "react-native";
import { Button, Text } from "react-native-paper";

const backimage=require("../../assets/images/splashbackground.png");

export default function Landing() {

    const navigation = useNavigation();

    return  <View style={styles.container}>
                <ImageBackground source={backimage} style={styles.background}>
                    <Text variant="headlineLarge" style={[styles.title,styles.Text]}> StudiU</Text>
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" style={styles.login} onPress={() => navigation.navigate("Login")}>Login</Button>
                        <Button mode="contained" style={styles.create} onPress={() => navigation.navigate("Register")}>Create a new account</Button>
                    </View>
                </ImageBackground>
            </View>
        
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    background:{
        flex:1,
    },
    buttonContainer: {
        marginTop:'10%',
        alignItems:'center'
    },
    Text: {
        marginTop:'50%',
        alignSelf: "center",
    },
    title: {
        color: 'black',
        fontWeight:'bold'
    },
    login:{
        marginTop:'10%',
        width:'50%'
    },
    create:{
        marginTop:'10%',
        width:"50%"
    }
})