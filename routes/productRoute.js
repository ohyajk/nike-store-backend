import { Router } from 'express';
const router = Router();
import { createProduct, getAllProducts, getProductById } from '../controllers/productController.js';

// Create a new product
router.post('/product/new', createProduct);

// Get all products
router.get('/products', getAllProducts);

// Get a single product by ID
router.get('/product/:id', getProductById);

export default router;
