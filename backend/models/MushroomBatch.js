import mongoose from 'mongoose';

const historyLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: {
    type: String,
    trim: true,
  },
});

const mushroomBatchSchema = new mongoose.Schema(
  {
    batchCode: {
      type: String,
      required: [true, 'Batch code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    mushroomStrain: {
      type: String,
      required: [true, 'Mushroom strain is required'],
      trim: true,
    },
    spawnRunDate: {
      type: Date,
      required: [true, 'Spawn run start date is required'],
    },
    harvestDate: {
      type: Date,
      default: null,
    },
    qualityCheckPassed: {
      type: Boolean,
      default: true,
    },
    packagingType: {
      type: String,
      enum: ['Fresh Box', 'Dry Pouch', 'Mushroom Powder Pouch', 'Bulk Carton'],
      required: [true, 'Packaging type is required'],
    },
    weightKg: {
      type: Number,
      required: [true, 'Weight in Kg is required'],
      min: [0, 'Weight cannot be negative'],
    },
    currentStatus: {
      type: String,
      enum: ['growing', 'harvested', 'packaged', 'sold', 'shipped'],
      default: 'growing',
    },
    historyLogs: [historyLogSchema],
  },
  {
    timestamps: true,
  }
);

const MushroomBatch = mongoose.model('MushroomBatch', mushroomBatchSchema);
export default MushroomBatch;
