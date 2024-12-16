import { useState } from 'react';
import { useSidebarContext } from '../../connections/requisitions';

const useNoteMenuModel = () => {
    const { createNote, getAll } = useSidebarContext(); // Adiciona getAll para atualizar a lista
    const [titleNote, setTitleNote] = useState('Título Padrão');
    const [typeNote, setTypeNote] = useState('text'); // Define o tipo padrão como 'text'
    const [error, setError] = useState('');

    const handleCreateNote = async (typeNote, body) => {
        try {
            await createNote(titleNote, body, typeNote); // Cria a nota com valores predefinidos
            await getAll(); // Atualiza a lista de notas sem recarregar a página
        } catch (err) {
            console.error('Erro ao criar a nota:', err);
            setError('Erro ao criar a nota.');
        }
    };

    return {
        titleNote,
        setTitleNote,
        typeNote,
        setTypeNote,
        handleCreateNote,
        error,
    };
};

export default useNoteMenuModel;
