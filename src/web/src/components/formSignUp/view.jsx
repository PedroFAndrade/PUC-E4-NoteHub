import React from 'react';
import styles from './formSignUp.module.css';

const FormSignUp = ({ formData, handleChange, errorSignUp, submitSignUp }) => {
  return (
    <div className={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email" 
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input 
        type="password"
        name="confirmPassword"
        placeholder="Confirmar Senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="secretAnswer"
        placeholder="Qual é sua comida favorita?"
        value={formData.secretAnswer}
        onChange={handleChange}
        required
      />
      {errorSignUp && <div className={styles.errorMessage}>{errorSignUp}</div>}

      <button type="button" className={styles.submitButton} onClick={submitSignUp}>
        Cadastrar
      </button>
      
    </div>
  );
};

export default FormSignUp;
