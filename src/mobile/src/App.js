import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from './components/NavBar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);

      if (token) {
        const user = JSON.parse(await AsyncStorage.getItem('userData'));
        setUserData(user); // Atualiza os dados do usuário
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <NavBar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        userData={userData} 
        setUserData={setUserData} 
      />
    </NavigationContainer>
  );
}
