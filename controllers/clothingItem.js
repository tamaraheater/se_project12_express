const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  FORBIDDEN,
} = require("../utils/errors");

const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      console.error(err);
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId.toString()) {
        const err = new Error("You are not authorized to delete this item");
        err.statusCode = FORBIDDEN;
        throw err;
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => res.status(204).send({}))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError" || err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      if (err.statusCode === "Forbidden") {
        return res
          .status(FORBIDDEN)
          .send({ message: "You are not authorized to delete this item" });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = { createItem, getItems, deleteItem };
