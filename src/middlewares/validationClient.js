const validationClient = (req, res, next) => {

    // Valida se não estão vazios os campos
    
    const {nome,email, CPF} = req.body
    if (!nome || !email || !CPF ) {
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
module.exports = { validationClient, validateAmbienteId }