import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { roles } from '../config';
import { paginate, softDeletePlugin } from './plugins';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    isVerifyEmail: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
  },
  {
    timestamps: true,
    statics: {
      async isEmailTaken(email: string, excludeUserId: any) {
        const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
        return !!user;
      },
    },
    methods: {
      async isPasswordMatch(password) {
        const user = this;
        return bcrypt.compare(password, user.password);
      },
    },
  }
);

userSchema.plugin(softDeletePlugin);

userSchema.plugin(paginate);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export const UserModel = model('User', userSchema);
