const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matriculaSchema = new Schema({
    matricula: { type: Number, required: true, unique: true },
    aluno: { type: String,  required: true },
    disciplina: { type: String,  required: true }
});

module.exports = mongoose.model("Matricula", matriculaSchema);
