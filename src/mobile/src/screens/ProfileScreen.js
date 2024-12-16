import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const User = ({ navigation, setIsLoggedIn, userData }) => {

  const handleLogout = async () => {
    try {
      // Remove token e dados de usuário
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');

      setIsLoggedIn(false);
      Alert.alert(
        'Logout',
        'Usuário deslogado com sucesso.',
      );
    } catch (error) {
      console.error('Erro ao remover o token:', error);
    }
  };

  const handleDelete = () => {
    // Exibe o alerta de confirmação
    Alert.alert(
      'Excluir Usuário',
      'Você tem certeza que deseja excluir sua conta?',
      [
        {
          text: 'Cancelar', // Botão para cancelar
          style: 'cancel',
        },
        {
          text: 'Confirmar', // Botão para confirmar
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const urlDelete = `${API_URL}/usuario`;
              const response = await fetch(urlDelete, {
                method: 'DELETE',
                headers: {
                  'Authorization': token,
                },
              });

              if (response.ok) {
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userData');
                setIsLoggedIn(false);
                Alert.alert(
                  'Excluir Usuário',
                  'Usuário deletado com sucesso.',
                );
              }
            } catch (error) {
              console.error('Erro ao deletar usuário:', error);
              alert(error);
            }
          },
        },
      ],
      { cancelable: true } // Permite que o alerta seja fechado tocando fora dele
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/img/account.png')}
          style={styles.imageUser}
        />

        <Text style={styles.text}> Olá {userData?.name || 'Usuário'}! </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Editar')}>
            <Text style={styles.text2}> Editar Usuário </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={handleDelete}>
            <Text style={styles.text2}> Excluir Usuário </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={handleLogout}>
            <Text style={styles.text2}> Logout </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1b1b1b",
  },

  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageUser: {
    width: '50%',
  },

  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 30,
    textAlign: 'center',
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },

  text2: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },

  btn: {
    backgroundColor: '#ffa31a',
    width: '80%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default User;
