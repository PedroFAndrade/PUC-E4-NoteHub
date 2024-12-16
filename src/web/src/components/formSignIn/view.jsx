import React, { useState } from 'react';
import styles from './formSignIn.module.css';
import {RecoverController} from '../../components/recoverModal/controller';
import { EditUserController } from '../../components/editUserModal/controller';

const FormSignIn = ({ email, password, onEmailChange, onPasswordChange , errorLogin, submitLogin }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onClose = () => {
    setIsEditModalOpen(false);
    sessionStorage.removeItem('Token');
  };

  const handleRecover = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditModalOpen(false);
    sessionStorage.removeItem('Token');
  };

  return (
    <div className={styles.form}>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={email}
        onChange={onEmailChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={password}
        onChange={onPasswordChange}
        required
      />
      {errorLogin && <div className={styles.errorMessage}>{errorLogin}</div>}

      <button className={styles.forgotPasswordButton} onClick={() => setIsModalOpen(true)}>
        Esqueceu sua senha?
      </button>

      <button type="button" className={styles.submitButton} onClick={submitLogin}>
        Logar
      </button>

      {isModalOpen && <RecoverController onClose={() => setIsModalOpen(false)} handleRecover={handleRecover}/>}
      {isEditModalOpen && <EditUserController onClose={onClose} handleEdit={handleEdit} />}
    </div>
  );
};

export default FormSignIn;
