const { Router } = require("express");
const UserController = require("../controller/userController");
const { validationUser, validateAmbienteId } = require("../middlewares/validationUser");
const authenticateToken = require('../middlewares/authenticateToken')
const router = Router();

router.post('/',validationUser, (req, res) => {
    UserController.create(req, res);
});
router.get('/', (req, res) => {
    UserController.getAll(req, res);
});
router.delete('/:id',  (req, res) => {
    UserController.delete(req, res); 
});
router.put('/:id',validationUser, validateAmbienteId, (req, res) => {
    UserController.update(req, res); 
});
router.get('/:id', (req, res) => {
    UserController.getOne(req, res); 
});
router.post('/login', (req, res) => {
    UserController.login(req,res)
})

module.exports = router;
