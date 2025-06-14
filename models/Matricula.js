const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matriculaSchema = Schema({
    matricula: { type: String, required: true, unique: true },
    aluno: { type: String,  required: true },
    disciplina: { type: String,  required: true }
});

module.exports = mongoose.model("Matricula", matriculaSchema);
