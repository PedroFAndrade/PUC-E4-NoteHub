import { useSidebarContext } from '../../connections/requisitions';

const TopBarModel = () => {
    const { textNote, editNotes, noteID, typeNote } = useSidebarContext()

    return {
        textNote,
        editNotes,
        noteID,
        typeNote
    };
};

export default TopBarModel;