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
	console.log(players);
}
function checkJail() {
	//if player.jail[0] = true
	if (currPlayer.jail[0] === false) {
		console.log('current Player not in jail and moved');

		return false;
	}
	console.log(`${currPlayer.name} is in jail`);
	// if already on third turn subtract money .5
	//close modal
	//TODO: open jail model
}

function payJail() {
	//check if they have money
	if (currPlayer.bitcoin <= 0.5) {
		console.log("you don't have enough money");
		return false;
	}
	//subtract money from player
	currPlayer.bitcoin -= 0.5;
	//set jail false set the jail counter = 0
	currPlayer.jail[0] = false;
	currPlayer.jail[1] = 0;
	//close jail modal
	//TODO: query select to close modal
}

function rollJail() {
	//variable dice1 = dice()
	let dice1 = currPlayer.dice();
	//variable dice 2 = dice()
	let dice2 = currPlayer.dice();
	//roll currplayer.dice() === currPlayer.dice()
	if (dice1 === dice2) {
		//if true currPlayer.rolled Number = dice1 + dice2
		currPlayer.rolledNumber = dice1 + dice2;
	}
	// if player is on third turn and double false subtract money
	if (dice1 !== dice2 && currPlayer.jail[1] === 3) {
		currPlayer.bitcoin -= 0.5;
		currPlayer.rolledNumber = dice1 + dice2;
	}
	//set currPlayer.jail = false counter to 0
	currPlayer.jail = [false, 0];
	// TODO: close Jail modal
	currPlayer.movePlayer();
}

function freeJail() {
	//check if they have pass
	if (currPlayer.getOutJail[0] === false) {
		console.log("You can't do that");
	}
	//if true pass - 1 if = 0 then pass = false
	// change player jail status to false and 0
	currPlayer.getOutJail[0] = false;
	currPlayer.getOutJail[1] -= 1;
	currPlayer.jail = [false, 0];
	// TODO: close modal
}

function rollDice() {
	// if the player in jail and have they rolled before?
	if (!checkJail() && !currPlayer.diceRolled) {
		currPlayer.rollDice();
		currPlayer.movePlayer();
		console.log(currPlayer);
	}
}

function move() {
	currPlayer.movePlayer();
}

function endTurn() {
	currPlayer.diceRolled = false;
	index < nameList[0] ? index++ : (index = 0);

	currPlayer = players[index];
	console.log('turn ended');
	console.log(`next player is ${currPlayer.name}`);
}

export {
	startGame,
	checkJail,
	rollDice,
	move,
	payJail,
	rollJail,
	freeJail,
	endTurn,
	players,
	currPlayer,
};
