import User from '../models/User.js';
import CartOrder from '../models/CartOrder.js';
import Enquiry from '../models/Enquiry.js';
import { AppError, asyncHandler } from '../middlewares/errorMiddleware.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

// @desc    Log a cart add event or checkout
// @route   POST /api/admin/cart-orders
// @access  Public/Auth
export const logCartOrder = asyncHandler(async (req, res, next) => {
  const { userId, userEmail, userName, productId, productName, category, price, quantity, action } = req.body;

  const cartOrder = await CartOrder.create({
    userId: userId || null,
    userEmail: userEmail || 'guest@example.com',
    userName: userName || 'Guest User',
    productId,
    productName,
    category,
    price,
    quantity,
    action: action || 'add_to_cart',
  });

  res.status(201).json({
    status: 'success',
    data: {
      cartOrder,
    },
  });
});

// @desc    Get all cart orders
// @route   GET /api/admin/cart-orders
// @access  Admin
export const getCartOrders = asyncHandler(async (req, res, next) => {
  const cartOrders = await CartOrder.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: cartOrders.length,
    data: cartOrders,
  });
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
export const getDashboardStats = asyncHandler(async (req, res, next) => {
  const totalUsers = await User.countDocuments();
  const totalEnquiries = await Enquiry.countDocuments();
  const newEnquiries = await Enquiry.countDocuments({ status: 'new' });
  const totalCartEvents = await CartOrder.countDocuments();
  const checkoutEvents = await CartOrder.countDocuments({ action: 'checkout' });

  res.status(200).json({
    status: 'success',
    data: {
      totalUsers,
      totalEnquiries,
      newEnquiries,
      totalCartEvents,
      checkoutEvents,
    },
  });
});

// @desc    Update user details (Admin only)
// @route   PATCH /api/admin/users/:id
// @access  Admin
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  // Update allowed fields
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists && emailExists._id.toString() !== user._id.toString()) {
      return next(new AppError('Email address is already in use.', 400));
    }
    user.email = req.body.email;
  }
  if (req.body.phoneNumber !== undefined) user.phoneNumber = req.body.phoneNumber;
  if (req.body.role) {
    const validRoles = ['admin', 'user', 'executive'];
    if (!validRoles.includes(req.body.role)) {
      return next(new AppError('Invalid role value provided.', 400));
    }
    user.role = req.body.role;
  }
  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();

  // Return user without password
  const updatedUser = await User.findById(user._id).select('-password');

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully.',
    data: updatedUser,
  });
});

// @desc    Delete a user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully.',
  });
});
