const validationUser = (req, res, next) => {

    // Valida se não estão vazios os campos
    const {nome,email, senha} = req.body
    if (!nome || !email || !senha ) {
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
module.exports = { validationUser, validateAmbienteId }