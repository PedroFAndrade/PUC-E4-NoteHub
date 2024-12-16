import { useState } from 'react';
import {api} from "../../connections/notes";

const useRecoverModel = (handleRecover) => {
  const [email, setEmail] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [errorRecover, setErrorRecover] = useState(null);

  const onEmailChange = (e) => setEmail(e.target.value);
  const onSecretAnswerChange = (e) => setSecretAnswer(e.target.value);

  const submitRecover = async () => {
    try {
      setErrorRecover(null);
      const response = await api.post('/recover', { email, secretAnswer });
      sessionStorage.setItem('Token', response.data.token);
      handleRecover();
    } catch (error) {
      // Trata o erro com base no status da resposta
      if (error.response) {
        const { status } = error.response;

        if (status === 400) {
          setErrorRecover('Por favor, preencha todos os campos');
        } else if (status === 402 || status === 408) {
          setErrorRecover('Credenciais inválidas. Verifique seu e-mail e a resposta');
        } else {
          setErrorRecover('Erro inesperado. Tente novamente mais tarde.');
        }
      } else {
        setErrorRecover('Erro de conexão. Verifique sua rede e tente novamente.');
      }
    }
  };

  return {
    email,
    secretAnswer,
    errorRecover,
    onEmailChange,
    onSecretAnswerChange,
    submitRecover
  };
};

export default useRecoverModel;