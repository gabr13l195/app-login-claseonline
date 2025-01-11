import { Alert, Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/Config';
import { ref, set, get } from 'firebase/database'; 

export default function RegistroScreen({ navigation }: any) {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [cedula, setCedula] = useState('');

    function registrar() {
        if (!cedula || !nombre || !edad || !ciudad || !correo || !contraseña) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        // Verificar si la cédula ya está registrada en la base de datos
        const cedulaRef = ref(db, `usuarios/${cedula}`);
        get(cedulaRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    Alert.alert('Error', 'La cédula ya está registrada');
                    return;
                } else {
                    // Si no está registrada, crear el usuario con email y contraseña
                    createUserWithEmailAndPassword(auth, correo, contraseña)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            // Guardar los datos del usuario con la cédula como clave
                            set(ref(db, `usuarios/${cedula}`), {
                                nombre,
                                edad,
                                ciudad,
                                correo,
                            });
                            Alert.alert('Registro exitoso');
                            navigation.navigate('Login'); // Redirigir al login después del registro
                        })
                        .catch((error) => {
                            Alert.alert('Error', error.message);
                        });
                }
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                onChangeText={(texto) => setNombre(texto)}
                value={nombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Edad"
                onChangeText={(texto) => setEdad(texto)}
                value={edad}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Ciudad"
                onChangeText={(texto) => setCiudad(texto)}
                value={ciudad}
            />
            <TextInput
                style={styles.input}
                placeholder="Cédula"
                onChangeText={(texto) => setCedula(texto)}
                value={cedula}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                onChangeText={(texto) => setCorreo(texto)}
                value={correo}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                onChangeText={(texto) => setContraseña(texto)}
                value={contraseña}
                secureTextEntry
            />
            <Button title="Registrar" onPress={registrar} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Ya tienes cuenta? Ingresa aquí</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
    },
    linkText: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

