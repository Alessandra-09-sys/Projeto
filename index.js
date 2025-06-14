const express = require('express');
const app = express();
const path = require('path');
const alunoRoutes = require('./routes/alunoRoutes');
const Aluno = require('./models/Aluno');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/alunos", alunoRoutes);

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://bkgr:k3AIHfwukvgLffGa@cluster0.ed1695b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.get("/", function(req, res) {
    const pessoa = {
        matricula: req.query.matricula,
        nome: req.query.nome,
        disciplina: req.query.disciplina,
    };
    res.render("index", { pessoa: pessoa });
});

app.get("/alunos/:id", async function(req, res) {
    const aluno = await Aluno.findById(req.params.id);
    res.render("detalhar", { aluno });
});

app.get("/disciplina/", function(req, res) {
    res.send("Lista de Cursos");
});

app.get("/Dados/", function(req, res) {
    const { matricula, nome, disciplina } = req.query;
    const pessoa = { nome, matricula, disciplina };
    res.render("dados", { pessoa }); 
});

app.post("/alunos", async function(req, res) {
    const { matricula, nome, disciplina } = req.body;

    const alunoExistente = await Aluno.findOne({ matricula });

    const novoAluno = new Aluno({ matricula, nome, disciplina });
    await novoAluno.save();
    
    res.render("index", {
        mensagemSucesso: "Aluno cadastrado com sucesso!",
        pessoa: {}
    });
});

app.use(function(req, res) {
    res.status(404).render("404");
});

app.listen(999, function() {
    console.log("RODANDO...");
});
