const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.detalhar);
router.get('/cadastrar', usuarioController.cadastrarGet);
router.get('/cadastrar/:id', usuarioController.atualizar);
router.post('/cadastrar', usuarioController.cadastrar);

module.exports = router;
