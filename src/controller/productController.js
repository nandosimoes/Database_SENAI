const Product = require("../models/product");

const ProductController = {

    create: async (req, res) => {
        try {
            const { nome, preco, quantidade } = req.body;

            const produtoCriado = await Product.create({ nome, preco, quantidade });
            console.log({ nome, preco, quantidade });

            return res.status(200).json({
                msg: "Produto criado com sucesso",
                produto: produtoCriado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Acione o suporte" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, preco, quantidade } = req.body;

            console.log("Atualizando o produto");
            console.log({ id });
            console.log({ nome, preco, quantidade });

            const produtoUpdate = await Product.findByPk(id);
            if (produtoUpdate == null) {
                return res.status(200).json({
                    msg: "Produto não encontrado",
                });
            }
            const update = produtoUpdate.update({
                nome, preco, quantidade
            });
            if (update) {
                return res.status(200).json({
                    msg: "Produto atualizado com sucesso",
                });
            }

            return res.status(500).json({
                msg: "Erro ao atualizar",
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Acione o suporte" });
        }
    },
    getAll: async (req, res) => {
        try {
            const produtos = await Product.findAll();
            return res.status(200).json({
                msg: "Produtos encontrados!",
                produtos
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Acione o suporte" });
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const produtoEncontrado = await Product.findByPk(id);

            if (produtoEncontrado == null) {
                return res.status(400).json({
                    msg: "Produto não encontrado!"
                });
            }
            return res.status(200).json({
                msg: "Produto encontrado com sucesso!",
                produto: produtoEncontrado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Acione o suporte" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const produtoFind = await Product.findByPk(id);

            if (produtoFind == null) {
                return res.status(200).json({
                    msg: "Produto não encontrado",
                });
            }
            
            await produtoFind.destroy();
            return res.status(200).json({
                msg: "Produto deletado com sucesso!"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Acione o suporte" });
        }
    },
};

module.exports = ProductController;
