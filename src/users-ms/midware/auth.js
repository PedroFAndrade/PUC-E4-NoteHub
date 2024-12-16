import jwt from 'jsonwebtoken';

// Middleware para validar o token de autorização
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    const tokenBody = req.body["headers"] ? req.body["headers"]['Authorization'] : null;

    if (!token && !tokenBody) {
        return res.status(401).json({ message: 'Token de autorização é necessário.' });
    }
    try {
        const verified = jwt.verify(token || tokenBody, process.env.SECRET_KEY);
        req.user = verified;
        next();

    } catch (err) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};