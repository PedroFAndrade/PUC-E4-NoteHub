import express from 'express';
import { verifyToken } from '../midware/verifyToken.js'
import Notes from '../services/notes.js';

import jwt from 'jsonwebtoken';

const routerNotes = express.Router();

// Rota para listar todas as notas associadas ao usuario logado
routerNotes.get('/v1/api/getall', verifyToken, async (req, res) => {
    await Notes.getAllNotes(req, res)

});

// Rota para criação das notas
routerNotes.post('/v1/api/createNote', verifyToken, async (req, res) => {
    await Notes.createNote(req, res);
});

// Rota para editar as notas
routerNotes.put('/v1/api/editNote/:noteId', verifyToken, async (req, res) => {
    await Notes.editNote(req, res);
});

// Rota para deletar uma nota específica
routerNotes.delete('/v1/api/deleteNote/:noteId', verifyToken, async (req, res) => {
    await Notes.deleteNote(req, res);
});

routerNotes.get('/v1/api/restart', async (req, res) => {
    await res.json('Reiniciado')
})

export { routerNotes };
