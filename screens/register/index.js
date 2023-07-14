import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';

const backimage=require("../../assets/images/signup.png");

export default function Register() {

    const navigation = useNavigation()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleChange = setField => text => {
        setField(text);
    }

    const handleRegister = async () => {
        // validasi dulu
        // 1. apakah email nya bener bisa pakai validitor js
        // 2. apakah passwor dan repeat passwordnya sama
        try {
            await auth().createUserWithEmailAndPassword(email, password)
        } catch (e) {
            console.log("error", e)
        }

    }
    return <View style={styles.container}>
            <ImageBackground source={backimage} style={styles.background}>
                <Text variant="titleLarge" style={styles.subtitle}>Create Your Account</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        value={email}
                        mode="outlined"
                        placeholder="Email address"
                        onChangeText={handleChange(setEmail)}
                        left={<TextInput.Icon icon="email" color={(isFocused) => isFocused ? theme.colors.primary : theme.colors.secondary} />}
                        autoFocus
                    />
                    <TextInput
                        value={password}
                        mode="outlined"
                        placeholder="Password"
                        onChangeText={handleChange(setPassword)}
                        left={<TextInput.Icon icon="key" color={(isFocused) => isFocused ? theme.colors.primary : theme.colors.primary} />}
                        secureTextEntry
                    />
                    <TextInput
                        value={repeatPassword}
                        mode="outlined"
                        onChangeText={handleChange(setRepeatPassword)}
                        placeholder="Repeat Password"
                        left={<TextInput.Icon icon="key" color={(isFocused) => isFocused ? theme.colors.primary : theme.colors.primary} />}
                        secureTextEntry
                    />
                    <View style={styles.btnContainer}>
                        <Text mode="contained" style={styles.btnContent} onPress={handleRegister}>Register</Text>
                        {/* <Button onPress={() => navigation.navigate("Login")} >Login</Button> */}
                    </View>
                    <View style={styles.signincont}>
                        <Text style={{fontFamily:'Rubik-Regular'}}>ALREADY HAVE AN ACCOUNT?</Text>
                        <Text onPress={() => navigation.navigate("Login")} style={{color:'#00D287'}}>SIGN IN</Text>
                    </View>
                </View>
              </ImageBackground>
            </View>
}

const styles = StyleSheet.create({
    background:{
        flex:1,
       
    },
    container: {
        flex: 1,
      
    },
    formContainer: {
        width: "100%",
        padding: 20,
        marginTop: 8,
    },
    btnContainer: {
        marginTop: 20,
        alignItems:'center'
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
    title: {
        color: theme.colors.primary
    },
    subtitle: {
        color: theme.colors.primary,
        fontFamily:'Montserrat-Bold',
        fontWeight:'bold',
        textAlign:'center',
        marginTop:'20%'
    },
    signincont:{
        marginLeft:'15%',
        marginTop:'70%',
        flexDirection:'row',
    }
})