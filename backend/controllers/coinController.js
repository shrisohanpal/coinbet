import asyncHandler from "../middleware/asyncHandler.js";


// 10 seconds tk bet lagao
// 10 second tk coin ghumega
// 10 second tak coin rukega aur next round ka intezaar karega
const toss = (status, result) => {
  status = "Points lagao moment has started!";
  const randomVal = Math.random();
  const faceCoin = randomVal < 0.5 ? "HEAD" : "TAIL";
  setTimeout(() => {
    status = "Ab coin ghum raha hai!";
    setTimeout(() => {
      status = "Ab result dikh raha hai aur next round ka wait kar rahe hai!";
      result = faceCoin;
    }, 10000);
  }, 10000);
};



export { toss };
