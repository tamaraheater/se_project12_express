const router = require("express").Router();
const { getUsers } = require("../controllers/users");

router.get("/", () => console.log("GET users"));
router.get("/:userId", () => console.log("GET users"));
router.post("/", () => console.log("POST users"));

module.exports = router;
