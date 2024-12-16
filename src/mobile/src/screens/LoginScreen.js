import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, setIsLoggedIn, setUserData }) => {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        'Dados Incorretos',
        'Preencha todos os campos.',
      );
      return;
    }
  
    const url = `${API_URL}/login`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('userToken', data.token);
        const userData = JSON.stringify(jwtDecode(data.token));
        await AsyncStorage.setItem('userData', userData);
        const newUserData = JSON.parse(await AsyncStorage.getItem('userData'));
        setUserData(newUserData);
        setIsLoggedIn(true);

      } else {
        const errorData = await response.json();
        console.log('Erro no login:', errorData);
        Alert.alert(
          'Dados Incorretos',
          'Verifique o email e a senha.',
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

    <Text style={styles.subTitle}>A melhor aplicação para você organizar seu dia a dia :)</Text>

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
        placeholder="Digite sua senha"
        placeholderTextColor="#bbb"
        value={password}
        onChangeText={setPassword} 
        secureTextEntry  
      />

      <TouchableOpacity onPress={() => navigation.navigate("Recover")}>
        <Text style={styles.forgotButton}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
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
  forgotButton: {
    padding: 5,
    color: 'gray',
    textDecorationLine: 'underline',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoginScreen;
