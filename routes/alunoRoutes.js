const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/alunoController');

router.get('/', AlunoController.listar);
router.get('/cadastrar', AlunoController.cadastrarGet);
router.get('/cadastrar/:matricula', AlunoController.atualizar);
router.post('/cadastrar', AlunoController.cadastrar);
router.get('/:id', AlunoController.detalhar);

module.exports = router;
