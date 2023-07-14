import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View,Image, ImageBackground,TouchableOpacity} from "react-native";
import { Button,Text } from "react-native-paper";
import theme from "../../config/theme";

const backimage=require("../../assets/images/welcome.png");

export default function Started() {

    const navigation = useNavigation();

    return  (
                <ImageBackground source={backimage} style={styles.background}>
                    <View style={styles.text1}>
                        <Text variant="headlineMedium" style={{color:theme.colors.white,fontFamily:'Montserrat-Bold',}}>Hi User, Welcome</Text>
                        <Text variant="headlineMedium" style={{color:theme.colors.white,fontFamily:'Montserrat-Bold',}} > to Studiu</Text>
                    </View>
                    <View style={styles.text2}>
                        <Text style={{color:theme.colors.white,fontFamily:'Rubik-Regular',}} >Explore the app. Find some peace of mind</Text>
                        <Text style={{color:theme.colors.white,fontFamily:'Rubik-Regular',}} >to achieve good habits</Text>
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginButtonText}>GET STARTED</Text>
                    </TouchableOpacity>
                </ImageBackground>
        
    ) 
    
}

const styles = StyleSheet.create({
    background:{ 
        flex:1,
    },
    buttonContainer: {
        marginTop:'90%',
        alignItems:'center'
    },
    text1: {
        marginTop:'30%',
        justifyContent:"center",
        alignItems: "center",
    },
    text2:{
        marginTop:'5%',
        justifyContent:"center",
        alignItems: "center", 
    },
    loginButton:{
        backgroundColor:'white',
        marginTop: '95%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 30,
        borderWidth:1,
        marginHorizontal:20,
    },
    loginButtonText:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center',
    }

})