import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema(
  {
    id: { type: String },
    email: { 
      type: String,
      required: true
    },
    name: { 
      type: String,
      required: true
    },
    nameImage: {
      type: String,
    },
    dataImage: {
      type: Buffer
    },
    contentType: {
      type: String
    },
    password: { 
      type: String,
      required: true
    },
    phone: { 
      type: Number,
      required: true
    },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  },
  {
    versionKey: false
  }
);

const Login = mongoose.model('Login', loginSchema);
export default Login;