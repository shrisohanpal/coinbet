import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';


var result = "Dks";
var status = "game start ho raha hai";

// 10 seconds tk bet lagao
// 10 second tk coin ghumega
// 10 second tak coin rukega aur next round ka intezaar karega
const toss = () => {
  status = "Points lagao moment has started!";
  const randomVal = Math.random();
  const faceCoin = randomVal < 0.5 ? 'HEAD' : 'TAIL';
  setTimeout(() => {
    status = "Ab coin ghum raha hai!";
    setTimeout(() => {
      status = "Ab result dikh raha hai aur next round ka wait kar rahe hai!";
      result = faceCoin;
    }, 2000);
  }, 2000);
};


// @desc    Get coin status
// @route   GET /api/coinstatus
// @access  Public
const getCoinStatus = asyncHandler(async (req, res) => {
  res.json({
     result,
     status
  });
});

export {
  toss,
  getCoinStatus
};
