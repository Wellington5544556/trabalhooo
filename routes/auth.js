const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const exists = await Usuario.findOne({ where: { email } });
        if (exists) return res.status(400).json({ message: 'Email já cadastrado' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Usuario.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user });
    } catch (err) {
        console.error('Erro ao registrar:', err);
        return res.status(500).json({ message: 'Erro ao registrar' });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await Usuario.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Senha incorreta' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao logar' });
    }
  });

  module.exports = router;