const express = require('express');
const router = express.Router();
const Products=require("../models/productModel")
const mongoose = require('mongoose');

//Craete Products

router.post("/addTrasactions", async (req, res) => {
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

  module.exports = router;