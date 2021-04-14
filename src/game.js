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
	//if player.jail[0] = true
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
	//variable dice 2 = dice()
	//roll currplayer.dice() === currPlayer.dice()
	//if true currPlayer.rolled Number = dice1 + dice2
	// if player is on third turn and double false subtract money
	//set currPlayer.jail = false counter to 0
	// close Jail modal
	//currPlayer.player.move()
}

function freeJail() {
	//check if they have pass
	//if true pass - 1 if = 0 then pass = false
	// change player jail status to false and 0
	// close modal
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
	checkJail();
}

export { startGame, checkJail, rollDice, move, endTurn, players, currPlayer };

// //if in jail prompt for options
// if (currPlayer.jail[0] === true) {
// 	//skip turn
// 	document.querySelector('skipturn').addEventListener('click', () => {
// 		currPlayer.jail[1] += 1;
// 	});
// 	// if they roll, check if they get double
// 	document.querySelector('roll').addEventListener('click', () => {
// 		if (currPlayer.dice() === currPlayer.dice()) {

// 			currPlayer.jail[0] = false;
// 			currPlayer.jail[1] = 0;
// 		} else {
// 			//TODO:grey out the option button
// 			currPlayer.jail[1] += 1;
// 		}
// 	});
// 	// if not enough bitcoin, grey out the option for pay Jail
// 	if (currPlayer.bitcoin < .5) {
// 		currPlayer.gameoptions.payJail = false;
// 	} else {
// 		// else addeventlistener for click to take money and  allow player to move
// 		document.querySelector('paybutton').addEventListener('click', () => {
// 			currPlayer.bitcoin - .5;
// 			currPlayer.jail[0] = false;
// 			currPlayer.jail[1] = 0;
// 		});
// 	}
// 	// if player have get out jail card addevent listener else gray out option
// 	if (currPlayer.jailOptions.usePass === true) {
// 		document.querySelector('usePassButton').addEventListener('click', () => {
// 			currPlayer.getOutJail[1] -= 1;
// 			if (currPlayer.getOutJail[1] === 0) currPlayer.getOutJail[0] = false;
// 			currPlayer.jail[0] = false;
// 			currPlayer.jail[1] = 0;
// 			currPlayer.gameOptions.move = true;
// 			currPlayer.gameOptions.buy = true;
// 		});
// 		return true;
// 	}
// 	//TODO: prompt jail option
// }
