import { GoogleSignin,GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { StyleSheet, View,Image, ImageBackground,TouchableOpacity} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';

const backimage=require("../../assets/images/signup.png");

// const changePassword=()=>{
//     firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
//     .then(()=>{
//         alert("Password reset email sent")
//     }).catch((error) =>{
//         alert(error)
//     })
// }


export default function Login() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    
    GoogleSignin.configure({
        webClientId: '832723038656-jmu0gktqmel3nnedr27bv73m9suc0338.apps.googleusercontent.com',
      });
      // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const onGoogleButtonPress=async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        const user_sign_in=auth().signInWithCredential(googleCredential);
        user_sign_in.then((user) => {
            console.log(user);
        })
        .catch((error) => {
            console.log(error); 
        })
      }

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = setField => text => {
        setField(text);
    }
    const handleLogin = async () => {
        // validasi dulu
        // 1. apakah email nya bener bisa pakai validitor js
        // 2. apakah passwor dan repeat passwordnya sama
        try {

            await auth().signInWithEmailAndPassword(email, password)
        } catch (e) {
            console.log("error", e)
        }

    }
    const forgotPassword=()=>{
        firebase.auth().sendPasswordResetEmail(email)
        .then(()=>{
            alert("Password reset email sent")
        }).catch((error) =>{
            alert(error)
        })
    }
    if (initializing) return null;

    if(!user) {
        return(     
            <View style={styles.container}>
                <ImageBackground source={backimage} style={styles.background}>
                    <View style={styles.contents}>
                        <Text variant="headlineLarge" style={styles.title}>Welcome Back !</Text>
                        <View style={styles.formContainer}>
                            <TouchableOpacity style={styles.btnContainer}>
                                    <Text mode="contained" style={styles.btnContent}>CONTINUE WITH FACEBOOK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnContainer}>
                                <GoogleSigninButton
                                style={{width:'100%',marginTop:0,borderRadius:10,borderWidth:2,marginHorizontal:20,textAlign:'center'}}
                                onPress={onGoogleButtonPress}
                                />
                            </TouchableOpacity>
                            <TextInput
                                mode="outlined"
                                placeholder="Email address"
                                value={email}
                                onChangeText={handleChange(setEmail)}
                                left={<TextInput.Icon icon="email" />}
                                autoFocus
                            />
                            <TextInput
                                mode="outlined"
                                placeholder="Password"
                                value={password}
                                onChangeText={handleChange(setPassword)}
                                secureTextEntry
                                left={<TextInput.Icon icon="key" />}
                            />
                            <TouchableOpacity style={styles.btnContainer}>
                                <Text mode="contained" style={styles.btnContent} onPress={handleLogin}>LOGIN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    forgotPassword()
                                }}
                                    style={styles.button}
                            >
                                <Text  style={{textAlign:'center',fontWeight:'bold',fontSize:14,fontFamily:'Rubik-Regular'}}>Forgot Password?</Text>
                            </TouchableOpacity>   
                            <View style={styles.signupcont}>
                                <Text style={{fontFamily:'Rubik-Regular'}}>DON'T HAVE AN ACCOUNT?</Text>
                                <Text onPress={() => navigation.navigate("Register")} style={{color:'#00D287'}}>SIGN UP</Text>
                            </View>
                            {/* <View style={styles.btnContainer}>
                                <Button mode="contained" onPress={handleLogin}>Login</Button>
                                <Text style={styles.or}>or</Text>
                                <Button onPress={() => navigation.navigate("Register")}>Create a new account</Button>
                            </View> */}
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
    if(user){
        (
        navigation.navigate('Home')    
    )
    }
                    
}

const styles = StyleSheet.create({
    background:{
        flex:1,
       
    },
    container: {
        flex:1
    },
    contents:{
        fontFamily:'Rubik-ExtraBold',
        fontWeight:'bold',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: '20%'
    },
    formContainer: {
        width: "100%",
        padding: 20,
 
    },
    btnContainer:{
        alignItems:'center'
    },
    or: {
        alignSelf: "center",
        marginVertical: 4
    },
    title: {
        color: theme.colors.primary,
        fontFamily:'Rubik-Regular',
        fontWeight:'bold'
    },
    btnContent:{
        width:"100%",
        backgroundColor: theme.colors.button,
        marginTop: 20,
        marginBottom:20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 30,
        borderWidth:1,
        marginHorizontal:20,
        textAlign:'center',
        color:theme.colors.white
    },
    facebookbtn:{
        width:"100%",
        color:theme.colors.primary,
        backgroundColor: theme.colors.button,
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
        borderWidth:1,
        marginHorizontal:20,
        alignItems:'center'
    },
    googlebtn:{
        color:theme.colors.button,
        width:"100%",
        backgroundColor: theme.colors.button,
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
        borderWidth:1,
        marginHorizontal:20,
        alignItems:'center'

    },
    signupcont:{
        marginLeft:'15%',
        marginTop:'60%',
        flexDirection:'row',
    },


})