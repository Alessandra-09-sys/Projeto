const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/AlunoController');

router.get('/', AlunoController.listar);
router.get('/detalhar/:id', AlunoController.detalhar);


module.exports = router;
