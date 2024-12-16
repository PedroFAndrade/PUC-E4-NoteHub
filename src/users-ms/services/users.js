import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const prisma = new PrismaClient()

//CADASTRO

class User {
    static async register(req, res) {
        try {
            const user = req.body

            // Verifica se o e-mail já está cadastrado
            const existingUser = await prisma.user.findUnique({
                where: {email: user.email},
            });

            console.log(existingUser)

            if (existingUser) {
                return res.status(409).json({message: 'Usuário já existe'});
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(user.password, salt)

            const userDB = await prisma.User.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: hashPassword,
                    secretAnswer: user.secretAnswer,
                },
            })
            res.status(201).json(userDB)
        } catch (err) {
            console.error("==> Erro da requisição ", err)
            res.status(500).json(err)
        }
    }
}

//LOGIN
class Log {
    static async login(req, res) {
        try {
            const userInfo = req.body

            // Busca o usuário no banco de dados
            const user = await prisma.user.findUnique({
                where: {email: userInfo.email},
            })

            // Verifica se o usuário existe dentro do banco
            if (!user) {
                console.log(user)
                return res.status(404).json({message: 'Usuário não encontrado'})
            }

            // Compara a senha do banco com a que o usuário digitou
            const isMatch = await bcrypt.compare(userInfo.password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Senha Inválida'})
            }

            // Gerar o token JWT
            const token = jwt.sign({userId: user.id, name: user.name, email: user.email}, process.env.SECRET_KEY, {expiresIn: '1d'})

            res.status(200).json({token})
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Erro no Servidor'})
        }
    }
}

//EDITAR USER
class Edit {
    static async edit(req, res) {
        const userId = req.user.userId;
        const {email, name, password} = req.body;

        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const updatedUser = await prisma.user.update({
                where: {id: userId},
                data: {
                    email: email,
                    name: name,
                    password: hashPassword,
                },
            });

            res.status(200).json(updatedUser);
        } catch (err) {
            if (err.code === 'P2025') { // Erro Prisma para registro não encontrado
                res.status(404).json({message: 'Usuário não encontrado'});
            } else {
                res.status(500).json({message: 'Erro no servidor', error: err.message});
            }
        }
    }
}

//DELETE
class Exclude {
    static async delete(req, res) {
        const userId = req.user.userId;
        try {
            const user = await prisma.user.delete({
                where: {id: userId},
            });

            if (!user) {
                return res.status(404).json({message: 'Usuário não encontrado'});
            }

            res.status(200).json({message: 'Usuário deletado com sucesso!'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

// RECUPERAÇÃO DE ACESSO
class RecoverAccess {
    static async recover(req, res) {
        try {
            const { email, secretAnswer } = req.body;

            // Verifica se os campos foram preenchidos
            if (!email || !secretAnswer) {
                return res.status(400).json({ message: 'Preencha todos os campos' });
            }

            // Busca o usuário pelo email
            const user = await prisma.user.findUnique({
                where: { email: email },
            });

            // Verifica se o usuário foi encontrado e se a resposta secreta está correta
            if (!user || user.secretAnswer !== secretAnswer) {
                return res.status(400).json({ message: 'Dados incorretos' });
            }

            // Gera um token JWT
            const token = jwt.sign(
                { userId: user.id, name: user.name, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: '1d' }
            );

            res.status(200).json({ token });
        } catch (err) {
            res.status(500).json({ message: 'Erro no servidor', error: err.message });
        }
    }
}

// DECODE TOKEN
class Decode {
    static async decodeToken(req, res) {
        try {
            const { token } = req.body;

            // Verifica se o token foi fornecido
            if (!token) {
                return res.status(400).json({ message: 'Token não fornecido' });
            }

            // Decodifica o token usando a mesma chave secreta usada na criação
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            res.status(200).json({ userData: decoded });
        } catch (err) {
            res.status(401).json({ message: 'Token inválido ou expirado', error: err.message });
        }
    }
}

// LISTA USUÁRIOS
class List {
    static async list(req, res) {
        try {

            const user = await prisma.user.findMany()

            res.status(200).json({message: 'Usuários listados com sucesso', user})
        } catch (err) {
            res.status(500).json({message: 'Falha no servidor'})
        }
    }
}

export {User, Log, Exclude, Edit, RecoverAccess, Decode, List};
