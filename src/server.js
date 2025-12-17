const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: "Remera", price: 5000, stock: 10 },
  { id: 2, name: "Zapatillas", price: 25000, stock: 5 },
  { id: 3, name: "Gorra", price: 3000, stock: 20 }
];

app.get("/", (req, res) => {
  res.send("Backend del mini e-commerce funcionando");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

