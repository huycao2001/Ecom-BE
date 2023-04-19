const { Router } = require("express");
const orderController = require("../controllers/orderControllers.js");
const router = Router();

router.get("/order/:userId", orderController.get_user_orders);
router.put("/order/:id", orderController.update_order);
router.get("/orders", orderController.get_all_orders);
router.post("/order", orderController.create_order);


router.post("/momoCheckout", orderController.momoCheckout);

//router.post("/order/:id", orderController.checkout);

module.exports = router;
