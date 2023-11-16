const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    firstName: String,
    lastName: String,
    age: Number,
    courses: [String],
    address: {
      street: String,
      city: String,
      state: String,
      zip: Number
    }
  },
  { collection: "studentInfo", versionKey: false }
);

const Students = mongoose.model("studentInfo", studentSchema);

module.exports = Students;