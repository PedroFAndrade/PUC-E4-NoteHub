import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import styles from './userMenu.module.css';
import { EditUserController } from '../../components/editUserModal/controller';
import { DeleteUserController } from '../../components/deleteUserModal/controller';
import DecodeController from '../../components/decodeToken/controller';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    // Atualiza os dados do usuário ao carregar o componente
    useEffect(() => {
        const fetchUserData = async () => {
            const data = await DecodeController();
            setUserData(data);
        };

        fetchUserData();
    }, []);

    const handleEdit = async () => {
        setIsModalOpen(false);

        // Recarrega os dados após edição
        const updatedData = await DecodeController();
        setUserData(updatedData);
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(false);
        navigate('/.');
        sessionStorage.removeItem('Token');
    };

    return (
        <div>
            <UserOutlined
                onClick={() => setIsMenuVisible(!isMenuVisible)}
                className={styles.userButton}
            />

            {isMenuVisible && (
                <div className={styles.menuContainer}>
                    <button className={styles.head}>
                        Bem-vindo, {userData?.name || 'Usuário'}!
                    </button>
                    <button className={styles.menuButton} onClick={() => setIsModalOpen(true)}>
                        <EditOutlined style={{ fontSize: '1rem', color: 'white', marginRight: '8px' }} />
                        Editar Usuário
                    </button>
                    <button className={styles.menuButton} onClick={() => setIsDeleteModalOpen(true)}>
                        <DeleteOutlined style={{ fontSize: '1rem', color: 'white', marginRight: '8px' }} />
                        Excluir Usuário
                    </button>
                    <button className={styles.menuButton} onClick={() => handleDelete()}>
                        <LogoutOutlined style={{ fontSize: '1rem', color: 'white', marginRight: '8px' }} />
                        Logout
                    </button>

                    {isModalOpen && <EditUserController onClose={() => setIsModalOpen(false)} handleEdit={handleEdit} />}
                    {isDeleteModalOpen && <DeleteUserController onClose={() => setIsDeleteModalOpen(false)} handleDelete={handleDelete} />}
                </div>
            )}
        </div>
    );
};

export default UserMenu;
