const router = require("express").Router();

const {createItem, getItems, deleteItem } = require("../controllers/clothingItem")

router.post("/", createItem);
router.get("/", getItems);
router.delete("/:itemId", deleteItem);

module.exports = router;
