import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { uploadProductImage } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// PUBLIC routes — no auth required so the storefront can fetch products
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// ADMIN routes — for now no auth middleware so admin panel works without login
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// IMAGE UPLOAD — upload a product image, returns the URL
router.post('/upload/image', uploadProductImage.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'fail', message: 'No image file provided' });
  }

  // Build the public URL for the uploaded file
  const imageUrl = `/uploads/products/${req.file.filename}`;

  res.status(200).json({
    status: 'success',
    data: {
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
    },
  });
});

export default router;
