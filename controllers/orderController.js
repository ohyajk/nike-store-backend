import Order from '../models/orderModel.js';

// Post an order
export const addOrder = async (req, res) => {
    try {
        const { user, items, totalAmount, shippingAddress } = req.body;

        const order = new Order({
            user,
            items,
            totalAmount,
            shippingAddress,
            status: 'pending',
        });

        await order.save();
        res.status(201).json(order);

    } catch (err) {
        res.status(500).json({ message: 'An error occurred while creating the order', err });
    }
};

// Get orders by user ID
export const getOrdersByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        const orders = await Order.find({ user: id }).populate('items.product');

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving orders' });
    }
};
