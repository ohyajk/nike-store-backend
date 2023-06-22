import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

// Post an order
export const addOrder = async (req, res) => {
    try {
        const { user, shippingAddress } = req.body;

        // Find the user's cart and populate the items
        const cart = await Cart.find({ user }).populate('product');
        console.log(cart)
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const items = cart.map((item) => ({
            product: item.product,
            size: item.size, // Include the size property
            quantity: item.quantity,
            price: item.product.price,
        }));

        // Calculate the total amount
        const totalAmount = items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

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
        await Cart.deleteMany({ user });

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
