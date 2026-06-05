import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['fresh', 'dried', 'packaging', 'solar'],
      required: [true, 'Category is required'],
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
      trim: true,
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    stock: {
      type: String,
      default: 'In Stock',
      trim: true,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
