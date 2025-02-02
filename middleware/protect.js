require("dotenv").config();
const jwt = require('jsonwebtoken');
const { Administrador, Conductor, Estudiante } = require('../models');

module.exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extraer el token

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "password_secreto");

            let user = await Administrador.findByPk(decoded.id, { attributes: { exclude: ['password'] } });

            if (!user) {
                user = await Conductor.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
            }

            if (!user) {
                user = await Estudiante.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
            }

            if (!user) {
                return res.status(401).json({ message: 'Usuario no autorizado' });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token no encontrado' });
    }
};

module.exports.admin = async (req, res, next) => {
    if (!req.user || !req.user instanceof Administrador) {
        return res.status(403).json({ message: 'Acceso denegado, solo administradores' });
    }
    next();
};
