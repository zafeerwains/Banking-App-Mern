const express = require('express');
const router = express.Router();
const transactions=require("../models/transactionModel")
const mongoose = require('mongoose');

//Craete transactions

router.post("/addTrasactions", async (req, res) => {
    try {
      const transactionData = new transactions({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        tags: req.body.tags,
        specifications: req.body.specifications
      });
      const result = await transactionData.save();
      res.json(result);
    } catch (error) {
      console.log("error : ", error);
      res.json({ error: "something went wrong!" });
    }
  });

  //Read transactions

  router.get("/alltransactions", async (req, res) => {
    const studentsData = await transactions.find();
    res.json(studentsData);
  });

  module.exports = router;