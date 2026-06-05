import express from 'express';
import {
  createBatch,
  getAllBatches,
  getBatchByIdOrCode,
  updateBatchStatus,
  createSubscription,
  getAllSubscriptions,
  updateSubscriptionStatus
} from '../controllers/mushroomController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// PUBLIC TRACEABILITY ENDPOINT (No login required so customers can scan QR codes!)
router.get('/batches/:idOrCode', getBatchByIdOrCode);

// ==========================================
// PROTECTED ROUTES (Requires Login)
// ==========================================
router.use(protect);

// Cultivation Batch routes (Admins & Executives only)
router.route('/batches')
  .get(authorizeRoles('admin', 'executive'), getAllBatches)
  .post(authorizeRoles('admin', 'executive'), createBatch);

router.patch('/batches/:id/status', authorizeRoles('admin', 'executive'), updateBatchStatus);

// Subscription routes
router.route('/subscriptions')
  .get(getAllSubscriptions)
  .post(authorizeRoles('user', 'admin'), createSubscription);

router.patch('/subscriptions/:id/status', authorizeRoles('user', 'admin'), updateSubscriptionStatus);

export default router;
