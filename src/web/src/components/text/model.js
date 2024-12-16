import { useSidebarContext } from '../../connections/requisitions';
import { useState, useEffect } from 'react';

const TextModel = () => {
    const { textNote, setTextNote, typeNote, editNotes, titleNote } = useSidebarContext()
    const [inputValue, setInputValue] = useState('');
    const [shouldEdit, setShouldEdit] = useState(false);

    const [updateValue, setUpdateValue] = useState('');
    const [updateCheck, setUpdateCheck] = useState(false);

    useEffect(() => {
        if (shouldEdit) {
            editNotes(true);
            setShouldEdit(false);
        }
    }, [textNote, shouldEdit, editNotes]); 

    const addItem = () => {
        setTextNote(prevState => [
            ...prevState,
            { name: inputValue, status: false, edit: false}
        ])
        setShouldEdit(true);
    };

    const editItem = (id, newName, newStatus, isEdit) => {
        setTextNote(prevState =>
            prevState.map((item, index) =>
                index === id
                    ? { ...item, name: newName, status: newStatus, edit: isEdit } // Atualiza nome e status
                    : item // Mantém os outros itens inalterados
            )
        );
        setShouldEdit(true);
    };

    const deleteItem = (name) => {
        setTextNote(prevState => prevState.filter(item => item.name !== name));
        setShouldEdit(true);
    };

    return {
        textNote,
        setTextNote,
        typeNote,
        titleNote,

        addItem,
        editItem,
        deleteItem,
        inputValue,
        setInputValue,
        updateValue, 
        setUpdateValue,
        updateCheck, 
        setUpdateCheck,
    };
};

export default TextModel;