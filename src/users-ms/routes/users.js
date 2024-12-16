import express from 'express';
import { User, Log, Exclude, Edit, RecoverAccess, Decode, List } from '../services/users.js';
import { verifyToken } from '../midware/auth.js';

const routerUser = express.Router();


// CADASTRO
routerUser.post('/v1/api/cadastro', async (req, res) => {
    await User.register(req, res)
})

// LOGIN
routerUser.post('/v1/api/login', async (req, res) => {
    await Log.login(req, res)
});

// PUT - Editar usuário por ID
routerUser.put('/v1/api/usuario',verifyToken, async (req, res) => {
    await Edit.edit(req, res)
});

// DELETE - Deletar usuário por ID
routerUser.delete('/v1/api/usuario', verifyToken, async (req, res) => {
    await Exclude.delete(req, res)
});

// RECUPERAÇÃO DE ACESSO
routerUser.post('/v1/api/recover', async (req, res) => {
    await RecoverAccess.recover(req, res)
});

// DECODE TOKEN
routerUser.post('/v1/api/decode', async (req, res) => {
    await Decode.decodeToken(req, res);
});

// LISTAR USUÁRIOS
routerUser.get('/v1/api/listar-usuarios', async (req, res) => {
    await List.list(req,res)
});

routerUser.get('/v1/api/restart', async (req, res) => {
    await res.json('Reiniciado')
})

export { routerUser };
