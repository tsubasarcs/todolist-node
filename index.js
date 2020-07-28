const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/items", getItems);

app.get("/items/:id", getItem);

app.post("/items", createItem);

app.put("/items/:id", updateItem);

app.delete("/items/:id", deleteItem);

async function getItems(req, res) {
  const items = await prisma.item.findMany();
  return res.send(items);
}

async function getItem(req, res) {
  const item = await prisma.item.findOne({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });
  return res.send(item);
}

async function createItem(req, res) {
  const item = await prisma.item.create({
    data: { title: req.body.title },
  });
  return res.send(item);
}

async function updateItem(req, res) {
  const date = new Date();
  const item = await prisma.item
    .update({
      where: { id: parseInt(req.params.id, 10) },
      data: {
        finished: !!parseInt(req.body.finished, 10),
        updatedAt: new Date(),
      },
    })
    .catch((e) => {
      return res.send(`The id: ${req.params.id} not found!`);
    });
  return res.send(item);
}

async function deleteItem(req, res) {
  const item = await prisma.item.delete({
    where: { id: parseInt(req.params.id, 10) },
  });
  return res.send("Deleted!");
}

app.listen(port, () => console.log(`app running on port ${port}`));
