const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matriculaSchema = Schema({
    codigo: { type: String, required: true, unique: true },
    aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true }
});

module.exports = mongoose.model("Matricula", matriculaSchema);
