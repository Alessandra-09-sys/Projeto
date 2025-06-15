const express = require('express');
require('dotenv/config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://bkgr:k3AIHfwukvgLffGa@cluster0.ed1695b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Configurações de view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas
const alunoRoutes = require('./routes/alunoRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

app.use('/alunos', alunoRoutes);        // Prefixo /alunos
app.use('/usuarios', usuariosRoutes);   // Prefixo /usuarios

app.get('/', (req, res) => {
    res.render('index');
});

app.use((req, res) => {
    res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
