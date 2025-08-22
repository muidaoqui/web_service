import mongoose from 'mongoose';
import * as z from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(6).max(100)
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
