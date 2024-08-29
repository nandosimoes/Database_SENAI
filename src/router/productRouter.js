const { Router } = require("express");
const ProductController = require("../controller/productController");
const { validateAmbienteId, validationProduct } = require("../middlewares/validationProduct");
const router = Router();

router.post('/',validationProduct, (req, res) => {
    ProductController.create(req, res);
});
router.get('/', (req, res) => {
    ProductController.getAll(req, res);
});
router.delete('/:id',validateAmbienteId, (req, res) => {
    ProductController.delete(req, res);  
});
router.put('/:id',validationProduct,validateAmbienteId, (req, res) => {
    ProductController.update(req, res);  
});
router.get('/:id', (req, res) => {
    ProductController.getOne(req, res);  
});

module.exports = router;
