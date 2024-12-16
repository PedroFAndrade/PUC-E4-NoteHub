import useNoteMenuModel from './model';

const NoteMenuController = ({ children }) => {
    const noteMenuModel = useNoteMenuModel();

    return children(noteMenuModel); // Passa `noteMenuModel` completo para os filhos
};

export default NoteMenuController;
