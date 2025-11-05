import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false, 
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.index({ provider: 1, providerId: 1 }, { unique: true });

const User = mongoose.model('User', UserSchema);

export default User;