import React, { useState } from 'react';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './noteMenu.module.css';
import NoteMenuController from './controller';

const NoteMenu = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    return (
        <NoteMenuController>
            {({ handleCreateNote }) => (
                <div>
                    <PlusCircleOutlined
                        onClick={() => setIsMenuVisible(!isMenuVisible)}
                        className={styles.plusButton}
                    />

                    {isMenuVisible && (
                        <div className={styles.menuContainer}>
                            <button
                                className={styles.menuButton}
                                onClick={() => {
                                    handleCreateNote("text", '');
                                    setIsMenuVisible(false); // Fecha o menu após criar a nota
                                }}
                            >
                                <PlusOutlined
                                    style={{ fontSize: '1rem', color: 'white', marginRight: '8px' }}
                                />
                                Criar Nota
                            </button>
                            <button
                                className={styles.menuButton}
                                onClick={() => {
                                    handleCreateNote("list", []);
                                    setIsMenuVisible(false); // Fecha o menu após criar a nota
                                }}
                            >
                                <PlusOutlined
                                    style={{ fontSize: '1rem', color: 'white', marginRight: '8px' }}
                                />
                                Criar Lista
                            </button>
                        </div>
                    )}
                </div>
            )}
        </NoteMenuController>
    );
};

export default NoteMenu;
