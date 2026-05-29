const router = require("express").Router();

const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");

const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");

// ====================== PUBLIC ROUTES ======================
router.post("/signup", createUser);
router.post("/signin", login);

// GET /items is public
router.get("/items", clothingItemsRouter);

// ====================== PROTECTED ROUTES ======================
router.use(auth);   // ← Everything below this line requires authentication

router.use("/users", usersRouter);

// All other /items routes (POST, DELETE, likes, etc.) are protected
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
