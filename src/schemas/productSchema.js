import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }, 
  {
    versionKey: false
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;