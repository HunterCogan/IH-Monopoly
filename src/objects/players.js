import { updateBitcoin } from '../game.js';
import { landOnChance } from './chance.js';
// community is an ARRAY of OBJECTS
// landOnCommunity RETURNS an OBJECT of a community Card
import { landOnCommunity } from './chest.js';
import { properties } from './tiles.js';

class Character {
	constructor(name) {
		this.name = name;
		// starting amount each player gets
		this.bitcoin = 15;
		// jail status, if true, how many turns have they been in jail
		this.jail = [false, 0];
		this.position = 0;
		this.properties = [properties[1], properties[6], properties[8]];
		this.getOutJail = [false, 0];
		this.rolledNumber = 0;
		this.diceRolled = false;
	}
	rollDice() {
		this.rolledNumber = this.dice() + this.dice();
		// if dice already rolled once, set to true
		this.diceRolled = true;
		console.log(this.rolledNumber);
	}
	dice() {
		return Math.round(Math.random() * 6) + 1;
	}
	collectTax() {
		//TODO: need an action for bankrupt
		if (this.position === 4) {
			this.bitcoin <= 0.5
				? console.log(`${this.name} is BANKRUPT`)
				: (this.bitoin -= 0.5);
		} else if (this.position === 38) {
			this.bitcoin <= 1.5
				? console.log(`${this.name} is BANKRUPT`)
				: (this.bitoin -= 1.5);
		}
	}

	//Moves the player
	movePlayer() {
		// const { rolledNumber } = allGameObjects;
		if (this.position + this.rolledNumber >= 40) {
			this.position = this.rolledNumber + this.position - 40;
			this.bitcoin += 2;
		} else {
			this.position += this.rolledNumber;
		}

		// TODO:if pass go collect
		// check the position and its options
		this.checkPosition();
	}

	// what tile did player land on and what will happen
	checkPosition() {
		if (this.position === 0) {
			console.log("you're at go");
			return false;
		} else if (this.position === 4 || this.position === 38) {
			this.collectTax();
		} else if (this.position === 7 || this.position === 22 || this.position === 36) {
			//TODO: animation/action for chance?
			landOnChance();
			updateBitcoin();
		} else if (this.position === 2 || this.position === 17 || this.position === 33) {
			//TODO: animation?
			landOnCommunity();
			updateBitcoin();
		} else if (this.position === 10 || this.position === 20) {
			return false;
		} else if (this.position === 30) {
			this.position = 10;
			this.jail[0] = true;
		} else {
			console.log(this);
			console.log(
				`${this.name} what do you want to do with ${properties[this.position].name}`
			);
			//TODO: prompt for property option
		}
	}
}

export { Character };
