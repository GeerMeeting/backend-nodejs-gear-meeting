import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    id: { type: String },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String },
    nameImage: { type: String },
    dataImage: { type: Buffer },
    contentType: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    versionKey: false
  }
);

const Car = mongoose.model('Car', carSchema);
export default Car;