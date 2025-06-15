const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disciplinaSchema = Schema({
    codigo: Number,
    nome:String,
    Alunos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Aluno'}]
});
module.exports = mongoose.model("Disciplina", disciplinaSchema);