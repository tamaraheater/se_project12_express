const User = require("../models/user.js");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.userController });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err)
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.nameValidationController });
      }
      return res.status(500).send({ message: err.createUserController });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err)
      if (err.name === "DocumentNotFound") {
        return res.status(400).send({ message: err.getIdUserController });
      } else if (err.name === "CastError"){
        return res.status(404).send({ message: err.getIdCastError });
      }
      return res.status(501).send({ message: err.getIdUserController });
    });
};

module.exports = { getUsers, createUser, getUser };
