const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.ObjectId,
        name: String,
        price: Number,
        category: String,
        tags: [String],
        specifications: {
            weight: String,
            dimensions: {
                width: Number,
                height: Number,
                depth: Number,
            }
        }
    },
    { collection: "productInfo", versionKey: false }
);

const Products = mongoose.model("productInfo", productSchema);

module.exports = Products;