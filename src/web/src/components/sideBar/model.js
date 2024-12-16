import { useEffect, useState } from 'react';
import { useSidebarContext } from '../../connections/requisitions';

const useModelSideBar = () => {
    const [selectedNote, setSelectedNote] = useState()
    const [searchTerm, setSearchTerm] = useState('');
    const { data, getAll, setTextNote, setNoteID, setTypeNote, setTitleNote} = useSidebarContext()

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredNotes = data?.filter(note =>
        note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        getAll()
    }, [getAll])

    return {
        data,
        setTextNote,
        setNoteID,
        selectedNote,
        setSelectedNote,
        searchTerm,
        handleSearchChange,
        filteredNotes,
        setTypeNote,
        setTitleNote
    };
};

export default useModelSideBar;
