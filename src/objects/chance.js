//properties is an OBJECT of OBJECTS
import { properties } from './tiles.js';
import { players, currPlayer, updateBitcoin } from './../game.js';
import { $, makeMoveHappen } from './../dom.js';

// all the chance cards before shuffling
let chanceCards = [];
// all the card after being shuffled
let chance = [];
class Chance {
	constructor(id) {
		this.id = id;
	}
	// every action will be different per card, modify when creating instance of Chance
	action() {}
}
//function to randomize from chanceCards
// call on load
function randomize() {
	for (let x = 0; x < 15; x++) {
		const randomIndex = Math.floor(Math.random() * chanceCards.length);
		chance.push(...chanceCards.splice(randomIndex, 1));
	}
}
let cardCounter = 0;
//call to randomly pick card when player lands on chance tile
function landOnChance() {
	if (cardCounter === 30) cardCounter = 0;
	if (cardCounter < 15) {
		const chanceCard = chance.pop();
		//TODO: should wait time be 1 second?
		let wait = currPlayer.rolledNumber * 300 + 500;
		let chanceModalContent = $('#chance-modal-content ');
		let chanceModal = $('#chance-modal');

		setTimeout(() => {
			chanceCard.action();
			chanceCards.push(chanceCard);
			cardCounter++;

			$('#chance-modal').style.display = 'flex';
			$('#manage-content').style.display = 'none';
			chanceModalContent.style.display = 'flex';
			chanceModalContent.style.background = `url(./assets/Cards/chance${chanceCard.id}.jpg) no-repeat`;
			chanceModalContent.style.backgroundSize = '100%';

			if (currPlayer.jail[0] === true) {
				makeMoveHappen('jail');
			} else if (currPlayer.position === 0) {
				makeMoveHappen('direct', 39, 40);
			} else {
				makeMoveHappen('direct', currPlayer.position - 1, currPlayer.position);
			}
			updateBitcoin();

			$('#close-chance').onclick = () => {
				chanceModal.style.display = 'none';
			};

			window.onclick = (e) => {
				if (e.target === chanceModal) {
					chanceModal.style.display = 'none';
				}
			};
		}, wait);
	}

	if (32 > cardCounter > 15) {
		const chanceCard = chance.shift();
		chanceCard.action();
		chance.push(chanceCard);
		cardCounter++;
	}
}

// Advance to Go (Collect $2)
let card1 = new Chance(1);
card1.action = () => {
	currPlayer.position = 0;
	currPlayer.bitcoin += 2;
	document.querySelector(
		'#game-status span'
	).innerText = `${currPlayer.name} received $2`;
};

// Advance to Twitter Ave???If you pass Go, collect $2
let card2 = new Chance(2);
card2.action = () => {
	if (currPlayer.position > 24) {
		currPlayer.bitcoin += 2;
		document.querySelector(
			'#game-status span'
		).innerText = `${currPlayer.name} passed go and received $2`;
	}
	currPlayer.position = 24;
};

// Advance to Weather Place ??? If you pass Go, collect $2
let card3 = new Chance(3);
card3.action = () => {
	if (currPlayer.position > 11) {
		currPlayer.bitcoin += 2;
		document.querySelector(
			'#game-status span'
		).innerText = `${currPlayer.name} passed go and received $2`;
	}
	currPlayer.position = 11;
};

// Advance hardware to nearest Tech Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.
let card4 = new Chance(4);
card4.action = () => {
	if (currPlayer.position === 36) {
		currPlayer.bitcoin += 2;
		currPlayer.position = 12;
	}
	if (currPlayer.position === 7) {
		currPlayer.position = 12;
	}
	if (currPlayer.position === 22) {
		currPlayer.position = 28;
	}

	const property = properties[currPlayer.position];

	if (property.checkOwner(currPlayer)) {
		currPlayer.bitcoin -= property.calculateRent(properties, currPlayer.rolledNumber);
		property.owner.bitcoin += property.calculateRent(properties, currPlayer.rolledNumber);
		document.querySelector('#game-status span').innerText = `${currPlayer.name} paid ${
			property.owner.name
		} ${property.calculateRent(properties, currPlayer.rolledNumber)}`;
	}
	// Prompt to buy property
};

// Advance hardware to the nearest ISP and pay owner twice the fee to which he/she is otherwise entitled. If ISP is unowned, you may buy it from the Bank.
let card5 = new Chance(5);
card5.action = () => {
	if (currPlayer.position === 7) {
		currPlayer.position = 15;
	}
	if (currPlayer.position === 22) {
		currPlayer.position = 25;
	}
	if (currPlayer.position === 36) {
		currPlayer.bitcoin += 2;
		currPlayer.position = 5;
	}
	const property = properties[currPlayer.position];
	if (property.checkOwner(currPlayer)) {
		currPlayer.bitcoin -= property.calculateRent() * 2;
		property.owner.bitcoin += property.calculateRent() * 2;
		document.querySelector('#game-status span').innerText = `${currPlayer.name} paid ${
			property.owner.name
		} ${property.calculateRent() * 2}`;
	}
	// prompt to buy ISP
};

// Bank pays you dividend of $0.5
let card6 = new Chance(6);
card6.action = () => {
	currPlayer.bitcoin += 0.5;
	document.querySelector(
		'#game-status span'
	).innerText = `${currPlayer.name} received $0.5`;
};

// Anti-virus Software???Free ransomware unlock
let card7 = new Chance(7);
card7.action = () => {
	currPlayer.getOutJail[0] = true;
	currPlayer.getOutJail[1] += 1;
	document.querySelector(
		'#game-status span'
	).innerText = `${currPlayer.name} received 1 free ransomware unlock`;
};

// Go Back 3 Spaces
let card8 = new Chance(8);
card8.action = () => {
	currPlayer.position -= 3;
};

// You???ve been hacked!???Files are locked immediately???Do not pass Go, do not collect $2
let card9 = new Chance(9);
card9.action = () => {
	currPlayer.position = 10;
	currPlayer.jail[0] = true;
};

// Make general repairs on all your property???For each server pay $0.25???For each Quantum Computer $1
let card10 = new Chance(10);
card10.action = () => {
	let amt = 0;
	for (let card in properties) {
		if (
			properties[card].owner !== null &&
			properties[card].owner.name === currPlayer.name
		) {
			if (card.server < 5) {
				amt += card.server * 0.4;
			} else {
				amt += 1.15;
			}
		}
	}
	//check for broke-ness
	currPlayer.bitcoin -= amt;
	document.querySelector(
		'#game-status span'
	).innerText = `${currPlayer.name} paid $0.25 per server and $1 per Quantum Computer`;
};

// Take a trip to Charter ISP???If you pass Go, collect $2
let card11 = new Chance(11);
card11.action = () => {
	if (currPlayer.position > 5) {
		currPlayer.bitcoin += 2;
		document.querySelector(
			'#game-status span'
		).innerText = `${currPlayer.name} passed go and received $2`;
	}
	currPlayer.position = 5;
};

// Advance hardware to Google Walk
let card12 = new Chance(12);
card12.action = () => {
	currPlayer.position = 39;
};

// Pay each player $0.5
let card13 = new Chance(13);
card13.action = () => {
	for (let player in players) {
		currPlayer.bitcoin -= 0.5;
		players[player].bitcoin += 0.5;
		document.querySelector(
			'#game-status span'
		).innerText = `${currPlayer.name} paid each player $0.5`;
	}
};

//Collect $1.5
let card14 = new Chance(14);
card14.action = () => {
	currPlayer.bitcoin += 1.5;
	document.querySelector(
		'#game-status span'
	).innerText = `${currPlayer.name} received $1.5`;
};

chanceCards.push(
	card1,
	card2,
	card3,
	card4,
	card5,
	card6,
	card7,
	card8,
	card9,
	card10,
	card11,
	card12,
	card13,
	card14
	//card15,
	//card16
);

randomize();

export { chance, landOnChance };
