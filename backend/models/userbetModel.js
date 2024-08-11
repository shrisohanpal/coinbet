import mongoose from "mongoose";

const userbetSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    side: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Userbet = mongoose.model("Userbet", userbetSchema);

export default Userbet;
