import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                size: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Shipped', 'Delivered'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;