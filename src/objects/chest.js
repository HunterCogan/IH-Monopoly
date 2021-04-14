//properties is an OBJECT of OBJECTS
import { properties } from './tiles.js';

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
function landOnCommunity(allGameObjects) {
	if (cardCounter === 32) cardCounter = 0;
	if (cardCounter < 16) {
		const communityCard = community.pop();
		communityCard.action(allGameObjects);
		communityCards.push(communityCard);
		cardCounter++;
	}
	if (32 > cardCounter > 15) {
		const communityCard = community.shift();
		communityCard.action(allGameObjects);
		community.push(communityCard);
		cardCounter++;
	}
}

// Advance to Go (Collect $2)
let card1 = new Community(1);
card1.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.position = 0;
	currPlayer.bitcoin += 2;
};

// Collect $2
let card2 = new Community(2);
card2.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.bitcoin += 2;
};

// Pay $0.5
let card3 = new Community(3);
card3.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.bitcoin -= 0.5;
};

// From sale of stock you get $0.5
let card4 = new Community(4);
card4.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.bitcoin += 0.5;
};

// Anti-virus Software–Free ransomware unlock
let card5 = new Community(5);
card5.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.getOutJail[0] = true;
	currPlayer.getOutJail[1] += 1;
};

// You’ve been hacked!–Files are locked immediately–Do not pass Go, do not collect $2
let card6 = new Community(6);
card6.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.jail[0] = true;
	currPlayer.position = 10;
};

// Collect $.5 from every player
let card7 = new Community(7);
card7.action = (allGameObjects) => {
	const { currPlayer, players } = allGameObjects;
	for (let player in players) {
		players[player].bitcoin -= 0.5;
		//have a function to check for broke-ness added to player
		currPlayer.bitcoin += 0.5;
	}
};

// Receive $1
let card8 = new Community(8);
card8.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.bitcoin += 1;
};

// Receive $0.2
let card9 = new Community(9);
card9.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.bitcoin += 0.2;
};

// Receive $0.1
let card10 = new Community(10);
card10.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.bitcoin += 0.1;
};

// Receive $1
let card11 = new Community(11);
card11.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.bitcoin += 1;
};

// Pay $1
let card12 = new Community(12);
card12.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.bitcoin -= 1;
};

// Pay $1.5
let card13 = new Community(13);
card13.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.bitcoin -= 1.5;
};

// Receive $0.25
let card14 = new Community(14);
card14.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	currPlayer.bitcoin += 0.25;
};
let card15 = new Community(15);
card15.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;

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
	//TODO:check for broke-ness
	currPlayer.bitcoin -= amt;
};

let card16 = new Community(16);
card16.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
	//FIXME: cannot read property "bitcoin" of undefined
	currPlayer.bitcoin += 0.1;
};
let card17 = new Community(17);
card17.action = (allGameObjects) => {
	const { currPlayer } = allGameObjects;
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
