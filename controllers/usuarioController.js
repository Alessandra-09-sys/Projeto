const bcryptjs = require("bcryptjs");
const Usuario = require("../models/Usuario");

class UsuarioController {
    
    // Listar todos os usuários
    static async listar(req, res) {
        try {
            // Se houver query de exclusão
            if (req.query.acao === 'excluir' && req.query.id) {
                await Usuario.deleteOne({ _id: req.query.id });
            }

            const usuarios = await Usuario.find();
            res.render("usuarios/listar", { usuarios });
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            res.status(500).send("Erro ao listar usuários");
        }
    }

    // Exibir detalhes de um usuário
    static async detalhar(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.id);
            if (!usuario) {
                return res.status(404).send("Usuário não encontrado");
            }
            res.render("usuarios/detalhar", { usuario });
        } catch (error) {
            console.error("Erro ao detalhar usuário:", error);
            res.status(500).send("Erro ao detalhar usuário");
        }
    }

    // Exibir formulário de cadastro de novo usuário
    static cadastrarGet(req, res) {
        res.render("usuarios/cadastrar", { usuario: { email: "", nome: "", senha: "" } });
    }

    // Exibir formulário de atualização de usuário existente
    static async atualizar(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.id);
            if (!usuario) {
                return res.status(404).send("Usuário não encontrado");
            }
            res.render("usuarios/cadastrar", { usuario });
        } catch (error) {
            console.error("Erro ao carregar formulário de edição:", error);
            res.status(500).send("Erro ao carregar formulário");
        }
    }

    // Processar cadastro ou atualização (POST)
    static async cadastrar(req, res) {
        try {
            const { _id, nome, email, senha } = req.body;
            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(senha, salt);
            if (!_id) {
                const novoUsuario = new Usuario({
                    nome,
                    email,
                    senha: hash
                });
                await novoUsuario.save();
            } else {
                // Atualização de usuário existente
                await Usuario.findByIdAndUpdate(_id, {
                    nome,
                    email,
                    senha: hash
                });
            }

            res.redirect("/usuarios");
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            res.status(500).send("Erro ao salvar usuário");
        }
    }
}

module.exports = UsuarioController;
