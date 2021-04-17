//properties is an OBJECT of OBJECTS
import { properties } from './tiles.js';
import { currPlayer, players } from './../game.js';
import { $, makeMoveHappen } from '../dom.js';
import { updateBitcoin } from './../game.js';

let communityCards = [];

let community = [];

class Community {
	constructor(id) {
		this.id = id;
	}
	// every action will be different per card, modify when creating instance of Chance
	action() {}
}
//function to randomize from chanceCards
// automatically called on load
function randomize() {
	for (let x = 0; x < 17; x++) {
		const randomIndex = Math.floor(Math.random() * communityCards.length);
		community.push(...communityCards.splice(randomIndex, 1));
	}
}
let cardCounter = 0;
// returns a random card from community chest
function landOnCommunity() {
	if (cardCounter === 32) cardCounter = 0;
	if (cardCounter < 16) {
		const communityCard = community.pop();

		let wait = currPlayer.rolledNumber * 300 + 500;
		let chanceModalContent = $('#chance-modal-content ');
		let chanceModal = $('#chance-modal');

		setTimeout(() => {
			communityCard.action();
			communityCards.push(communityCard);
			cardCounter++;

			$('#chance-modal').style.display = 'flex';
			$('#manage-content').style.display = 'none';
			chanceModalContent.style.display = 'flex';
			chanceModalContent.style.background = `url(./assets/Cards/comm${communityCard.id}.jpg) no-repeat`;
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
		const communityCard = community.shift();
		communityCard.action();
		community.push(communityCard);
		cardCounter++;
	}
}

// Advance to Go (Collect $2)
let card1 = new Community(1);
card1.action = () => {
	currPlayer.position = 0;
	currPlayer.bitcoin += 2;
};

// Collect $2
let card2 = new Community(2);
card2.action = () => {
	currPlayer.bitcoin += 2;
};

// Pay $0.5
let card3 = new Community(3);
card3.action = () => {
	currPlayer.bitcoin -= 0.5;
};

// From sale of stock you get $0.5
let card4 = new Community(4);
card4.action = () => {
	currPlayer.bitcoin += 0.5;
};

// Anti-virus Software–Free ransomware unlock
let card5 = new Community(5);
card5.action = () => {
	currPlayer.getOutJail[0] = true;
	currPlayer.getOutJail[1] += 1;
};

// You’ve been hacked!–Files are locked immediately–Do not pass Go, do not collect $2
let card6 = new Community(6);
card6.action = () => {
	currPlayer.jail[0] = true;
	currPlayer.position = 10;
};

// Collect $.5 from every player
let card7 = new Community(7);
card7.action = () => {
	for (let player in players) {
		players[player].bitcoin -= 0.5;
		//have a function to check for broke-ness added to player
		currPlayer.bitcoin += 0.5;
	}
};

// Receive $1
let card8 = new Community(8);
card8.action = () => {
	currPlayer.bitcoin += 1;
};

// Receive $0.2
let card9 = new Community(9);
card9.action = () => {
	currPlayer.bitcoin += 0.2;
};

// Receive $0.1
let card10 = new Community(10);
card10.action = () => {
	currPlayer.bitcoin += 0.1;
};

// Receive $1
let card11 = new Community(11);
card11.action = () => {
	currPlayer.bitcoin += 1;
};

// Pay $1
let card12 = new Community(12);
card12.action = () => {
	currPlayer.bitcoin -= 1;
};

// Pay $1.5
let card13 = new Community(13);
card13.action = () => {
	currPlayer.bitcoin -= 1.5;
};

// Receive $0.25
let card14 = new Community(14);
card14.action = () => {
	currPlayer.bitcoin += 0.25;
};

// Power outtage pay per house and per hotel
let card15 = new Community(15);
card15.action = () => {
	let amt = 0;
	for (let property in properties) {
		if (
			properties[property].owner &&
			properties[property].owner.name === currPlayer.name
		) {
			if (property.server < 5) {
				amt += property.server * 0.4;
			} else {
				amt += 1.15;
			}
		}
	}

	currPlayer.bitcoin -= amt;
};

// second prize receive .1
let card16 = new Community(16);
card16.action = () => {
	currPlayer.bitcoin += 0.1;
};

// inherit 1
let card17 = new Community(17);
card17.action = () => {
	currPlayer.bitcoin += 1;
};

communityCards.push(
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
	card14,
	card15,
	card16,
	card17
);

randomize();

export { community, landOnCommunity };
