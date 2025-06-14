const bcryptjs = require("bcryptjs");
const Usuario = require("../models/Usuario");

class UsuarioController {
 static async cadastrar(req, res){
        if(req.body._id == ''){ //cadastrar
            const novoUsuario = new Usuario ({
                id: req.body.id,
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            })
            await novoUsuario.save();
            res.redirect("/usuarios");
        }else{ //atualizar
            const id = req.body.id;
            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(req.body.senha, salt);
            // bcryptjs.compareSync(senha, hash);
            const usuarioUpdate = {
                nome: req.body.nome,
                email: req.body.email,
                senha: hash
            }
            await Usuario.findOneAndUpdate({id:id}, usuarioUpdate);
            res.redirect("/usuarios");
        }
    }
    static cadastrarGet(req, res){
        console.log("Rota cadastrar GET acessada");
        res.render("cadastrarUsuario");
    }
    static async atualizar(req, res){
        const id = req.params.id;
        const usuarioUpdate = await Usuario.findOne({id:id});
        res.render("usuario/cadastrar", {usuarioUpdate});
    }
    static async listar(req, res) {
        if (req.query.acao === 'excluir' && req.query.id) {
            await Usuario.deleteOne({ id: req.query.id });
        }

        const usuarios = await Usuario.find();
        res.render("usuarios", { usuarios });
    }

    static async detalhar(req, res) {
        const usuario = await Usuario.findById(req.params.id);
        res.render("detalhar", { usuario });
    }
}

module.exports = UsuarioController;
