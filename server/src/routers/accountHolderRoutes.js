const express = require('express');
const router = express.Router();
const users = require("../models/userModel")
const mongoose = require('mongoose');

//Create user

router.post("/adduser", async (req, res) => {
  try {
    console.log(req.body);
    const userData = new users({
      _id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      courses: req.body.courses,
      address: req.body.address
    });
    console.log(userData);
    const result = await userData.save();
    res.json(result);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
});

// Read user

router.get("/allusers", async (req, res) => {
  const usersData = await users.find();
  res.json(usersData);
});

//Updtae user

router.put("/updateuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const dataToBeUpdate = new users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      courses: req.body.courses,
      address: req.body.address
    });

    const updatedData = await users.findByIdAndUpdate(userId, dataToBeUpdate, {
      new: true,
    });
    console.log("updatedData : ", updatedData);

    if (!updatedData) {
      return res.status(404).json({ message: "user not found!" });
    }

    return res.json({ message: "user updated successfuly!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete user

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteuser = await users.findByIdAndRemove(userId);
    if (!deleteuser) {
      return res.status(404).json({ message: "user not found!" });
    }

    return res.json({ message: "user deleted successfuly!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;