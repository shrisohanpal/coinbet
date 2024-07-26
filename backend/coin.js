// 10 seconds tk paise lagao
// 10 second tk coin ghumega
// 10 second tak coin rukega aur next round ka intezaar karega

const toss = () => {
  console.log("Points lagao moment has started!");
  setTimeout(() => {
    console.log("Ab coin ghum raha hai!");
    setTimeout(() => {
      console.log(
        "Ab result dikh raha hai aur next round ka wait kar rahe hai!"
      );
    }, 10000);
  }, 10000);

  // const randomVal = Math.random();
  //const faceCoin = randomVal < 0.5 ? 'H' : 'T';
  // console.log(faceCoin==='H' ? 'Heads' : 'Tails');
};

export default toss;
