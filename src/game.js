//Characeter is a CLASS
import { Character } from './objects/players.js';
//properties is an OBJECT of OBJECTS
import { properties } from './objects/tiles.js';
//chance is an ARRAY of OBJECTS
//landOnChance RETURNS an OBJECT of a chance Card
import { chance, landOnChance } from './objects/chance.js';

// community is an ARRAY of OBJECTS
// landOnCommunity RETURNS an OBJECT of a community Card
import { community, landOnCommunity } from './objects/chest.js';

// pass this to almost all functions, destructure what you need

//TODO: need to import array of players from DOM

// returns a number of dice roll
function dice1() {
	return Math.round(Math.random() * 6);
}
function dice2() {
	return Math.round(Math.random() * 6);
}
function diceRoll() {
	return dice1() + dice2();
}

// takes an ARRAY to make the players
let players = [];
let index = 0;
let currPlayer = players[index];
function createPlayers(playerNames) {
	for (let name of playerNames) {
		players.push(new Character(name));
	}
}

function startGame() {
	//TODO:TESTING REMOVE BEFORE DEPLOYING
	createPlayers(['Dicky', 'Johnny', 'Hunter', 'Juan']);
}
//TODO:TESTING REMOVE BEFORE DEPLOYING
const allGameObjects = {
	currPlayer,
	players,
	properties,
	chance,
	community,
	diceRoll,
};
const currentProperty = properties[1];
currentProperty.owner = currPlayer;

export { startGame };
