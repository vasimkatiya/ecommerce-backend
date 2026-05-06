const { Router } = require("express");
const { authHandler } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");
const { addProductController, getProductsController, deleteProductController, singleProductController, adminCreateProducts } = require("../controllers/productController");
const multer = require("multer");


const storage = multer.memoryStorage();

const upload = multer({
    storage:storage,
    limits:{fileSize : 1024 * 1024 * 15}
});

const productRouter = Router();

productRouter.post('/create',upload.array('images'),authHandler,isAdmin,addProductController);
productRouter.get('/',authHandler,getProductsController);
productRouter.delete('/:id',authHandler,deleteProductController);
productRouter.get('/:id',authHandler,singleProductController);
productRouter.get('/admin',authHandler,isAdmin,adminCreateProducts)
module.exports = productRouter;

