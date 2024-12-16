import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarScreen = ({ navigation, setUserData }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [repassword, setRepassword] = useState('');  

  useEffect(() => {
    const fetchPreLoad = async () => {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));

      setNome(userData.name);
      setEmail(userData.email);
    };

    fetchPreLoad();
  }, []);

  const handleNewToken = async () => {
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

      } else {
        const errorData = await response.json();
        console.log('Erro no token:', errorData);
        alert('Erro no token: ' + errorData.message);
      }

    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na requisição: ' + error.message);
    }
  };

  const handleEditar = async () => {
    if (!nome || !email || !password || !repassword) {
      Alert.alert(
        'Dados Incorretos',
        'Preencha todos os campos.',
      );
      return;
    }
  
    if (password !== repassword) {
      Alert.alert(
        'Dados Incorretos',
        'As senhas devem ser iguais.',
      );
      return;
    }
  
    const token = await AsyncStorage.getItem('userToken');
    const url = `${API_URL}/usuario`;
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': token,
        },
        body: JSON.stringify({
          name: nome,
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        await handleNewToken();
        setPassword('');
        setRepassword('');
        const newUserData = JSON.parse(await AsyncStorage.getItem('userData'));
        setUserData(newUserData);
        navigation.goBack();
        Alert.alert(
          'Editar usuário',
          'Dados atualizados com sucesso.',
        );

      } else {
        const errorData = await response.json();
        alert('Erro na edição: ' + errorData.message);
      }
    } catch (error) {
      alert('Erro na requisição: ' + error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/img/noteHub.png")}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#bbb"
        value={nome}
        onChangeText={setNome} 
      />

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

      <TextInput
        style={styles.input}
        placeholder="Repita sua senha"
        placeholderTextColor="#bbb"
        value={repassword}
        onChangeText={setRepassword} 
        secureTextEntry  
      />

      <TouchableOpacity style={styles.btn} onPress={handleEditar}>
        <Text style={styles.btnText}>Editar</Text>
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
  title: {
    fontSize: 24,
    color: "#fff",
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
    marginBottom: 15,
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

export default EditarScreen;
