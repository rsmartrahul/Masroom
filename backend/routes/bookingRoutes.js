import express from 'express';
import { 
  createBooking, 
  getAllBookings, 
  getBookingById, 
  assignTechnician, 
  updateBookingStatus 
} from '../controllers/bookingController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply protect middleware to all routes below
router.use(protect);

// Get all bookings (RBAC filters applied in controller)
// Create booking (Allowed for customers and admins)
router.route('/')
  .get(getAllBookings)
  .post(authorizeRoles('user', 'admin'), createBooking);

// Get single booking detail
router.route('/:id')
  .get(getBookingById);

// Assign technician (Admin only)
router.patch('/:id/assign', authorizeRoles('admin'), assignTechnician);

// Update status/reports (Technician and Admin only)
router.patch('/:id/status', authorizeRoles('executive', 'admin'), updateBookingStatus);

export default router;
