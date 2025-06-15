const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/alunoController');

router.get('/', AlunoController.listar);
router.get('/:id', AlunoController.detalhar);
router.get('/cadastrar', AlunoController.cadastrarGet);
router.get('/cadastrar/:id', AlunoController.atualizar);
router.post('/cadastrar', AlunoController.cadastrar);

module.exports = router;
