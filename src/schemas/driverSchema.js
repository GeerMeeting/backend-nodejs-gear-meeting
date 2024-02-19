import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    description: { type: String },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  },
  {
    versionKey: false
  }
);

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;