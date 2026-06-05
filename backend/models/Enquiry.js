import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    type: {
      type: String,
      enum: ['product', 'service', 'general'],
      required: [true, 'Enquiry type is required'],
    },
    product: {
      type: String,
      required: [true, 'Product/Service selection is required'],
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
