import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

// Post an order
export const addOrder = async (req, res) => {
    try {
        const { user, items, totalAmount, shippingAddress } = req.body;

        // Create a new order
        const order = new Order({
            user,
            items,
            totalAmount,
            shippingAddress,
        });

        // Save the order to the database
        await order.save();

        // Delete the user's cart
        await Cart.findOneAndDelete({ user });

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while creating the order' });
    }
};

// Get orders by user ID
export const getOrdersByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        const orders = await Order.find({ user: id });

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving orders' });
    }
};
