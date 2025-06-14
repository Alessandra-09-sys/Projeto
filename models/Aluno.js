const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alunoSchema = Schema({
    matricula: { type: Number, required: true, unique: true },
    nome: { type: String, required: true },
    disciplina: { type: String }
});

module.exports = mongoose.model("Aluno", alunoSchema);
