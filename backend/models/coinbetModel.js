import mongoose from "mongoose";

const coinbetSchema = mongoose.Schema(
  {
    headAmt: {
      type: Number,
      required: true,
    },
    tailAmt: {
      type: Number,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coinbet = mongoose.model("Coinbet", coinbetSchema);

export default Coinbet;
 