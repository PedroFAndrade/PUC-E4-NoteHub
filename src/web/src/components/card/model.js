import { useState, useRef, useEffect } from 'react';
import { useSidebarContext } from '../../connections/requisitions';


const useModelCard = ({text, onClick, isSelected}) => {
    const { deleteNotes, editNotes, setTitleNote, titleNote } = useSidebarContext()
    const inputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (event) => {
        setTitleNote(event.target.value);
      };

    useEffect(() => {
    if (isEditing) {
        inputRef.current.focus();
    }
    }, [isEditing]);
  

    return {
        deleteNotes,
        text,
        onClick,
        isSelected,
        setIsEditing,
        isEditing,
        setTitleNote,
        editNotes,
        handleChange,
        titleNote,
        inputRef
    };
};

export default useModelCard;




