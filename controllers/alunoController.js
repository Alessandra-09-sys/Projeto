const AlunoModel = require('../models/Aluno');

class AlunoController {
    static async listar(req, res) {
        const alunos = await AlunoModel.find();
        res.render("alunos", { alunos });
    }
}

module.exports = AlunoController;
