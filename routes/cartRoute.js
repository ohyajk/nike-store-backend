// Import necessary modules
import express from 'express';
import { addToCart, getCartItems, deleteCartItem } from '../controllers/cartController.js';
import { auth } from '../auth.js';

// Create an instance of the Express router
const router = express.Router();

// Add item
router.post('/cart/new', auth, addToCart);
// Get Items
router.get('/cart/:id', auth, getCartItems);
// Delete item
router.delete('/cart/:id', auth, deleteCartItem);

// Export the router
export default router;
