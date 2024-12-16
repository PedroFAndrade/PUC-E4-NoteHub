import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignInModel from '../../components/formSignIn/model';
import useSignUpModel from '../../components/formSignUp/model';
import FormSignIn from '../../components/formSignIn/view';
import FormSignUp from '../../components/formSignUp/view';
import styles from './sign.module.css';
import logo from '../../img/noteHubPreta.png';
import background from '../../img/login-cadastro image.png';

const Sign = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/primary');
  };

  const handleSignUp = () => {
    alert("Cadastro realizado com sucesso!");
    setIsLogin(true);
  };

  const { submitLogin, email, password, errorLogin, onEmailChange, onPasswordChange } = useSignInModel(handleLogin);

  const { formData, handleChange, errorSignUp, submitSignUp  } = useSignUpModel(handleSignUp);

  return (
    <div className={styles.container}>

      {/* título da página */}
      <div className={styles.title}>
        <h1>Bem vindo ao <img src={logo} alt=""/></h1>
        <p>A melhor aplicação para você organizar seu dia a dia :)</p>
      </div>

      {/* Imagem lateral direita*/}
      <img className={styles.background} src={background} alt=""/>

      {/* conteúdo lateral esquerdo */}
      <div className={styles.formContainer}>

        {/* Botão de alternância */}
        <div className={styles.toggleButtons}>
          <button
            className={`${styles.button} ${styles.loginButton} ${isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`${styles.button} ${styles.registerButton} ${!isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Cadastro
          </button>
        </div>

        {/* Renderização Condicional dos Formulários */}
        {isLogin ? (
          <FormSignIn
            email={email}
            password={password}
            errorLogin={errorLogin}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            submitLogin={submitLogin}
          />
        ) : (
          <FormSignUp
          formData={formData}
          handleChange={handleChange}
          errorSignUp={errorSignUp}
          submitSignUp={submitSignUp}
          />
        )}
      </div>
    </div>
  );
};

export default Sign;
