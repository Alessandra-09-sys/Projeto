const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.listar);
router.get('/detalharUsuario/:id', usuarioController.detalhar);
router.get('/usuarios/cadastrar/:id', usuarioController.atualizar);
router.get('/usuarios/cadastrar', usuarioController.cadastrarGet);

module.exports = router;
