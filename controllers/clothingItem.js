const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req)
  console.log(req.body)
  const owner = req.user._id

  const{name, weather, imageURL} = req.body;

  ClothingItem.create({name, weather, imageURL, owner}).then((item) => {
      console.error(item);
      res.send({data:item})
  }).catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.createItem });
  });

};

const getItems = (req, res) => {
    ClothingItem.find({}).then((items) => res.status(200).send((items)))
    .catch((err) => {
       res.status(500).send({message:"Get Items Failed"})
    })
}

const deleteItem = (req, res) => {
  const {itemId} = req.params;
  console.log(itemId);
  ClothingItem.findbyIdAndDelete(itemId).orfail.then((item) => res.status(204).send({}))
  .catch((err) => {
    res.status(500).send({message:"Error Delete Items Failed"})})
}


module.exports = {createItem, getItems, deleteItem}

