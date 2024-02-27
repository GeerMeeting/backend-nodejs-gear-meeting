import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    nameImage: { type: String },
    dataImage: { type: Buffer },
    contentType: { type: String },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true}],
    createdAt: { type: Date },
    updatedAt: { type: Date }
  },
  {
    versionKey: false
  }
);

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;