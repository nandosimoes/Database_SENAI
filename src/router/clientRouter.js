const { Router } = require("express");
const { validationClient, validateAmbienteId } = require("../middlewares/validationClient");
const ClientController = require("../controller/clientController");
const router = Router();

router.post('/',validationClient, (req, res) => {
    ClientController.create(req, res);
});
router.get('/', (req, res) => {
    ClientController.getAll(req, res);
});
router.delete('/:id',validateAmbienteId,  (req, res) => {
    ClientController.delete(req, res); 
});
router.put('/:id',validationClient , validateAmbienteId, (req, res) => {
    ClientController.update(req, res); 
});
router.get('/:id', (req, res) => {
    ClientController.getOne(req, res); 
});

module.exports = router;
