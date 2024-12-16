import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import styles from './recoverModal.module.css';

const RecoverModal = ({ email, secretAnswer, errorRecover, onEmailChange, onSecretAnswerChange, onClose, submitRecover }) => {

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseOutlined style={{ fontSize: '1rem', color: 'black' }} />
        </button>
        <h2>Recuperar Senha</h2>
        <div>
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
            name="secretAnswer"
            placeholder="Resposta Secreta"
            value={secretAnswer}
            onChange={onSecretAnswerChange}
            required
          />
          {errorRecover && <div className={styles.errorMessage}>{errorRecover}</div>}
          <button type="button" className={styles.submitButton} onClick={submitRecover}>
            Recuperar Senha
          </button>

        </div>
      </div>
    </div>
  );
};

export default RecoverModal;
