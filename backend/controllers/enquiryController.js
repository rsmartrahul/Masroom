import Enquiry from '../models/Enquiry.js';
import { AppError, asyncHandler } from '../middlewares/errorMiddleware.js';

// @desc    Create a new enquiry
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = asyncHandler(async (req, res, next) => {
  const { name, mobile, email, type, product, quantity, message } = req.body;

  const enquiry = await Enquiry.create({
    name,
    mobile,
    email,
    type,
    product,
    quantity,
    message,
  });

  res.status(201).json({
    status: 'success',
    data: {
      enquiry,
    },
  });
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Admin
export const getAllEnquiries = asyncHandler(async (req, res, next) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: enquiries.length,
    data: enquiries,
  });
});

// @desc    Update enquiry status
// @route   PATCH /api/enquiries/:id
// @access  Admin
export const updateEnquiryStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!['new', 'contacted', 'resolved'].includes(status)) {
    return next(new AppError('Invalid status', 400));
  }

  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!enquiry) {
    return next(new AppError('Enquiry not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      enquiry,
    },
  });
});

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Admin
export const deleteEnquiry = asyncHandler(async (req, res, next) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

  if (!enquiry) {
    return next(new AppError('Enquiry not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Enquiry deleted successfully',
  });
});
