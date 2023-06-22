import Cart from '../models/cartModel.js';

// Add item to user's cart
export const addToCart = async (req, res) => {
    try {
        const cartItem = new Cart(req.body);
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        console.log(error)
        res.status(500).json({ messgae: 'An error occurred while adding item to cart.', error });
    }
};

// Get all items from user's cart
export const getCartItems = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await Cart.find({ user: id });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving cart items' });
    }
};

// Delete item from user's cart
export const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the cart item by ID and remove it
        const deletedCartItem = await Cart.findByIdAndDelete(id);

        if (!deletedCartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while deleting cart item' });
    }
};





