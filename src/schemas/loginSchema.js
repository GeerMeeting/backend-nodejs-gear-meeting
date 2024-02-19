import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema(
  {
    id: { type: String },
    email: { type: String },
    name: { type: String },
    password: { type: String },
    phone: { type: Number },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  },
  {
    versionKey: false
  }
);

const Login = mongoose.model('Login', loginSchema);
export default Login;