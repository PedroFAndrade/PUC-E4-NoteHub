import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const NotesContext = createContext();

export const useSidebarContext = () => useContext(NotesContext);

export const SidebarProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const getAll = useCallback(async () => {
    const token = await AsyncStorage.getItem('userToken');

    try {
      const response = await api.get('/v2/api/getall', {
        headers: { Authorization: token },
      });

      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar notas:', error.message);
    }
  }, []);

  const createNote = async (title, body, type) => {
    const token = await AsyncStorage.getItem('userToken');
    const newNote = { title, body, type };

    try {
      const response = await api.post('/v2/api/createNote', newNote, {
        headers: { Authorization: token },
      });

      console.log('Nota criada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar nota:', error.message);
      throw error;
    }
  };

  return (
    <NotesContext.Provider value={{ data, getAll, createNote }}>
      {children}
    </NotesContext.Provider>
  );
};
