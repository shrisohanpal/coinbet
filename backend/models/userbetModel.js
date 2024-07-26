import mongoose from 'mongoose';

const userbetSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    result: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Userbet = mongoose.model('Userbet', userbetSchema);

export default Userbet;
