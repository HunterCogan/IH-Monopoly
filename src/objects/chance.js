let chanceCards = [];

let randomized = [];

//function to randomize from chanceCards
// call on load
class Chance {
	constructor(id) {
		this.id = id;
	}
	// every action will be different per card, modify when creating instance of Chance
	action() {}
}

function randomize() {
	for (x = 0; x < chanceCards.length; x++) {
		const randomIndex = Math.floor(Math.random() * chanceCards.length);
		randomized.push(chanceCards.slice(randomIndex, randomIndex + 1));
	}
}

//randomly pick card
function landOnChance(currPlayer) {
	const chanceCard = randomized.pop();
	chanceCard(currPlayer);
}

// Advance to Go (Collect $2)
let card1 = new Chance('id1');
card1.action = (currPlayer) => {
	currPlayer.position = 0;
	currPlayer.bitcoin += 2;
};

// Advance to Twitter Ave—If you pass Go, collect $2
let card2 = new Chance('id2');
card2.action = (currPlayer) => {
	if (currPlayer.position > 24) {
		currPlayer.bitcoin += 2;
	}
	currPlayer.position = 24;
};

// Advance to Weather Place – If you pass Go, collect $2
let card3 = new Chance('id4')
card3.action = (currPlayer) => {
	if (currPlayer.position > 11){
		currPlayer.bitcoin += 2
	}
	currPlayer.position = 11
}

// Advance hardware to nearest Tech Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.
let card4 = new Chance('id3');
card4.action = (currPlayer, property, diceRoll) => {
	if (currPlayer.position === 36 ) {
		currPlayer.bitcoin += 2
		currPlayer.position = 12
	}
	if (currPlayer.position === 7) {
		currPlayer.position = 12
	}
	if (currPlayer.position === 22) {
		currPlayer.position = 28
	}
	const property = tiles[currPlayer.position]
	if (property.checkOwner()) {
		currPlayer.bitcoin -= property.calculateRent(tiles, diceRoll)
		property.owner.bitcoin += property.calculateRent(tiles, diceRoll)
	}
	// Prompt to buy property
}

// Advance hardware to the nearest ISP and pay owner twice the fee to which he/she is otherwise entitled. If ISP is unowned, you may buy it from the Bank.
let card5 = new Chance('id5')
card5.action = (currPlayer, tiles) => {
	if (currPlayer.position === 7) {
		currPlayer.position = 15
	}
	if (currPlayer.position === 22) {
		currPlayer.position = 25
	}
	if (currPlayer.position === 36) {
		currPlayer.bitcoin += 2
		currPlayer.position = 5
	}
	const property = tiles[currPlayer.position]
	if (property.checkOwner()) {
		currPlayer.bitcoin -= property.calculateRent(tiles, diceRoll) * 2
		property.owner.bitcoin += property.calculateRent(tiles, diceRoll) * 2
	}
	// prompt to buy ISP
}

// Bank pays you dividend of $0.5
let card6 = new Chance('id6')
card6.action = (currPlayer) => {
	currPlayer.bitcoin += .5
}

// Anti-virus Software–Free ransomware unlock
let card7 = new Chance('id7')
card7.action = (currPlayer) => {
	currPlayer.getOutJail[0] = true
	currPlayer.getOutJail[1] += 1
}

// Go Back 3 Spaces
let card8 = new Chance('id8')
card8.action = (currPlayer) => {
	currPlayer.position -= 3
}

// You’ve been hacked!–Files are locked immediately–Do not pass Go, do not collect $2
let card9 = new Chance('id9')
card9.action = (currPlayer) => {
	currPlayer.position = 10
	currPlayer.jail[0] = true
}

// Make general repairs on all your property–For each server pay $0.25–For each Quantum Computer $1
let card10 = new Chance('id10')
card10.action = (currPlayer, servers, qcomps) => {
	currPlayer.bitcoin -= servers * .25
	currPlayer.bitcoin -= qcomps
}

// Pay tax of $0.15
let card11 = new Chance('id11')
card11.action = (currPlayer) => {
	currPlayer.bitcoin -= .15
}

// Take a trip to Charter ISP–If you pass Go, collect $2
let card12 = new Chance('id12')
card12.action = (currPlayer) => {
	if (currPlayer.position > 5) {
		currPlayer.bitcoin += 2
	}
	currPlayer.position = 5
}

// Advance hardware to Google Walk
let card13 = new Chance('id13')
card13.action = (currPlayer) => {
	currPlayer.position = 39
}

// Pay each player $0.5
let card14 = new Chance('id14')
card14.action = (currPlayer, otherPlayers) => {
	currPlayer.bitcoin -= otherPlayers * .5
	otherPlayers.bitcoin += .5
}

// Collect $1
let card15 = new Chance('id15')
card15.action = (currPlayer) => {
	currPlayer.bitcoin += 1
}

// Collect $1.5
let card16 = new Chance('id16')
card16.action = (currPlayer) => {
	currPlayer.bitcoin += 1.5
}


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
	card14,
	card15,
	card16
);

export { chanceCards };
