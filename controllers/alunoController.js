const AlunoModel = require('../models/Aluno');

class AlunoController {
    static async listar(req, res) {
        if (req.query.acao === 'excluir' && req.query.matricula) {
            await AlunoModel.deleteOne({ matricula: req.query.matricula });
        }

        const alunos = await AlunoModel.find();
        res.render("alunos", { alunos });
    }

    static async detalhar(req, res) {
        const aluno = await AlunoModel.findById(req.params.id);
        res.render("detalhar", { aluno });
    }
}

module.exports = AlunoController;
