//TODO: uncomment when isJail method is implemented
// import { dice1, dice2 } from './../games.js';
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
		this.properties = [];
		this.getOutJail = [false, 0];
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
	//in Jail options. return true if still in jail false for not in jail or no longer in jail
	inJail() {
		//TODO: check in jail, if so prompt options and do logic
		// if not in jail, return false
		//TODO: prompt for the options//click on what they want
		// if (this.jail[1] === 3) {
		// 	return;
		// }
		//rolled for a double? pay?
		// else if (dice1() === dice2()) {
		// 	this.jail[0] = false;
		// 	this.jail[1] = 0;
		// } else {
		// 	return true;
		// }

		//TODO: remove later , return false for now
		return false;
	}
	//Moves the player
	movePlayer(allGameObjects) {
		const { rolledNumber } = allGameObjects;
		this.position + rolledNumber >= 40
			? (this.position = rolledNumber + this.position - 40)
			: (this.position += rolledNumber);
		// check the position and its options
		this.checkPosition(allGameObjects);
	}

	// what tile did player land on and what will happen
	checkPosition(allGameObjects) {
		if (this.position === 0) {
			this.bitcoin += 2;
			('You got some money for passing go');
		} else if (this.position === 4 || this.position === 38) {
			this.collectTax();
		} else if (this.position === 7 || this.position === 22 || this.position === 36) {
			//TODO: animation/action for chance?
			landOnChance(allGameObjects);
		} else if (this.position === 2 || this.position === 17 || this.position === 33) {
			//TODO: animation?
			landOnCommunity(allGameObjects);
		} else if (this.position === 10 || this.position === 20) {
			//TODO: prompt for property management?
			console.log(`You can't do shit`);
		} else if (this.position === 30) {
			this.position = 10;
			this.jail[0] = true;
		} else {
			console.log(
				`${this.name} what do you want to do with ${properties[this.position].name}`
				//TODO: property[this.position].buy? build? etc
			);
		}

		//TODO: end turn
	}
}

export { Character };
