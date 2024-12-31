const express = require("express");
const { fetchAllMenu, addNewMenuItem, updateMenuItem, deleteMenuItem } = require("../controller/menu");

const router = express.Router();

// Register
router.get("", fetchAllMenu);
router.post("", addNewMenuItem);
router.put("/:id", updateMenuItem)
router.delete("/:id", deleteMenuItem)

module.exports = router;
