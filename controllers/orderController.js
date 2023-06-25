import Order from '../models/orderModel.js';

// Post an order
export const addOrder = async (req, res) => {
    try {
        const { user, items, subTotal, tax, grandTotal, shippingAddress } = req.body;

        const order = new Order({
            user,
            items,
            subTotal,
            tax,
            grandTotal,
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

        const orders = await Order.find({ user: id });

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving orders' });
    }
};
