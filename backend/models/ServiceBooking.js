import mongoose from 'mongoose';

const serviceBookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer reference is required'],
    },
    solarCapacity: {
      type: Number,
      required: [true, 'Solar panel capacity (kW) is required'],
      min: [0.1, 'Capacity must be at least 0.1 kW'],
    },
    address: {
      type: String,
      required: [true, 'Service address is required'],
      trim: true,
    },
    scheduleDate: {
      type: Date,
      required: [true, 'Schedule date is required'],
    },
    assignedTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'completed'],
      default: 'pending',
    },
    beforeImage: {
      type: String, // URL/Path to storage
      default: null,
    },
    afterImage: {
      type: String, // URL/Path to storage
      default: null,
    },
    price: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to check if booking is delayed
serviceBookingSchema.virtual('isOverdue').get(function () {
  return this.status !== 'completed' && this.scheduleDate < new Date();
});

// Configure schemas to output virtuals on conversion
serviceBookingSchema.set('toJSON', { virtuals: true });
serviceBookingSchema.set('toObject', { virtuals: true });

const ServiceBooking = mongoose.model('ServiceBooking', serviceBookingSchema);
export default ServiceBooking;
