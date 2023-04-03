const { Router } = require("express");
const cartController = require("../controllers/cartControllers.js");
const router = Router();

router.get("/cart/:id", cartController.get_cart_items);
router.post("/cart/:id", cartController.add_cart_item);
router.put("/cart/:id", cartController.update_cart_item);
router.delete("/cart/:userId", cartController.delete_item);


router.delete("/cart/:userId/deleteCart", cartController.delete_cart); // Delete the cart

module.exports = router;