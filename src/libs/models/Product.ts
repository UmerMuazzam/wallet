import mongoose, { models } from "mongoose";

const productSchema= new mongoose.Schema({
    imgSrc: {
        requried: true,
        type: String,
    },
    fileKey: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
})


const Product= models.Product || mongoose.model('Product',productSchema);

export default Product