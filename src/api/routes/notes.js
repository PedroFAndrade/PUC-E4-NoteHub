import express from "express";
import dotenv from 'dotenv';
import axios from "axios";
import { ObjectId } from 'mongodb';

dotenv.config();

const routerNotes = express.Router();

const api = axios.create({
    baseURL: process.env.NOTES_MS
  });


routerNotes.get('/v2/api/restart', async (req, res) => {
    const response = await api.get('restart')
    const response2 = await axios.get('https://users-3a17.onrender.com/v1/api/restart')
    await res.json('Deu certo')
})


routerNotes.get('/v2/api/getall', async (req, res) => {
    try{
        const response = await api.get('getall', {
            headers: {'Authorization': req.headers.authorization}
        })
        await res.status(200).json(response.data)
    
    } catch (err){
        res.status(err.response["status"]).json(err.response["data"]["message"])
    }
})

routerNotes.post('/v2/api/createNote', async (req, res) => {
    try{

        const response = await api.post('createNote', {
            headers: {'Authorization': req.headers.authorization},
            data: req.body
        })
        await res.status(200).json(response.data)
    
    } catch (err){
       res.status(err.response["status"]).json(err.response["data"]["message"])
    }
})

routerNotes.put('/v2/api/editNote/:noteId', async (req, res) => {
    try {
        const response = await api.put(`editNote/${req.params.noteId}`, {
            headers: { 'Authorization': req.headers.authorization },
            data: req.body
        });

        await res.status(200).json(response.data);
    
    } catch (err) {
        res.status(err.response?.status || 500).json(err);
    }
});

routerNotes.delete('/v2/api/deleteNote/:noteId', async (req, res) => {
    try{
        
        const noteId = new ObjectId(req.params.noteId)
        const response = await api.delete(`deleteNote/${noteId}`, {
            headers: {'Authorization': req.headers.authorization},
            
        })
        await res.status(200).json(response.data)
    
    } catch (err){
       //res.status(err.response["status"]).json(err.response["data"]["message"])
       console.log(err)
    }
})

export { routerNotes };
