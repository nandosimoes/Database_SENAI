const validationProduct = (req, res, next) => {

    // Valida se não estão vazios os campos
    const {nome,preco, quantidade} = req.body

    if (!nome || !preco || !quantidade ) {
        return res.status(400).json ({
            msg: "campos invalidos, tente novamente"
        })
    }
    return next()
}
const validateAmbienteId = (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json ({
            msg: "parametro faltando, tente novamente"
        })
    }
    return next()
}
module.exports = { validationProduct, validateAmbienteId }