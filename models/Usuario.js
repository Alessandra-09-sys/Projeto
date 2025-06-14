const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = Schema({
    email: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    senha: { type: String, required: true}
});

module.exports = mongoose.model("Usuario", usuarioSchema);
