import express from 'express';
import { getUserById, createUser, updateUser, deleteUser, login } from '../controllers/userController.js';
import { auth } from '../auth.js';

const router = express.Router();

// Get a user by ID
router.get('/user/:userId', auth, getUserById);

// Create a new user
router.post('/user/new', createUser);

// Update a user
router.put('/user/:userId', updateUser);

// Delete a user
router.delete('/user/:userId', deleteUser);

// Login a user
router.post('/login', login);

export default router;
