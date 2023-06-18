import express from 'express';
import { addOrder, getOrdersByUserId } from '../controllers/orderController.js';

const router = express.Router();

// Route for posting an order
router.post('/order/new', addOrder);

// Route for getting orders by user ID
router.get('/order/:id', getOrdersByUserId);

export default router;
