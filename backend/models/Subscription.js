import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer reference is required'],
    },
    mushroomStrain: {
      type: String,
      required: [true, 'Mushroom strain is required'],
      trim: true,
    },
    quantityGrams: {
      type: Number,
      required: [true, 'Quantity in grams is required'],
      min: [50, 'Minimum subscription quantity is 50g'],
    },
    frequency: {
      type: String,
      enum: ['weekly', 'biweekly', 'monthly'],
      required: [true, 'Subscription frequency is required'],
    },
    deliveryAddress: {
      type: String,
      required: [true, 'Delivery address is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Subscription price is required'],
      min: [0, 'Price cannot be negative'],
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    nextDeliveryDate: {
      type: Date,
      required: [true, 'Next delivery date is required'],
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'cancelled'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
