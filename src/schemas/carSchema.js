import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    id: { type: String },
    model: { type: String },
    brand: { type: String },
    description: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }
);

const Car = mongoose.model('Car', carSchema);
export default Car;