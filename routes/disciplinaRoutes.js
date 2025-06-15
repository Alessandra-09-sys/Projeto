const express = require('express');
const router = express.Router();
const DisciplinaController = require('../controllers/disciplinaController');

router.get('/', DisciplinaController.listar);
router.get('/cadastrar', DisciplinaController.cadastrarGet);
router.post('/cadastrar', DisciplinaController.cadastrar);
router.get('/:id', DisciplinaController.detalhar);

module.exports = router;
