const router = require("express").Router();

const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");

router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Router not found" });
});

module.exports = router;
