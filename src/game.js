//Characeter is a CLASS
import { Character } from './objects/players.js';
import { properties } from './objects/tiles.js';

import { makeMoveHappen, handleServerBuy, startOutput as nameList } from './dom.js';

// pass this to almost all functions, destructure what you need

let players = [];
let index = 0;
let currPlayer = players[index];
const manageModal = document.querySelector('#manage-modal');
const manageContent = document.querySelector('#manage-content');
const jailModal = document.querySelector('#jail-modal');
const rollEnd = document.querySelector('#end-turn');
let diceBtn = document.querySelector('#roll-dice');
let messageDisplay = document.querySelector('#game-status span');

// takes an ARRAY to make the players
function afterJailOption() {
	diceBtn.style.backgroundColor = '#8d9491';
	diceBtn.classList.add('no-click');
	rollEnd.style.backgroundColor = '#8b1641';
	rollEnd.style.color = '#d49fa3';
	rollEnd.classList.remove('no-click');
	currPlayer.diceRolled = true;
}
function closeJailModal() {
	manageModal.style.display = 'none';
	manageContent.style.display = 'flex';
	jailModal.style.display = 'none';
}

function createPlayers(playerNames) {
	for (let x = 1; x < playerNames.length + 1; x++) {
		players.push(new Character(playerNames[x - 1], x));
	}
}

function startGame() {
	if (nameList.length === 1) return false;
	createPlayers(nameList.slice(1));
	currPlayer = players[index];
	console.log('Game Started');

	console.log(currPlayer.name);
	document.querySelector('#game-status span').innerHTML = `
		${currPlayer.name}'s turn!
	`;
}

// function goToJail() {
// 	currPlayer.position
// }

function checkJail() {
	//if player.jail[0] = true
	if (currPlayer.jail[0] === false) {
		console.log('current Player not in jail and moved');

		return false;
	}
	console.log(`${currPlayer.name} is in jail`);
	return true;
}

function payJail() {
	//check if they have money
	if (currPlayer.bitcoin <= 0.5) {
		console.log("you don't have enough money");
		return false;
	}
	//subtract money from player
	currPlayer.bitcoin -= 0.5;
	//set jail false set the jail counter = 0
	currPlayer.jail[0] = false;
	currPlayer.jail[1] = 0;
	closeJailModal();

	//close jail modal
	//TODO: query select to close modal
}

function rollJail() {
	currPlayer.jail[1];
	//variable dice1 = dice()
	let dice1 = currPlayer.dice();
	//variable dice 2 = dice()
	let dice2 = currPlayer.dice();

	//roll currplayer.dice() === currPlayer.dice()
	if (dice1 === dice2) {
		//if true currPlayer.rolled Number = dice1 + dice2
		currPlayer.jail = [false, 0];
		currPlayer.rolledNumber = dice1 + dice2;
		makeMoveHappen();
		currPlayer.movePlayer();
	}
	// if player is on third turn and double false subtract money
	if (dice1 !== dice2) {
		console.log(currPlayer.name, currPlayer.jail[1]);
		if (currPlayer.jail[1] === 3) {
			messageDisplay.innerText = 'You did not roll a double, you loose bitcoins';
			currPlayer.jail = [false, 0];
			currPlayer.bitcoin -= 0.5;
			currPlayer.rolledNumber = dice1 + dice2;
			makeMoveHappen();
			currPlayer.movePlayer();
		} else {
			currPlayer.jail[1]++;
			messageDisplay.innerText = 'You did not roll a double, good luck next turn';
		}
	}

	afterJailOption();
	closeJailModal();
	//set currPlayer.jail = false counter to 0
	// TODO: close Jail modal
}

function freeJail() {
	//check if they have pass
	if (currPlayer.getOutJail[0] === false) {
		console.log("You can't do that");
	}
	//if true pass - 1 if = 0 then pass = false
	// change player jail status to false and 0
	currPlayer.getOutJail[0] = false;
	currPlayer.getOutJail[1] -= 1;
	currPlayer.jail = [false, 0];
	closeJailModal();
	// TODO: close modal
}

function rollDice() {
	// if the player in jail and have they rolled before?
	if (!checkJail() && !currPlayer.diceRolled) {
		currPlayer.rollDice();
		// makeMoveHappen();
		// currPlayer.movePlayer();
		console.log(currPlayer.position);
		// console.log(currPlayer);
	}
}

function move() {
	currPlayer.movePlayer();
}

function updateBitcoin() {
	const p1 = document.querySelector('#p1-money');
	const p2 = document.querySelector('#p2-money');
	const p3 = document.querySelector('#p3-money');
	const p4 = document.querySelector('#p4-money');
	p1.innerText = players[0].bitcoin.toFixed(2);
	p2.innerText = players[1].bitcoin.toFixed(2);
	p3.innerText = players[2].bitcoin.toFixed(2);
	p4.innerText = players[3].bitcoin.toFixed(2);
}

function managePropList() {
	const listParent = document.querySelector('.manage-list');
	let counter = 0;
	while (listParent.lastElementChild) {
		listParent.removeChild(listParent.lastElementChild);
	}
	for (let property of currPlayer.properties) {
		//Text nodes for 1st nested div
		const nodeText = document.createTextNode(`${property.name}`);
		const nodeText2 = document.createTextNode(`₿ ${property.cost}`);
		// sub div for 1st div
		let node25 = document.createElement('div');
		node25.classList.add('m-name');
		let node255 = document.createElement('div');
		node255.classList.add('m-amt');
		let node2 = document.createElement('div');
		node2.classList.add('flex-row', 'baseline');
		// put text in 1st sub div
		node25.appendChild(nodeText);
		node255.appendChild(nodeText2);
		// append sub div to 1st div
		node2.appendChild(node25);
		node2.appendChild(node255);

		// text node for 2nd sub divs
		const node35Text = document.createTextNode('Buy Server');
		const node355Text = document.createTextNode('Trade');
		const node3555Text = document.createTextNode('Mortgage');
		// sub divs for 2nd nest div
		const node35 = document.createElement('div');
		node35.setAttribute('id', `${property.name}-server`);
		node35.classList.add('m-server');
		const node355 = document.createElement('div');
		node355.setAttribute('id', `${property.name}-trade`);
		node355.classList.add('m-trade');
		const node3555 = document.createElement('div');
		node3555.setAttribute('id', `${property.name}-mortgage`);
		node3555.classList.add('m-mortgage');
		// add text nodes to sub divs
		node35.appendChild(node35Text);
		node355.appendChild(node355Text);
		node3555.appendChild(node3555Text);
		// second div
		const node3 = document.createElement('div');
		node3.classList.add('m-btn-row', 'flex-row');
		// append sub div to 2nd div
		node3.appendChild(node35);
		node3.appendChild(node355);
		node3.appendChild(node3555);
		// top div
		let node = document.createElement('div');
		node.setAttribute('id', `m-${property.name}`);
		// alternate lightgreen class
		if (counter % 2 === 0) {
			node.classList.add('flex-row', 'prop-list', 'lightgreen');
			counter++;
		} else {
			node.classList.add('flex-row', 'prop-list');
			counter++;
		}
		// append 1st and second nested div into top div
		node.appendChild(node2);
		node.appendChild(node3);
		listParent.appendChild(node);
		if (property.type === 'isp' || property.type === 'utility') {
			document.querySelector(
				`#${property.name}-server` === '5G' ? '5g' : `#${property.name}-server`
			).style.display = 'none';
		}
	}
	document.querySelectorAll('.m-server').forEach((e) => {
		e.onclick = () => {
			handleServerBuy(e);
		};
	});
}

function endTurn() {
	currPlayer.diceRolled = false;
	currPlayer.doubleCount = 0;
	index < nameList[0] ? index++ : (index = 0);

	currPlayer = players[index];
	console.log('turn ended');
	//console.log(`next player is ${currPlayer.name}`);
	document.querySelector('#game-status span').innerHTML = `
		${currPlayer.name}'s turn!
	`;
	if (checkJail()) {
		if (currPlayer.getOutJail[0] === false) {
			console.log(document.querySelector('#get-out-jail'));
			document.querySelector('#get-out-jail').classList.remove('yellow');
			document.querySelector('#get-out-jail').classList.add('no-click');
		} else {
			document.querySelector('#get-out-jail').classList.remove('no-click');
			document.querySelector('#get-out-jail').classList.add('yellow');
		}
		manageModal.style.display = 'flex';
		manageContent.style.display = 'none';
		jailModal.style.display = 'flex';
	}
}

export {
	startGame,
	checkJail,
	rollDice,
	move,
	payJail,
	rollJail,
	freeJail,
	endTurn,
	players,
	currPlayer,
	updateBitcoin,
	managePropList,
};
