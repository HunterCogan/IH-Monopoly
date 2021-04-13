// import {testVariable} from "./dom.js";

// const game = (str) => {
//     testVariable.push(`${str}`);
//     console.log(testVariable[0])

// };

function dice1() {
	return Math.round(Math.random() * 6);
}

function dice2() {
	return Math.round(Math.random() * 6);
}

function diceRoll() {
	return dice1() + dice2();
}
export { diceRoll };
