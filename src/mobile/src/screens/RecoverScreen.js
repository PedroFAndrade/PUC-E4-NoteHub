import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecoverScreen = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');  
  const [secretAnswer, setSecretAnswer] = useState('');  

  const handleRecover = async () => {
    if (!email || !secretAnswer) {
      Alert.alert(
        'Dados Incorretos',
        'Preencha todos os campos.',
      );
      return;
    }
  
    const url = `${API_URL}/recover`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          secretAnswer: secretAnswer,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('userToken', data.token);
        const userData = JSON.stringify(jwtDecode(data.token));
        await AsyncStorage.setItem('userData', userData);
        setEmail('');
        setSecretAnswer('');
        
        navigation.navigate("EditarRecover")

      } else {
        const errorData = await response.json();
        console.log('Erro de recover:', errorData);
        Alert.alert(
          'Dados Incorretos',
          'Verifique o email e a resposta secreta.',
        );
      }

    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na requisição: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/img/noteHub.png")}
      />

    <Text style={styles.subTitle}>Recuperação de Acesso</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#bbb"
        value={email}
        onChangeText={setEmail} 
        keyboardType="email-address" 
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua resposta secreta"
        placeholderTextColor="#bbb"
        value={secretAnswer}
        onChangeText={setSecretAnswer} 
        secureTextEntry  
      />

      <TouchableOpacity style={styles.btn} onPress={handleRecover}>
        <Text style={styles.btnText}>Recuperar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Voltar</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1b1b",
    borderTopWidth: 5,
    borderTopColor: "black",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    height: "20%",
    width: "50%", 
    resizeMode: "contain",
    alignSelf: "center",
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: "gray",
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#ffa31a',
    width: '80%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecoverScreen;