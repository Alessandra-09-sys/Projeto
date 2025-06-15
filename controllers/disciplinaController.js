const Disciplina = require('../models/Disciplina');

class DisciplinaController {
    // Listar todas as disciplinas
    static async listar(req, res) {
        try {
            const disciplinas = await Disciplina.find().populate('Alunos');
            res.render('disciplinas/listar', { disciplinas });
        } catch (error) {
            console.error('Erro ao listar disciplinas:', error);
            res.status(500).send('Erro ao listar disciplinas');
        }
    }

    // Formulário de cadastro
    static async cadastrarGet(req, res) {
        res.render('disciplinas/cadastrar', { disciplina: {} });
    }

    // Salvar nova disciplina (POST)
    static async cadastrar(req, res) {
        try {
            const { codigo, nome } = req.body;
            const novaDisciplina = new Disciplina({ codigo, nome });
            await novaDisciplina.save();
            res.redirect('/disciplinas');
        } catch (error) {
            console.error('Erro ao cadastrar disciplina:', error);
            res.status(500).send('Erro ao cadastrar disciplina');
        }
    }

    // Detalhar uma disciplina
    static async detalhar(req, res) {
        try {
            const disciplina = await Disciplina.findById(req.params.id).populate('Alunos');
            if (!disciplina) {
                return res.status(404).send('Disciplina não encontrada');
            }
            res.render('disciplinas/detalhar', { disciplina });
        } catch (error) {
            console.error('Erro ao detalhar disciplina:', error);
            res.status(500).send('Erro ao detalhar disciplina');
        }
    }
}

module.exports = DisciplinaController;
