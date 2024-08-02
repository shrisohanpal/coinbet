import asyncHandler from "../middleware/asyncHandler.js";
import Coinbet from "../models/coinbetModel.js";

const addCoinbet = asyncHandler(async (headAmt, tailAmt, result) => {
  //console.log(headAmt, tailAmt, result);
  const coinbet = await Coinbet.create({
    headAmt,
    tailAmt,
    result,
    profit: result === "HEAD" ? tailAmt - headAmt : headAmt - tailAmt,
  });
  if (coinbet) {
    // coinbet added successfull
    // fetch data of last 60 coinnbets and update in socketio
  } else {
    res.status(400);
    throw new Error("Invalid coinbet data");
  }
});

const updateHistory = asyncHandler(async (history) => {
  const coinbets = await Coinbet.find({}).sort({_id:-1}).limit(60);

  for (let i = 0; i < 60; i++) {
    history[i] = coinbets[i]?.result;
  }
});

export { addCoinbet, updateHistory };
