

const toss = () => {
    const randomVal = Math.random(); 
	const faceCoin = randomVal < 0.5 ? 'H' : 'T';
    console.log(faceCoin==='H' ? 'Heads' : 'Tails');
}



export default toss;