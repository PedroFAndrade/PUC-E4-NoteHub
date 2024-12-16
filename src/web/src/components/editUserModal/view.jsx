import { CloseOutlined } from '@ant-design/icons';
import styles from './editUserModal.module.css';

const EditUserModal = ({ formData, handleChange, onClose, submitEdit, errorEdit }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseOutlined style={{ fontSize: '1rem', color: 'black' }} />
        </button>
        <h2>Editar Usuário</h2>
        <div>
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
            placeholder="Nova senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar nova senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errorEdit && <div className={styles.errorMessage}>{errorEdit}</div>}
          <button type="button" className={styles.submitButton} onClick={submitEdit}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
