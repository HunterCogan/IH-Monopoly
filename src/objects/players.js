import { currPlayer, updateBitcoin } from '../game.js';
import { landOnChance } from './chance.js';
// community is an ARRAY of OBJECTS
// landOnCommunity RETURNS an OBJECT of a community Card
import { landOnCommunity } from './chest.js';
import { properties } from './tiles.js';
import { makeMoveHappen } from '../dom.js';

class Character {
	constructor(name, playerNum) {
		this.name = name;
		// starting amount each player gets
		this.bitcoin = 15;
		// jail status, if true, how many turns have they been in jail
		this.jail = [false, 0];
		this.position = 0;
		this.properties = [];
		this.getOutJail = [false, 0];
		this.rolledNumber = 0;
		this.diceRolled = false;
		this.rolledDouble = false;
		this.doubleCount = 0;
		this.playerNum = playerNum;
	}
	rollDice() {
		//chance debugging
		// this.rolledNumber = 7;
		//let dice1 = 1;
		//let dice2 = 1;

		//normal
		let dice1 = 1;
		let dice2 = 1;
		this.rolledNumber = dice1 + dice2;

		const firstDiceImg = './../../assets/dice' + dice1 + '.png';

		document.querySelector('#dice1').style.display = 'flex';
		document.querySelector('#dice1').setAttribute('src', firstDiceImg);

		const secondDiceImg = './../../assets/dice' + dice2 + '.png';

		document.querySelector('#dice2').style.display = 'flex';
		document.querySelector('#dice2').setAttribute('src', secondDiceImg);

		if (dice1 !== dice2) {
			this.rolledDouble = false;
			this.diceRolled = true;
			makeMoveHappen();
			this.movePlayer();
			document.querySelector(
				'#game-status span'
			).innerText = `${currPlayer.name}'s turn`;
		}
		if (dice1 === dice2) {
			this.rolledDouble = true;
			this.doubleCount++;
			if (this.doubleCount === 3) {
				this.goToJail();
			} else {
				this.diceRolled = false;
				makeMoveHappen();
				this.movePlayer();
				document.querySelector(
					'#game-status span'
				).innerText = `${currPlayer.name} rolled a double. Roll Again!`;
			}
		}
	}

	dice() {
		return Math.round(Math.random() * 5) + 1;
	}
	collectTax() {
		//need an action for bankrupt
		if (this.position === 4) {
			if (this.bitcoin <= 2) {
				console.log(`${this.name} is BANKRUPT`);
			} else {
				this.bitcoin -= 2;

				updateBitcoin();
			}
		} else if (this.position === 38) {
			if (this.bitcoin <= .75) {
				console.log(`${this.name} is BANKRUPT`);
			} else {
				this.bitcoin -= .75;
				updateBitcoin();
			}
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

	goToJail() {
		let wait = currPlayer.rolledNumber * 300 + 500;

		setTimeout(() => {
			document.querySelector('#game-status span').innerText = `${currPlayer.name}, your files have been hacked!`;
			document.querySelector('#roll-dice').style.backgroundColor = '#8d9491';
			document.querySelector('#roll-dice').classList.add('no-click');

			document.querySelector('#end-turn').style.backgroundColor = '#8b1641';
			document.querySelector('#end-turn').style.color = '#d49fa3';
			document.querySelector('#end-turn').classList.remove('no-click');

			makeMoveHappen('jail');
			this.position = 10;
			this.jail = [true, 0];
			this.diceRolled = true;
			console.log('WEEEE' + this.position);
		}, wait);
	}

	// what tile did player land on and what will happen
	checkPosition() {
		if (this.position === 0) {
			console.log("you're at go");
			return false;
		} else if (this.position === 4 || this.position === 38) {
			this.collectTax();
			//maybe add modal to say income tax was taken
		} else if (this.position === 7 || this.position === 22 || this.position === 36) {
			//TODO: animation/action for chance?
			console.log('pos 7');
			landOnChance();
			updateBitcoin();
		} else if (this.position === 2 || this.position === 17 || this.position === 33) {
			//TODO: animation?
			landOnCommunity();
			updateBitcoin();
		} else if (this.position === 10 || this.position === 20) {
			return false;
		} else if (this.position === 30) {
			this.goToJail();
		} else {
			console.log(
				`${this.name}, what do you want to do with ${properties[this.position].name}`
			);
			//TODO: prompt for property option
		}
	}
}

export { Character };
