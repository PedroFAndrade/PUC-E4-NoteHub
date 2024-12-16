import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { API_URL } from '@env';

const LoginScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [repassword, setRepassword] = useState('');  
  const [secretAnswer, setSecretAnswer] = useState('');

  const handleCadastro = async () => {
    if (!nome || !email || !password || !secretAnswer) {
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
  
    const url = `${API_URL}/cadastro`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nome,
          email: email,
          password: password,
          secretAnswer: secretAnswer,
        }),
      });
  
      if (response.ok) {
        setNome('');
        setEmail('');
        setPassword('');
        setRepassword('');
        setSecretAnswer('');
  
        Alert.alert(
          'Cadastro',
          'Usuário cadastrado com sucesso.',
        );
  
        navigation.navigate('Login');
      } else if (response.status === 400) {
        
        Alert.alert(
          'Erro no Cadastro',
          'Email já cadastrado.',
        );
      } else {
        const errorData = await response.json();
        console.log('Erro no cadastro:', errorData);
        alert('Erro no cadastro, verifique os dados');
        return;
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na requisição: ' + error.message);
      return;
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
        placeholder="Digite sua senha novamente"
        placeholderTextColor="#bbb"
        value={repassword}
        onChangeText={setRepassword} 
        secureTextEntry  
      />

      <TextInput
        style={styles.input}
        placeholder="Qual é sua comida favorita?"
        placeholderTextColor="#bbb"
        value={secretAnswer}
        onChangeText={setSecretAnswer} 
      />  

      <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
        <Text style={styles.btnText}>Cadastrar</Text>
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
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#ffa31a',
    width: '80%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
