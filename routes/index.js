const router = require("express").Router();

const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");

const { NOT_FOUND } = require("../utils/errors");

router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
