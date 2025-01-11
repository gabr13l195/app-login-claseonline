import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../config/Config';
import { ref, get } from 'firebase/database';

export default function WelcomeScreen({ route }: any) {
    const { cedula } = route.params;
    const [usuario, setUsuario] = useState<any>(null);

    useEffect(() => {
        const usuarioRef = ref(db, `usuarios/${cedula}`);
        get(usuarioRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setUsuario(snapshot.val());
                } else {
                    console.error('Usuario no encontrado.');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [cedula]);

    return (
        <View style={styles.container}>
            <Text>Holaa</Text>
            {usuario ? (
                <>
                    <Text style={styles.text}>Bienvenido/a, {usuario.nombre}</Text>
                    <Text style={styles.text}>Ciudad: {usuario.ciudad}</Text>
                    <Text style={styles.text}>Edad: {usuario.edad}</Text>
                    <Text style={styles.text}>Correo: {usuario.correo}</Text>
                </>
            ) : (
                <Text style={styles.text}>Cargando información...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        marginVertical: 10,
    },
});
