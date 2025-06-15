const AlunoModel = require("../models/Aluno");
const Disciplina = require('../models/Disciplina');

class AlunoController {

    // Listar todos os alunos
    static async listar(req, res) {
        try {
            // Se houver query de exclusão
            if (req.query.acao === 'excluir' && req.query.matricula) {
                await AlunoModel.deleteOne({ matricula: req.query.matricula });
            }

            const alunos = await AlunoModel.find().populate('disciplina');
            res.render("alunos/listar", { alunos });
        } catch (error) {
            console.error("Erro ao listar alunos:", error);
            res.status(500).send("Erro ao listar alunos");
        }
    }

    // Exibir detalhes de um aluno
    static async detalhar(req, res) {
        try {
            const aluno = await AlunoModel.findById(req.params.id).populate('disciplina');
            if (!aluno) {
                return res.status(404).send("Aluno não encontrado");
            }
            res.render("alunos/detalhar", { aluno });
        } catch (error) {
            console.error("Erro ao detalhar aluno:", error);
            res.status(500).send("Erro ao detalhar aluno");
        }
    }

    // Exibir formulário de cadastro de novo aluno
    static async cadastrarGet(req, res) {
        const disciplinas = await Disciplina.find();
        res.render("alunos/cadastrar", { aluno: { nome: "", matricula: "", disciplina: "" }, disciplinas });
    }

    // Exibir formulário de atualização de aluno existente
    static async atualizar(req, res) {
        try {
            const aluno = await AlunoModel.findOne({ matricula: req.params.matricula });
            if (!aluno) {
                return res.status(404).send("Aluno não encontrado");
            }
            res.render("alunos/cadastrar", { aluno });
        } catch (error) {
            console.error("Erro ao carregar formulário de edição:", error);
            res.status(500).send("Erro ao carregar formulário");
        }
    }

    // Processar cadastro ou atualização (POST)
    static async cadastrar(req, res) {
        try {
            const { _id, nome, matricula, disciplina } = req.body;
            if (!_id) {
                const novoAluno = new AlunoModel({
                    nome,
                    matricula,
                    disciplina
                });
                await novoAluno.save();
            } else {
                // Atualização de aluno existente
                await AlunoModel.findByIdAndUpdate(_id, {
                    nome,
                    matricula,
                    disciplina
                });
            }

            res.redirect("/alunos");
        } catch (error) {
            console.error("Erro ao salvar aluno:", error);
            res.status(500).send("Erro ao salvar aluno");
        }
    }
}

module.exports = AlunoController;
