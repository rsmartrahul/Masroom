import MushroomBatch from '../models/MushroomBatch.js';
import Subscription from '../models/Subscription.js';
import { AppError, asyncHandler } from '../middlewares/errorMiddleware.js';

// ==========================================
// MUSHROOM BATCH TRACEABILITY CONTROLLERS
// ==========================================

// @desc    Create a new mushroom cultivation batch
// @route   POST /api/mushrooms/batches
// @access  Protected (Admin / Technician)
export const createBatch = asyncHandler(async (req, res, next) => {
  const { batchCode, mushroomStrain, spawnRunDate, packagingType, weightKg } = req.body;

  // Check unique batchCode
  const existingBatch = await MushroomBatch.findOne({ batchCode });
  if (existingBatch) {
    return next(new AppError('Mushroom batch code already exists. Please choose a unique code.', 400));
  }

  // Create batch
  const newBatch = await MushroomBatch.create({
    batchCode,
    mushroomStrain,
    spawnRunDate,
    packagingType,
    weightKg,
    historyLogs: [
      {
        status: 'growing',
        updatedBy: req.user.id,
        notes: 'Spawn run initiated and batch registered in database.',
      },
    ],
  });

  res.status(201).json({
    status: 'success',
    data: {
      batch: newBatch,
    },
  });
});

// @desc    Get all mushroom batches
// @route   GET /api/mushrooms/batches
// @access  Protected (Admin / Technician)
export const getAllBatches = asyncHandler(async (req, res, next) => {
  const batches = await MushroomBatch.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: batches.length,
    data: {
      batches,
    },
  });
});

// @desc    Get a single mushroom batch details (Traceability Audit Endpoint)
// @route   GET /api/mushrooms/batches/:idOrCode
// @access  Public
export const getBatchByIdOrCode = asyncHandler(async (req, res, next) => {
  const { idOrCode } = req.params;

  // Query either by MongoDB ObjectId or human-readable batchCode
  const query = idOrCode.match(/^[0-9a-fA-F]{24}$/) 
    ? { _id: idOrCode } 
    : { batchCode: idOrCode.toUpperCase() };

  const batch = await MushroomBatch.findOne(query).populate('historyLogs.updatedBy', 'name role');

  if (!batch) {
    return next(new AppError('No mushroom harvest batch found with that reference code.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      batch,
    },
  });
});

// @desc    Update mushroom cultivation stage / status
// @route   PATCH /api/mushrooms/batches/:id/status
// @access  Protected (Admin / Technician)
export const updateBatchStatus = asyncHandler(async (req, res, next) => {
  const { status, notes, harvestDate, weightKg } = req.body;

  const batch = await MushroomBatch.findById(req.params.id);
  if (!batch) {
    return next(new AppError('No mushroom batch found with that ID.', 404));
  }

  // Update status and append tracking history log
  if (status) {
    batch.currentStatus = status;
    batch.historyLogs.push({
      status,
      updatedBy: req.user.id,
      notes: notes || `Cultivation status updated to ${status}.`,
    });
  }

  if (harvestDate) batch.harvestDate = harvestDate;
  if (weightKg) batch.weightKg = weightKg;

  await batch.save();

  res.status(200).json({
    status: 'success',
    message: 'Mushroom batch traceability history logged successfully.',
    data: {
      batch,
    },
  });
});


// ==========================================
// SUBSCRIPTION CONTROLLERS
// ==========================================

// @desc    Create a recurring mushroom delivery subscription
// @route   POST /api/mushrooms/subscriptions
// @access  Protected (Customer / Admin)
export const createSubscription = asyncHandler(async (req, res, next) => {
  const { mushroomStrain, quantityGrams, frequency, deliveryAddress, price } = req.body;

  // Calculate next delivery date (e.g. 7 days for weekly, 14 for biweekly, 30 for monthly)
  let daysToAdd = 7;
  if (frequency === 'biweekly') daysToAdd = 14;
  else if (frequency === 'monthly') daysToAdd = 30;
  
  const nextDeliveryDate = new Date();
  nextDeliveryDate.setDate(nextDeliveryDate.getDate() + daysToAdd);

  const newSubscription = await Subscription.create({
    customer: req.user.id,
    mushroomStrain,
    quantityGrams,
    frequency,
    deliveryAddress,
    price,
    nextDeliveryDate,
  });

  res.status(201).json({
    status: 'success',
    data: {
      subscription: newSubscription,
    },
  });
});

// @desc    Get subscriptions (scoped by user role)
// @route   GET /api/mushrooms/subscriptions
// @access  Protected (All Roles)
export const getAllSubscriptions = asyncHandler(async (req, res, next) => {
  let query = {};

  if (req.user.role === 'user') {
    query.customer = req.user.id;
  }
  // Admins see everything

  const subscriptions = await Subscription.find(query)
    .populate('customer', 'name email phoneNumber')
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: subscriptions.length,
    data: {
      subscriptions,
    },
  });
});

// @desc    Update subscription status (pause, cancel, or resume)
// @route   PATCH /api/mushrooms/subscriptions/:id/status
// @access  Protected (Customer / Admin)
export const updateSubscriptionStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const subscription = await Subscription.findById(req.params.id);
  if (!subscription) {
    return next(new AppError('No subscription found with that ID.', 404));
  }

  // Authorization Check: Users can only modify their own subscription
  if (req.user.role === 'user' && subscription.customer.toString() !== req.user.id) {
    return next(new AppError('You do not have access to update this subscription.', 403));
  }

  const validStatuses = ['active', 'paused', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return next(new AppError('Invalid status. Choose active, paused, or cancelled.', 400));
  }

  subscription.status = status;
  await subscription.save();

  res.status(200).json({
    status: 'success',
    message: `Subscription successfully ${status}.`,
    data: {
      subscription,
    },
  });
});
