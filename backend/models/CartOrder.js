import mongoose from 'mongoose';

const cartOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false, // Make it optional for guest users, though we'll try to track authenticated users
    },
    userEmail: {
      type: String,
      required: false,
    },
    userName: {
      type: String,
      required: false,
    },
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    action: {
      type: String,
      enum: ['add_to_cart', 'checkout'],
      default: 'add_to_cart',
    },
  },
  {
    timestamps: true,
  }
);

const CartOrder = mongoose.model('CartOrder', cartOrderSchema);
export default CartOrder;
