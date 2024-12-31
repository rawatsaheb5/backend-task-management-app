const express = require("express");
const { placeOrder, fetchUserOrders } = require("../controller/order");
const verifyToken = require("../middleware/auth");

const router = express.Router();


router.post("",verifyToken,  placeOrder );
router.get("",verifyToken, fetchUserOrders);

module.exports = router;
