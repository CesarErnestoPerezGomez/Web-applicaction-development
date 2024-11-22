const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

// Configuración
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Esquema y modelo para ítems
const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

// Esquema y modelo para listas personalizadas
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const List = mongoose.model("List", listSchema);

// Ítems iniciales
const defaultItems = [
  new Item({ name: "Welcome to your To-Do List!" }),
  new Item({ name: "Hit the + button to add a new item." }),
  new Item({ name: "Check the box to delete an item." }),
];

// Ruta raíz: mostrar la lista principal ("Today")
app.get("/", async function (req, res) {
  try {
    const items = await Item.find({});
    if (items.length === 0) {
      await Item.insertMany(defaultItems);
      return res.redirect("/");
    }
    res.render("list", { listTitle: "Today", newListItems: items });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading the list.");
  }
});

// Ruta dinámica: mostrar listas personalizadas
app.get("/:customListName", async function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  try {
    let list = await List.findOne({ name: customListName });
    if (!list) {
      list = new List({
        name: customListName,
        items: defaultItems,
      });
      await list.save();
      return res.redirect("/" + customListName);
    }
    res.render("list", { listTitle: list.name, newListItems: list.items });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading the custom list.");
  }
});

// Ruta para agregar un nuevo ítem
app.post("/", async function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({ name: itemName });

  try {
    if (listName === "Today") {
      await item.save();
      res.redirect("/");
    } else {
      const list = await List.findOne({ name: listName });
      list.items.push(item);
      await list.save();
      res.redirect("/" + listName);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding the item.");
  }
});

// Ruta para eliminar un ítem
app.post("/delete", async function (req, res) {
  const checkedItemId = req.body.checkbox; // ID del ítem a eliminar
  const listName = req.body.listName;     // Nombre de la lista

  try {
    if (listName === "Today") {
      await Item.findByIdAndRemove(checkedItemId);
      res.redirect("/");
    } else {
      await List.findOneAndUpdate(
        { name: listName },
        { $pull: { items: { _id: checkedItemId } } }
      );
      res.redirect("/" + listName);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while deleting the item.");
  }
});

// Iniciar el servidor
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
