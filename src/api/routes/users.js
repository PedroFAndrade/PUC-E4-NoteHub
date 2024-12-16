import express from "express";
import dotenv from 'dotenv';
import axios from "axios";
import { ObjectId } from 'mongodb';

dotenv.config();

const routerUser = express.Router();

const api = axios.create({
    baseURL: process.env.USERS_MS
});

routerUser.get('/v2/api/restart', async (res) => {
    const response = await api.get('restart')
    await res.status(200).json(response.data)
})

// Listar usuários
routerUser.get('/v2/api/listar-usuarios', async (req, res) => {
    try {
        const response = await api.get('listar-usuarios', {
            headers: { 'Authorization': req.headers.authorization }
        });
        res.status(200).json(response.data);
    } catch (err) {
        res.status(err);
    }
});

// Cadastro de usuário
routerUser.post('/v2/api/cadastro', async (req, res) => {
    try {
        const response = await api.post('cadastro', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json(err);
    }
});

//Login Usuário
routerUser.post('/v2/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Email e password são obrigatórios" });
    }

    try {
        const response = await api.post('login', { email, password });
        
        res.status(200).json(response.data);
    } catch (err) {
        res.status(err);
    }
});

// Atualizar usuário
routerUser.put('/v2/api/usuario', async (req, res) => {
    try {
        const response = await api.put('usuario', req.body, {
            headers: { 'Authorization': req.headers.authorization },
            data: req.body
        });
        res.status(200).json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json(err);
    }
});

// Deletar usuário
routerUser.delete('/v2/api/usuario', async (req, res) => {
    try {
        const response = await api.delete('usuario', {
            headers: { 'Authorization': req.headers.authorization },
        });
        res.status(200).json(response.data);
    } catch (err) {
        res.status(err);
    }
});

// Recuperar Usuário
routerUser.post('/v2/api/recover', async (req, res) => {
    const { email, secretAnswer } = req.body;
    
    if (!email || !secretAnswer) {
        return res.status(400).json({ message: "Email e Palavra Secreta são obrigatórios" });
    }

    try {
        const response = await api.post('recover', { email, secretAnswer });
        
        res.status(200).json(response.data);
    } catch (err) {
        res.status(err);
    }
});

// Decodificar Token
routerUser.post('/v2/api/decode', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token é obrigatório" });
    }

    try {
        // Envia a requisição ao microserviço de usuários para decodificar o token
        const response = await api.post('decode', { token });
        
        res.status(200).json(response.data);
    } catch (err) {
        res.status(err);
    }
});

export { routerUser };
