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
        .send({ message: "An error occurred on the server." });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({ owner: req.user._id })
    .sort({ createdAt: -1 })
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      console.error(err);
      res
        .status(SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => new Error("Item not found"))
    .then((item) => {
      if (item.owner.toString() !== userId.toString()) {
        const err = new Error("You are not authorized to delete this item");
        err.statusCode = FORBIDDEN;
        throw err;
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => res.status(204).send())
    .catch((err) => {
      console.error(err);

      if (err.message === "Item not found" || err.name === "CastError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      if (err.statusCode === FORBIDDEN) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You are not authorized to delete this item" });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail(() => new Error("Item not found"))
    .then((updatedItem) => res.status(200).send({ data: updatedItem }))
    .catch((err) => {
      console.error(err);
      if (err.message === "Item not found" || err.name === "CastError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail(() => new Error("Item not found"))
    .then((updatedItem) => res.status(200).send({ data: updatedItem }))
    .catch((err) => {
      console.error(err);
      if (err.message === "Item not found" || err.name === "CastError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  const allowedFields = ['name', 'imageURL'];
  const updates = {};

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    return res.status(BAD_REQUEST).send({ message: "No valid fields to update" });
  }

  ClothingItem.findById(itemId)
    .orFail(() => new Error("Item not found"))
    .then(item => {
      if (item.owner.toString() !== userId.toString()) {
        const err = new Error("You are not authorized to update this item");
        err.statusCode = FORBIDDEN;
        throw err;
      }

      return ClothingItem.findByIdAndUpdate(
        itemId,
        { $set: updates },
        { new: true, runValidators: true }
      );
    })
    .then(updatedItem => res.status(200).send({ data: updatedItem }))
    .catch(err => {
      console.error(err);

      if (err.message === "Item not found" || err.name === "CastError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      if (err.statusCode === FORBIDDEN) {
        return res.status(FORBIDDEN).send({ message: "You are not authorized to update this item" });
      }

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data for update" });
      }

      return res.status(SERVER_ERROR).send({ message: "An error occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
  updateItem,
};