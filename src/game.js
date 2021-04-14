//Characeter is a CLASS
import { Character } from './objects/players.js';

import { startOutput as nameList } from './dom.js';

// pass this to almost all functions, destructure what you need

let players = [];
let index = 0;
let currPlayer = players[index];
let rolledNumber;
// takes an ARRAY to make the players
function createPlayers(playerNames) {
	for (let name of playerNames) {
		players.push(new Character(name));
	}
}
// returns a number of dice roll
function dice1() {
	return Math.round(Math.random() * 6);
}
function dice2() {
	return Math.round(Math.random() * 6);
}
function rollDice() {
	rolledNumber = dice1() + dice2();
}

function startGame() {
	createPlayers(nameList.slice(1));
	console.log('Game Started');
	turn();
}

function turn() {
	currPlayer = players[index];
	console.log(`You are player ${index + 1} ${currPlayer.name}`);

	//TODO: prompt to click roll dice???????
	rollDice();
	// pass this to almost all functions, destructure what you need
	const allGameObjects = {
		currPlayer,
		players,
		rolledNumber,
	};
	console.log(allGameObjects);
	if (!currPlayer.inJail()) {
		//TODO: MOVE and ANIMATE token to position
		currPlayer.movePlayer(allGameObjects);
	}

	if (index < nameList[0]) {
		index++;
	} else {
		index = 0;
	}
	// turn();
}

export { startGame, dice1, dice2 };
