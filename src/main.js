import {
	startGame,
	rollDice,
	endTurn,
	managePropList,
	payJail,
	freeJail,
	rollJail,
} from './game.js';
import { properties } from './objects/tiles.js';
import { makeMoveHappen } from './dom.js';

//TODO: on PLAY button click make players
// play button
const playBtn = document.querySelector('#modalClose');
playBtn.addEventListener('click', startGame);
// roll dice
const diceBtn = document.querySelector('#roll-dice');
diceBtn.addEventListener('click', rollDice);
const manageBtn = document.querySelector('#manage-property');
manageBtn.addEventListener('click', () => {
	managePropList();
	// action for mortage button
	let mortgageBtn = document.querySelector('.m-mortgage');
	mortgageBtn.onclick = (e) => {
		console.log(e.target.id);
		const propName = e.target.id.split('-')[0];

		for (let prop in properties) {
			console.log(properties[prop].name == propName, properties[prop].name, propName);
			if (properties[prop].name == propName) {
				properties[prop].mortgageToggle();
				return;
			}
		}
	};
});

//pay to get out of jail
const payJailBtn = document.querySelector('#pay-ransom');
payJailBtn.addEventListener('click', payJail);
// roll to get out of jail
const rollJailBtn = document.querySelector('#roll-for-double');
rollJailBtn.addEventListener('click', rollJail);
// use get out of jail card
const freeJailBtn = document.querySelector('#get-out-jail');
freeJailBtn.addEventListener('click', freeJail);

const endBtn = document.querySelector('#end-turn');
endBtn.addEventListener('click', endTurn);
