const bcryptjs = require("bcryptjs");
const AlunoModel = require("../models/Aluno");

class AlunoController {

    // Listar todos os alunos
    static async listar(req, res) {
        try {
            // Se houver query de exclusão
            if (req.query.acao === 'excluir' && req.query.id) {
                await AlunoModel.deleteOne({ _id: req.query.id });
            }

            const alunos = await AlunoModel.find();
            res.render("alunos/listar", { alunos });
        } catch (error) {
            console.error("Erro ao listar alunos:", error);
            res.status(500).send("Erro ao listar alunos");
        }
    }

    // Exibir detalhes de um aluno
    static async detalhar(req, res) {
        try {
            const aluno = await AlunoModel.findById(req.params.id);
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
    static cadastrarGet(req, res) {
        res.render("alunos/cadastrar", { aluno: { nome: "", matricula: "", disciplina: "" } });
    }

    // Exibir formulário de atualização de aluno existente
    static async atualizar(req, res) {
        try {
            const aluno = await AlunoModel.findById(req.params.id);
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
