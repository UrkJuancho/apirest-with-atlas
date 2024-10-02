// import { Express } from 'express'

const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/products.model");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello User, from NodeJs connected to APIRest :D");
});

app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ messaje: error.messaje });
  }
});

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(400).json({ messaje: "Product not Found" });
    }

    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ messaje: error.messaje });
  }
});

app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productDelete = await Product.findByIdAndDelete(id);

    if (!productDelete) {
      return res.status(404).json({ messaje: "Product not Found" });
    }

    res.status(200).json({ messaje: "Delete Product" });
  } catch (error) {
    res.status(500).json({ messaje: error.messaje });
  }
});

mongoose
  .connect(
    "mongodb+srv://juanvallejo7601:bzBY4WEPqcmEW3HJ@cluster0.2e937.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Ok, connection successful");
    app.listen(3000, () => {
      console.log("Server running in localhost:3000");
    });
  })
  .catch(() => {
    console.log("Connection failed, review code (-_-)");
  });
