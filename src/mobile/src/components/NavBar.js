import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, TouchableOpacity } from 'react-native';

// Importação das telas
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import RecoverScreen from '../screens/RecoverScreen';
import EditarScreen from '../screens/EditarScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function NavBar({ isLoggedIn, setIsLoggedIn, userData, setUserData }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: '#211F26',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#A8A8A8',
      }}
    >
      {isLoggedIn ? (
        <>
          {/* NavBar2: Apenas quando logado */}
          <Tab.Screen
            name="Notas"
            component={MainScreen}
            options={{
              title: 'Notas',
              tabBarIcon: ({ color, focused }) => (
                <View
                  style={{
                    backgroundColor: focused ? '#5B5266' : 'transparent',
                    borderRadius: 20,
                    padding: 1,
                    width: 90,
                    height: 40,
                    top: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name="sticky-note" size={25} color={color} />
                </View>
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  style={{
                    width: 190,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ),
              tabBarLabelStyle: {
                fontSize: 15,
                marginTop: 20,
              },
            }}
          />
          <Tab.Screen
            name="Perfil"
            options={{
              title: 'Perfil',
              tabBarIcon: ({ color, focused }) => (
                <View
                  style={{
                    backgroundColor: focused ? '#5B5266' : 'transparent',
                    borderRadius: 20,
                    padding: 1,
                    width: 90,
                    height: 40,
                    top: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name="user" size={25} color={color} />
                </View>
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  style={{
                    width: 190,
                    height: 80,
                    left: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ),
              tabBarLabelStyle: {
                fontSize: 15,
                marginTop: 20,
              },
            }}
          >
            {({ navigation }) => <ProfileScreen setIsLoggedIn={setIsLoggedIn} navigation={navigation} userData={userData} />}
          </Tab.Screen>

          <Tab.Screen
            name="Editar"
            options={{
              tabBarButton: () => null,
              tabBarStyle: { display: 'none' },
            }}
          >
            {({ navigation }) => <EditarScreen setIsLoggedIn={setIsLoggedIn} navigation={navigation} setUserData={setUserData} />}
          </Tab.Screen>
        </>
      ) : (
        <>
          {/* NavBar: Apenas quando não logado */}
          <Tab.Screen
            name="Login"
            options={{
              tabBarLabel: 'Login',
              tabBarIcon: ({ color, focused }) => (
                <View
                  style={{
                    backgroundColor: focused ? '#5B5266' : 'transparent',
                    borderRadius: 20,
                    padding: 1,
                    width: 90,
                    height: 40,
                    top: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name="sign-in-alt" size={25} color={color} />
                </View>
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  style={{
                    width: 190,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ),
              tabBarLabelStyle: {
                fontSize: 15,
                marginTop: 20,
              },
            }}
          >
            {({ navigation }) => <LoginScreen setIsLoggedIn={setIsLoggedIn} navigation={navigation} setUserData={setUserData}/>}
          </Tab.Screen>

          <Tab.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{
              title: 'Cadastro',
              tabBarIcon: ({ color, focused }) => (
                <View
                  style={{
                    backgroundColor: focused ? '#5B5266' : 'transparent',
                    borderRadius: 20,
                    padding: 1,
                    width: 90,
                    height: 40,
                    top: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name="user-plus" size={25} color={color} />
                </View>
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  style={{
                    width: 190,
                    height: 80,
                    left: 90,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ),
              tabBarLabelStyle: {
                fontSize: 15,
                marginTop: 20,
              },
            }}
          />

          <Tab.Screen
            name="Recover"
            component={RecoverScreen}
            options={{
              tabBarButton: () => null,
              tabBarStyle: { display: 'none' },
            }}
          />

          <Tab.Screen
            name="EditarRecover"
            options={{
              tabBarButton: () => null,
              tabBarStyle: { display: 'none' },
            }}
          >
            {({ navigation }) => <EditarScreen setIsLoggedIn={setIsLoggedIn} navigation={navigation} setUserData={setUserData} />}
          </Tab.Screen>
        </>
      )}
    </Tab.Navigator>
  );
}
