import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    size: {
        type: Number,
        required: true,
        min: 5,
        max: 11,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 4,
        default: 1,
    },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
