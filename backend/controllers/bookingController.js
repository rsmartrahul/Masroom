import ServiceBooking from '../models/ServiceBooking.js';
import User from '../models/User.js';
import { AppError, asyncHandler } from '../middlewares/errorMiddleware.js';

// @desc    Create a new solar cleaning booking
// @route   POST /api/bookings
// @access  Protected (Admin / Customer)
export const createBooking = asyncHandler(async (req, res, next) => {
  const { solarCapacity, address, scheduleDate, notes, price } = req.body;

  // Create booking
  const newBooking = await ServiceBooking.create({
    customer: req.user.id,
    solarCapacity,
    address,
    scheduleDate,
    notes,
    price: price || (solarCapacity * 80), // default mock calculation
  });

  res.status(201).json({
    status: 'success',
    data: {
      booking: newBooking,
    },
  });
});

// @desc    Get all bookings (scoped by user role)
// @route   GET /api/bookings
// @access  Protected (All Roles)
export const getAllBookings = asyncHandler(async (req, res, next) => {
  let query = {};

  // RBAC Scoping
  if (req.user.role === 'user') {
    query.customer = req.user.id;
  } else if (req.user.role === 'executive') {
    query.assignedTechnician = req.user.id;
  }
  // Admins see everything (empty query)

  const bookings = await ServiceBooking.find(query)
    .populate('customer', 'name email phoneNumber')
    .populate('assignedTechnician', 'name email phoneNumber')
    .sort({ scheduleDate: 1 });

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

// @desc    Get service booking by ID
// @route   GET /api/bookings/:id
// @access  Protected (All Roles)
export const getBookingById = asyncHandler(async (req, res, next) => {
  const booking = await ServiceBooking.findById(req.params.id)
    .populate('customer', 'name email phoneNumber')
    .populate('assignedTechnician', 'name email phoneNumber');

  if (!booking) {
    return next(new AppError('No service booking found with that ID.', 404));
  }

  // Authorization Check: Check if user has permission to view this booking
  if (req.user.role === 'user' && booking.customer._id.toString() !== req.user.id) {
    return next(new AppError('You do not have access to view this booking.', 403));
  }
  if (req.user.role === 'executive' && booking.assignedTechnician?._id.toString() !== req.user.id) {
    return next(new AppError('You do not have access to view this booking.', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

// @desc    Assign a technician to a service booking
// @route   PATCH /api/bookings/:id/assign
// @access  Protected (Admin Only)
export const assignTechnician = asyncHandler(async (req, res, next) => {
  const { technicianId } = req.body;

  // 1) Find the booking
  const booking = await ServiceBooking.findById(req.params.id);
  if (!booking) {
    return next(new AppError('No service booking found with that ID.', 404));
  }

  // 2) Validate technicianId is a valid user and has 'executive' role
  const technician = await User.findById(technicianId);
  if (!technician || technician.role !== 'executive') {
    return next(new AppError('Assigned user must be a registered executive.', 400));
  }

  // 3) Update booking
  booking.assignedTechnician = technicianId;
  booking.status = 'assigned';
  await booking.save();

  res.status(200).json({
    status: 'success',
    message: `Booking successfully assigned to technician ${technician.name}`,
    data: {
      booking,
    },
  });
});

// @desc    Update service booking progress/status (including image upload mocks)
// @route   PATCH /api/bookings/:id/status
// @access  Protected (Admin / Technician)
export const updateBookingStatus = asyncHandler(async (req, res, next) => {
  const { status, beforeImage, afterImage, notes } = req.body;

  const booking = await ServiceBooking.findById(req.params.id);
  if (!booking) {
    return next(new AppError('No service booking found with that ID.', 404));
  }

  // Authorization Check: Executives can only update bookings assigned to them
  if (req.user.role === 'executive' && booking.assignedTechnician?.toString() !== req.user.id) {
    return next(new AppError('You cannot update a booking that is not assigned to you.', 403));
  }

  // Update allowed fields
  if (status) {
    const validStatuses = ['pending', 'assigned', 'completed'];
    if (!validStatuses.includes(status)) {
      return next(new AppError('Invalid status value provided.', 400));
    }
    booking.status = status;
  }
  
  if (beforeImage) booking.beforeImage = beforeImage;
  if (afterImage) booking.afterImage = afterImage;
  if (notes) booking.notes = notes;

  await booking.save();

  res.status(200).json({
    status: 'success',
    message: 'Booking status updated successfully.',
    data: {
      booking,
    },
  });
});
