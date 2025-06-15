const Matricula = require('../models/Matricula');

class MatriculaController {
    static async listar(req, res) {
        try {
            const matriculas = await Matricula.find();
            res.render('matriculas/listar', { matriculas });
        } catch (error) {
            console.error('Erro ao listar matrículas:', error);
            res.status(500).send('Erro ao listar matrículas');
        }
    }

    static async cadastrarGet(req, res) {
        res.render('matriculas/cadastrar', { matricula: {} });
    }

    static async cadastrar(req, res) {
        try {
            const { matricula, aluno, disciplina } = req.body;
            const novaMatricula = new Matricula({ matricula, aluno, disciplina });
            await novaMatricula.save();
            res.redirect('/matriculas');
        } catch (error) {
            console.error('Erro ao cadastrar matrícula:', error);
            res.status(500).send('Erro ao cadastrar matrícula');
        }
    }

    static async detalhar(req, res) {
        try {
            const matricula = await Matricula.findById(req.params.id);
            if (!matricula) {
                return res.status(404).send('Matrícula não encontrada');
            }
            res.render('matriculas/detalhar', { matricula });
        } catch (error) {
            console.error('Erro ao detalhar matrícula:', error);
            res.status(500).send('Erro ao detalhar matrícula');
        }
    }
}

module.exports = MatriculaController;
