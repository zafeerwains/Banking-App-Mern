const express = require('express');
const router = express.Router();
const Products=require("../models/productModel")
const mongoose = require('mongoose');

//Craete Products

router.post("/addProduct", async (req, res) => {
    try {
      const productData = new Products({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        tags: req.body.tags,
        specifications: req.body.specifications
      });
      const result = await productData.save();
      res.json(result);
    } catch (error) {
      console.log("error : ", error);
      res.json({ error: "something went wrong!" });
    }
  });

  //Read Products

  router.get("/allProducts", async (req, res) => {
    const studentsData = await Products.find();
    res.json(studentsData);
  });

  // Update Products

  router.put("/updateProduct/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const dataToBeUpdate = new Products({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        tags: req.body.tags,
        specifications: req.body.specifications
      });
  
      const updatedProduct = await Students.findByIdAndUpdate(productId, dataToBeUpdate, {
        new: true,
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }
  
      return res.json({ message: "Product updated successfuly!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
//Delete product

  router.delete("/deleteProduct/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const deleteProduct = await Products.findByIdAndRemove(productId);
      if (!deleteProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }
  
      return res.json({ message: "Product deleted successfuly!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;