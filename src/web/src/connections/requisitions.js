import { api } from "./notes";
import React, { createContext, useContext, useState, useCallback  } from 'react';

const NotesContext = createContext();

export const useSidebarContext = () => useContext(NotesContext);

export const SidebarProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [titleNote, setTitleNote] = useState();
    const [textNote, setTextNote] = useState();
    const [typeNote, setTypeNote] = useState('');
    const [noteID, setNoteID] = useState();

    const getAll = useCallback(async () => {
        const token = sessionStorage.getItem('Token');
        try {
            const response = await api.get('/getall', {
                headers: { 'Authorization': token }
            });
            setData(response.data);
        } catch (err) {
            console.error("Erro ao carregar as notas:", err);
            setData([]); // Garante que o estado não fique indefinido
        }
    }, []);

    const createNote = async (title, body, type) => {
        const token = sessionStorage.getItem('Token');
        try {
            const newNote = { title, body, type };
            const response = await api.post('/createNote', newNote, {
                headers: { Authorization: token }
            });
            const createdNote = response.data;
            setData((prevData) => [...prevData, createdNote]);
            return createdNote;
        } catch (error) {
            console.error("Erro ao criar a nota", error);
            throw error;
        }
    };    

    const deleteNotes = () => {
        const token = sessionStorage.getItem('Token');
        api.delete(`/deleteNote/${noteID}`, {
            headers: { 'Authorization': token }
        }).then(() => {
            setTextNote('')
            setTitleNote('')
            getAll()
        }).catch(err => {
            console.error(err);
        });
    };

    const editNotes = (Body=false, Title=false) => {
        const token = sessionStorage.getItem('Token');
        const updatedNote = {};

        if (Body) {
            updatedNote.body = textNote; 
        }
        
        if (Title) {
            updatedNote.title = titleNote;
        }
        
        api.put(`/editNote/${noteID}`,updatedNote, {
            headers: { 'Authorization': token },
        }).then(() => {
            getAll()
        }).catch(err => {
            console.error(err);
        });
    };

    return (
        <NotesContext.Provider value={{ 
            data, 
            getAll, 
            deleteNotes, 
            createNote,
            textNote, 
            setTextNote, 
            editNotes, 
            noteID, 
            setNoteID, 
            typeNote, 
            setTypeNote,
            titleNote, 
            setTitleNote
            
            }}>
            {children}
        </NotesContext.Provider>
    );
};
