//Characeter is a CLASS
import { Character } from './objects/players.js';

import { startOutput as nameList } from './dom.js';

// pass this to almost all functions, destructure what you need

let players = [];
let index = 0;
let currPlayer = players[index];

// takes an ARRAY to make the players
function createPlayers(playerNames) {
	for (let name of playerNames) {
		players.push(new Character(name));
	}
}

function startGame() {
	if (nameList.length === 1) return false;
	createPlayers(nameList.slice(1));
	currPlayer = players[index];
	console.log('Game Started');
}
function checkJail() {
	if (currPlayer.jail[1] === 3) {
		currPlayer.jail[0] = false;
		currPlayer.jail[1] = 0;
		return false;
	}
	//if in jail prompt for options
	if (currPlayer.jail[0] === true) {
		//skip turn
		document.querySelector('skipturn').addEventListener('click', () => {
			currPlayer.jail[1] += 1;
		});
		// if they roll, check if they get double
		document.querySelector('roll').addEventListener('click', () => {
			if (currPlayer.dice() === currPlayer.dice()) {
				currPlayer.gameOptions.move = true;
				currPlayer.gameOptions.buy = true;
				currPlayer.jail[0] = false;
				currPlayer.jail[1] = 0;
			} else {
				//TODO:grey out the option button
				currPlayer.jail[1] += 1;
			}
		});
		// if not enough bitcoin, grey out the option for pay Jail
		if (currPlayer.bitcoin < 2) {
			currPlayer.gameoptions.payJail = false;
		} else {
			// else addeventlistener for click to take money and  allow player to move
			document.querySelector('paybutton').addEventListener('click', () => {
				currPlayer.bitcoin - 2;
				currPlayer.gameOptions.move = true;
				currPlayer.gameOptions.buy = true;
				currPlayer.jail[0] = false;
				currPlayer.jail[1] = 0;
			});
		}
		// if player have get out jail card addevent listener else gray out option
		if (currPlayer.jailOptions.usePass === true) {
			document.querySelector('usePassButton').addEventListener('click', () => {
				currPlayer.getOutJail[1] -= 1;
				if (currPlayer.getOutJail[1] === 0) currPlayer.getOutJail[0] = false;
				currPlayer.jail[0] = false;
				currPlayer.jail[1] = 0;
				currPlayer.gameOptions.move = true;
				currPlayer.gameOptions.buy = true;
			});
			return true;
		}
		//TODO: prompt jail option
	}
	return false;
}

function rollDice() {
	currPlayer.rollDice();
}

function move() {
	currPlayer.movePlayer();
}

function endTurn() {
	const option = currPlayer.gameoptions;
	option.improve = true;
	option.trade = true;
	option.mortgage = true;
	option.move = false;
	option.buy = false;
	index++;
}

export { startGame, checkJail, rollDice, move, endTurn, players, currPlayer };

// function turn() {
// 	console.log(`You are player ${index + 1} ${currPlayer.name}`);

// 	//TODO: prompt to click roll dice???????
// 	rollDice();
// 	// pass this to almost all functions, destructure what you need
// 	const allGameObjects = {
// 		currPlayer,
// 		players,
// 		rolledNumber,
// 	};
// 	console.log(allGameObjects);
// 	if (!currPlayer.inJail()) {
// 		//TODO: MOVE and ANIMATE token to position
// 		currPlayer.movePlayer(allGameObjects);
// 	}

// 	if (index < nameList[0]) {
// 		index++;
// 	} else {
// 		index = 0;
// 	}
// 	// turn();
// }
