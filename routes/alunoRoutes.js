const express = require("express");
const routes = express.Router();
const AlunoController = require("../controllers/alunoController");

routes.get("/", AlunoController.listar);

module.exports = routes;
router.get('/detalhar/:id', AlunoController.detalhar);