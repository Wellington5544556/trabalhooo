const express = require('express');
const auth = require('../middleware/authMiddleware');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.get('/dashboard', auth, async (req, res) => {
    const usuarios = await Usuario.findAll({ attributes: ['id', 'email'] });
    res.json(usuarios);
});

module.exports = router;