import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

loginSchema.pre('save', async (next) => {
  const login = this;
  if (!login.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(login.password, salt);
    login.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

const Login = mongoose.model('Login', loginSchema);
export default Login;