const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Verifique se o 'jsonwebtoken' foi incluído

const UserController = {

    login: async (req, res) => {
        try {
            const { email, senha } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).json({
                    msg: "Email ou senha incorretos"
                });
            }

            const isValida = await bcrypt.compare(senha, user.senha);
            if (!isValida) {
                return res.status(400).json({
                    msg: "Email ou senha incorretos"
                });
            }

            const token = jwt.sign({
                email: user.email,
                nome: user.nome
            }, process.env.SECRET, { expiresIn: '1h' });

            return res.status(200).json({
                msg: "Login realizado",
                token
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "acione o suporte"
            });
        }
    },

    create: async (req, res) => {
        try {
            const { nome, senha, email } = req.body;
            
            const hashSenha = await bcrypt.hash(senha, 10);
            const userCriado = await User.create({ nome, senha: hashSenha, email });

            return res.status(200).json({
                msg: "Usuario criado com sucesso",
                user: userCriado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "acione o suporte" });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, senha, email } = req.body;

            const userUpdate = await User.findByPk(id);
            if (userUpdate == null) {
                return res.status(200).json({
                    msg: "Usuario não encontrado",
                });
            }

            const update = await userUpdate.update({ nome, senha, email });
            if (update) {
                return res.status(200).json({
                    msg: "Usuario atualizado com sucesso",
                });
            }

            return res.status(500).json({
                msg: "Erro ao atualizar",
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "acione o suporte" });
        }
    },

    getAll: async (req, res) => {
        try {
            const usuarios = await User.findAll();
            return res.status(200).json({
                msg: "Usuarios encontrados!",
                usuarios
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "acione o suporte" });
        }
    },

    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioEncontrado = await User.findByPk(id);

            if (usuarioEncontrado == null) {
                return res.status(400).json({
                    msg: "Usuario não encontrado!"
                });
            }

            return res.status(200).json({
                msg: "Usuario encontrado com sucesso!",
                usuario: usuarioEncontrado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "acione o suporte" });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const userFind = await User.findByPk(id);

            if (userFind == null) {
                return res.status(200).json({
                    msg: "Usuario não encontrado",
                });
            }

            await userFind.destroy();
            return res.status(200).json({
                msg: "Usuario deletado com sucesso",
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "acione o suporte" });
        }
    },
};

module.exports = UserController;
