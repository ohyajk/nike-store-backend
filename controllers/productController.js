import Product from '../models/productSchema.js';

// Create a new product
export async function createProduct(req, res) {
    try {
        const product = new Product(req.body);
        console.log(product)
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while creating the product.' });
        console.log(err)
    }
}

// Get all products
export async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving the products.' });
    }
}

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving the product' });
    }
};