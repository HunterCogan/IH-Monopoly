let chanceCards = [];

let randomized = [];

//function to randomize from chanceCards
// call on load
class Chance {
	constructor(description) {
		this.description = description;
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

//call to randomly pick card when player lands on chance tile
function landOnChance(currPlayer) {
	const chanceCard = randomized.pop();
	chanceCard.action(currPlayer);
}
let card1 = new Chance('Advance to Go\nCollect \u20BF 2 ');
card1.action = (currPlayer) => {
	currPlayer.position = 0;
	currPlayer.bitcoin += 2;
};
let card2 = new Chance('Advance to Weather Place\nIf you pass Go, collect \u20BF 20 ');
card2.action = (currPlayer) => {
	if (currPlayer.position > 11) {
		currPlayer.bitcoin += 2;
	}
	currPlayer.position = 0;
};
let card3 = new Chance(
	'Advance to nearest Tech Utility\nIf unowned, you may buy it from the Bank. If owned, roll dice and pay owner ten times the dice roll'
);

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
	card15
);
randomize();
export { randomized, landOnChance };
