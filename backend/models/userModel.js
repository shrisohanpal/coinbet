import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    mainAmt: {
      type: Number,
      required: true,
      default: 2500,
    },
    bonusAmt: {
      type: Number,
      required: true,
      default: 1500,
    },
    winningAmt: {
      type: Number,
      required: true,
      default: 5000,
    },
    numofBets: {
      type: Number,
      required: true,
      default: 0,
    },
    refferedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;

/*
userbets, transictions, coinbets
Name
Email
Phone
MainBal
WinningBal
BonusBal
NewAccount
RefferedBy
*/
