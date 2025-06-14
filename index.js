const express = require('express');
require('dotenv/config');
const app = express();
const path = require('path');
const alunoRoutes = require('./routes/alunoRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const Aluno = require('./models/Aluno');
const Usuario = require('./models/Usuario');


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/alunos", alunoRoutes);

app.use("/usuarios", usuariosRoutes);
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://bkgr:k3AIHfwukvgLffGa@cluster0.ed1695b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.get("/", async function(req, res) {
    const usuarios = await Usuario.find();
    res.render("usuarios", { usuarios });
});



// app.get("/alunos/", async function(req, res) {
//     const alunos = await Aluno.find();
//     res.render("matriculas", { alunos });
// });

// app.get("/alunos/:id", async function(req, res) {
//     const aluno = await Aluno.findById(req.params.id);
//     res.render("detalhar", { aluno });
// });


// app.get("/disciplina/", function(req, res) {
//     res.send("Lista de Cursos");
// });

// app.get("/Dados/", function(req, res) {
//     const { matricula, nome, disciplina } = req.query;
//     const pessoa = { nome, matricula, disciplina };
//     res.render("dados", { pessoa }); 
// });

// app.post("/alunos", async function(req, res) {
//     const { matricula, nome, disciplina } = req.body;
//     const alunoExistente = await Aluno.findOne({ matricula });
//     const novoAluno = new Aluno({ matricula, nome, disciplina });
//     await novoAluno.save();
//     res.redirect("/");
// });

app.use(function(req, res) {
    res.status(404).render("404");
});

app.listen(process.env.PORT, function() {
    console.log("RODANDO...");
});