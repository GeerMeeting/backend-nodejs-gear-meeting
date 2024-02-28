import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    nameImage: { type: String },
    dataImage: { type: Buffer },
    contentType: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  },
  {
    versionKey: false
  }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;