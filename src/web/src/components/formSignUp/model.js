import { useState } from 'react';
import {api} from "../../connections/notes";

const useSignUpModel = (handleSignUp) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretAnswer: ''
  });
  const [errorSignUp, setErrorSignUp] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const submitSignUp = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword|| !formData.secretAnswer) {
      setErrorSignUp('Por favor, preencha todos os campos');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorSignUp('As senhas não coincidem');
      return;
    }
    try {
      setErrorSignUp(null);
      const response = await api.post('/cadastro', {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        secretAnswer: formData.secretAnswer
      });
      
      // Limpa os dados do formulário após sucesso
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        secretAnswer: ''
      });
      handleSignUp();
      return console.log(response);
    } catch (error) {
      // Trata o erro com base no status da resposta
      if (error.response) {
        const { status } = error.response;

        if (status === 400) {
          setErrorSignUp('O email utilizado já foi cadastrado.');
        } else {
          setErrorSignUp('Não foi possível realizar o cadastro, tente novamente.');
        }
      } else {
        setErrorSignUp('Erro de conexão. Verifique sua rede e tente novamente.');
      }
    }
  };

  return { formData, handleChange, errorSignUp, submitSignUp };
};

export default useSignUpModel;
