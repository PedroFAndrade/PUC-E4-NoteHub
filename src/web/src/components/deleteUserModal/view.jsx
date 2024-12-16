import styles from './deleteUserModal.module.css';
import { CloseCircleOutlined } from '@ant-design/icons';

const DeleteUserModal = ({ onClose, submitDelete, errorDelete }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2><CloseCircleOutlined style={{ fontSize: '2rem', color: 'red', paddingRight: '10px' }}/>Excluir Usuário</h2>
          <h3>Deseja realmente excluir seu usuário?</h3>
          <h4>Aviso: Todos os documentos relacionados a este usuário serão perdidos!</h4>
          {errorDelete && <div className={styles.errorMessage}>{errorDelete}</div>}
          <button type="button" className={styles.submitButton1} onClick={submitDelete}>
            Confirmar
          </button>
          <button type="button" className={styles.submitButton2} onClick={onClose}>
            Cancelar
          </button>
      </div>
    </div>
  );
};

export default DeleteUserModal;
