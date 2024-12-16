import { useState, useEffect } from 'react';
import { api } from "../../connections/notes";

export const useEditUserModel = (handleEdit, initialData) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: '',
    confirmPassword: ''
  });
  const [errorEdit, setErrorEdit] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(prevFormData => ({
        ...prevFormData,
        name: initialData.name,
        email: initialData.email
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const submitToken = async () => {
    try {
      // Realize a requisição de login com email e senha informados
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password
      });
      sessionStorage.setItem('Token', response.data.token); // Armazene o novo token no sessionStorage
    } catch (error) {
      setErrorEdit('Erro ao setar novo Token.');
    }
  };

  const submitEdit = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorEdit('Por favor, preencha todos os campos');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorEdit('As senhas não coincidem');
      return;
    }
    try {
      const token = sessionStorage.getItem('Token');
      const response = await api.put('/usuario', {
        email: formData.email,
        name: formData.name,
        password: formData.password,
      }, {
        headers: { 'Authorization': token }
      });
      alert("Edição realizada com sucesso!");
      await submitToken();
      handleEdit();
      console.log(response);
    } catch (error) {
      setErrorEdit('Não foi possível realizar a edição');
    }
  };

  return { formData, handleChange, errorEdit, submitEdit };
};
