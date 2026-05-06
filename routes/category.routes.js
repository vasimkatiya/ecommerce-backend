const { Router } = require("express");
const { authHandler } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");
const { createCategoryController, getCategoryController } = require("../controllers/categoryontroller");


const categoryRouter = Router();

categoryRouter.post('/create',authHandler,isAdmin,createCategoryController);
categoryRouter.get('/',authHandler,getCategoryController);

module.exports = categoryRouter