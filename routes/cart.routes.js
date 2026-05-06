const { Router } = require("express");
const { authHandler } = require("../middleware/authMiddleware");
const { addToCartController, removeFromCartController, getCartItemsController } = require("../controllers/cartController");

const cartRouter = Router();

cartRouter.post('/:id',authHandler,addToCartController);
cartRouter.delete('/:id',authHandler,removeFromCartController);
cartRouter.get('/',authHandler,getCartItemsController)

module.exports = cartRouter;