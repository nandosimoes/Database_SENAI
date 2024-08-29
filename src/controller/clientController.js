const Client = require("../models/client");

const ClientController = {

    create: async (req, res) => {
        try {
            const { nome, email, CPF } = req.body;

            const clientCriado = await Client.create({nome,email,CPF})  
            console.log({ nome, CPF, email });

            return res.status(200).json({
                msg: "Cliente criado com sucesso",
                client: clientCriado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "acione o suporte" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, CPF, email } = req.body;

            console.log("Atualizando o objeto");
            console.log({ id });
            console.log({ nome, CPF, email });

            const clientUpdate = await Client.findByPk(id)
            if (clientUpdate == null) {
                return res.status(200).json({
                    msg: "Cliente não encontrado",
                });
            }
            const update = clientUpdate.update({
                nome, CPF, email
            })
            if(update) {
                return res.status(200).json({
                    msg: "Cliente atualizado com sucesso",
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
            const clientes = await Client.findAll();
            return res.status(200).json({
                msg: "Clientes encontados!",
                clientes
            })
        } catch (error) {
            console.log(error);
                return res.status(500).json({msg: "acione o suporte",});
        }
    },
    getOne: async (req, res) => {
        try {
const { id } = req.params
const clienteEncontrado= await Client.findByPk(id)

if (clienteEncontrado == null) {
    return res.status (400).json ({
        msg: "Cliente nao encontrado!"
    })
}
            return res.status(200).json({
                msg: "Cliente encontrado com sucesso!",
                cliente: clienteEncontrado
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "acione o suporte" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const clientFind = await Client.findByPk(id)

            if (clientFind == null) {
                return res.status(200).json({
                    msg: "Cliente não encontrado",
                })
            }
            if (clientFind) {
                await clientFind.destroy();
                return res.status(200).json({
                    msg: "Usuario deletado com sucesso",
                })
            }
        
        
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "acione o suporte" });
        }
    },
};

module.exports = ClientController

