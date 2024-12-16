import { useState } from 'react';
import { api } from "../../connections/notes";

const useSignInModel = (handleLogin) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(null);

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const submitLogin = async () => {

    if (!email || !password) {
      setErrorLogin('Por favor, preencha todos os campos');
      return;
    }
    try {
        setErrorLogin(null);

        // Tenta fazer a requisição
        const response = await api.post('/login', { email, password });

        // Sucesso: Armazena o token e realiza o login
        sessionStorage.setItem('Token', response.data.token);
        handleLogin();
    } catch (error) {
        // Trata o erro com base no status da resposta
        if (error.response) {
            const { status } = error.response;

            if (status === 404 || status === 400 || status === 408) {
                setErrorLogin('Credênciais inválidas. Verifique seu e-mail e senha.');
            }
        } else {
            // Caso não seja possível acessar a resposta
            setErrorLogin('Erro de conexão. Verifique sua rede e tente novamente.');
        }
    }
};

  return {
    email,
    password,
    errorLogin,
    onEmailChange,
    onPasswordChange,
    submitLogin
  };
};

export default useSignInModel;
