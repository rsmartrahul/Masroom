import Product from '../models/Product.js';
import { asyncHandler, AppError } from '../middlewares/errorMiddleware.js';

// @desc    Get all active products (PUBLIC)
// @route   GET /api/products
export const getAllProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = { isActive: true };
  if (category && category !== 'all') {
    filter.category = category;
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products,
  });
});

// @desc    Get single product by ID (PUBLIC)
// @route   GET /api/products/:id
export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

// @desc    Create a new product (ADMIN)
// @route   POST /api/products
export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, unit, description, features, image, stock, rating } = req.body;

  const product = await Product.create({
    name,
    category,
    price,
    unit,
    description,
    features: features || [],
    image: image || '',
    stock: stock || 'In Stock',
    rating: rating || 4.5,
  });

  res.status(201).json({
    status: 'success',
    data: product,
  });
});

// @desc    Update a product (ADMIN)
// @route   PATCH /api/products/:id
export const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

// @desc    Delete a product (soft delete) (ADMIN)
// @route   DELETE /api/products/:id
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Product deactivated successfully',
  });
});
