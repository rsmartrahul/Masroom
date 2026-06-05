import express from 'express';
import {
  getAllUsers,
  logCartOrder,
  getCartOrders,
  getDashboardStats,
  updateUser,
  deleteUser,
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/cart-orders', logCartOrder);
router.get('/cart-orders', getCartOrders);
router.get('/stats', getDashboardStats);

export default router;
