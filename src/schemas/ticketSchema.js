import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
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


const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;