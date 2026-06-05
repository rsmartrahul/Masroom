import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError, asyncHandler } from '../middlewares/errorMiddleware.js';

// Helper to sign JWT Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, phoneNumber } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email address is already in use.', 400));
  }

  // Prevent arbitrary registration of admins unless environment/auth conditions are met
  // For demonstration, we allow role assignment, but validate it
  const validRoles = ['admin', 'user', 'executive'];
  const userRole = role && validRoles.includes(role) ? role : 'user';

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password,
    role: userRole,
    phoneNumber,
  });

  // Generate token
  const token = signToken(newUser._id);

  // Send response
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
      },
    },
  });
});

// @desc    Login existing user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password.', 400));
  }

  // 2) Check if user exists & password is correct (explicitly select password)
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return next(new AppError('Incorrect email or password.', 401));
  }

  // 3) If everything ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
      },
    },
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Protected
export const getProfile = asyncHandler(async (req, res, next) => {
  // req.user is already set by the protect middleware
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// @desc    Update current user profile
// @route   PATCH /api/auth/profile
// @access  Protected
export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  // Update fields
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) {
    // Check if email already in use by another user
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists && emailExists._id.toString() !== user._id.toString()) {
      return next(new AppError('Email address is already in use.', 400));
    }
    user.email = req.body.email;
  }
  if (req.body.phoneNumber !== undefined) user.phoneNumber = req.body.phoneNumber;
  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
      },
    },
  });
});
