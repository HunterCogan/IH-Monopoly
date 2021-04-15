//Characeter is a CLASS
import { Character } from './objects/players.js';
import { properties } from './objects/tiles.js';

import { handleManage, handleServerBuy, startOutput as nameList } from './dom.js';

// pass this to almost all functions, destructure what you need

let players = [];
let index = 0;
let currPlayer = players[index];

// takes an ARRAY to make the players
function createPlayers(playerNames) {
	for (let name of playerNames) {
		players.push(new Character(name));
	}
}

function startGame() {
	if (nameList.length === 1) return false;
	createPlayers(nameList.slice(1));
	currPlayer = players[index];
	console.log('Game Started');
	console.log(players);
	properties[1].buy();
	properties[3].buy();
	properties[6].buy();
	properties[8].buy();
	properties[9].buy();
	properties[11].buy();
}

function checkJail() {
	//if player.jail[0] = true
	if (currPlayer.jail[0] === false) {
		console.log('current Player not in jail and moved');

		return false;
	}
	console.log(`${currPlayer.name} is in jail`);
	// if already on third turn subtract money .5
	//close modal
	//TODO: open jail model
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
	//close jail modal
	//TODO: query select to close modal
}

function rollJail() {
	//variable dice1 = dice()
	let dice1 = currPlayer.dice();
	//variable dice 2 = dice()
	let dice2 = currPlayer.dice();
	//roll currplayer.dice() === currPlayer.dice()
	if (dice1 === dice2) {
		//if true currPlayer.rolled Number = dice1 + dice2
		currPlayer.rolledNumber = dice1 + dice2;
	}
	// if player is on third turn and double false subtract money
	if (dice1 !== dice2 && currPlayer.jail[1] === 3) {
		currPlayer.bitcoin -= 0.5;
		currPlayer.rolledNumber = dice1 + dice2;
	}
	//set currPlayer.jail = false counter to 0
	currPlayer.jail = [false, 0];
	// TODO: close Jail modal
	currPlayer.movePlayer();
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
	// TODO: close modal
}

function rollDice() {
	// if the player in jail and have they rolled before?
	if (!checkJail() && !currPlayer.diceRolled) {
		currPlayer.rollDice();
		currPlayer.movePlayer();
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
	p1.innerText = players[0].bitcoin;
	p2.innerText = players[1].bitcoin;
	p3.innerText = players[2].bitcoin;
	p4.innerText = players[3].bitcoin;
}
function managePropList() {
	const listParent = document.querySelector('.manage-list');
	let counter = 0;
	while (listParent.lastElementChild) {
		listParent.removeChild(listParent.lastElementChild);
	}
	for (let property of currPlayer.properties) {
		console.log('property list activated');
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

		document.querySelectorAll('.m-server').forEach((e) => {
			e.onclick = () => {
				handleServerBuy(e);
			};
		});
	}
}
function endTurn() {
	currPlayer.diceRolled = false;
	currPlayer.doubleCount = 0;
	index < nameList[0] ? index++ : (index = 0);

	currPlayer = players[index];
	console.log('turn ended');
	console.log(`next player is ${currPlayer.name}`);
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

// dice roll start
//Generates a random number from 1-6
const firstRandom = Math.floor(Math.random() * 6) + 1;

// const firstDiceImg = './../assets/dice' + firstRandom + '.png';
// console.log(firstDiceImg)

// document.querySelector('#dice1').setAttribute('src', firstDiceImg)
// dice roll end
