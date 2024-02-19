import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    description: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }, 
  {
    versionKey: false
  }
);

const Store = mongoose.model('Store', storeSchema);
export default Store;

