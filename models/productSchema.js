import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['men', 'women', 'kids'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
