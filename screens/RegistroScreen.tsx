import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/Config';
import { getDatabase, ref, set } from "firebase/database";

export default function RegistroScreen() {
    const [correo, setcorreo] = useState("")
    const [contraseña, setcontraseña] = useState('')
    const [edad, setedad] = useState(0)
    const [ciudad, setciudad] = useState('')
    const [cedula, setcedula] = useState('')


    useEffect(() => {
        if(Number.isNaN(edad)){
            setedad(0)
        }
    }, [edad])

    function global (){
        registro()
        guardar()
    }

    function guardar() {
        set(ref(db, 'usuarios' + cedula), {
            email: correo,
            age: edad,
            city: ciudad,
        });
    }

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contraseña)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert('Exito', ' Se ha registrado el usuario')
            })
            .catch((error) => {
                const errorCode = error.Code;
                const errorMessage = error.message;
                Alert.alert(errorCode, errorMessage)
            })
    }


    return (
        <View>
            <Text>LoginScreen</Text>
            <TextInput
                placeholder='Ingresar correo'
                onChangeText={(texto) => setcorreo(texto)}
            />
            <TextInput
                placeholder='Ingresar contraseña'
                onChangeText={(texto) => setcontraseña(texto)}
                secureTextEntry
            />
            <TextInput
                placeholder='Ingresar edad'
                onChangeText={(texto) => setedad(edad)}
                value={edad.toString()}
                keyboardType='numeric'
            />
            <TextInput
                placeholder='Ingresar ciudad'
                onChangeText={(texto) => setciudad(texto)}
                style={styles.input}
            />
            <TextInput
                placeholder='Ingresar cedula'
                onChangeText={(texto) => setcedula(texto)}
                style={styles.input}
            />

            <Button
                title='Login'
                onPress={() => global()}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 35,
        backgroundColor: "#6666",
        margin: 10,
        borderRadius: 20,
        paddingHorizontal: 2
    }
})