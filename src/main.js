import { startGame, rollDice, endTurn, managePropList } from './game.js';
// import { movePiece } from './dom.js';

//TODO: on PLAY button click make players
// play button
const playBtn = document.querySelector('#modalClose');
playBtn.addEventListener('click', startGame);
// roll dice
const diceBtn = document.querySelector('#roll-dice');
diceBtn.addEventListener('click', rollDice);
const manageBtn = document.querySelector('#manage-property');
manageBtn.addEventListener('click', managePropList);

// pay to get out of jail
// const payJailBtn = document.querySelector('#pay-jail');
// payJailBtn.addEventListener('click', payJail);
// // roll to get out of jail
// const rollJailBtn = document.querySelector('#roll-jail');
// rollJailBtn.addEventListener('click', rollJail);
// // use get out of jail card
// const freeJailBtn = document.querySelector('#free-jail');
// freeJailBtn.addEventListener('click', freeJail);
//end turn button
const endBtn = document.querySelector('#end-turn');
endBtn.addEventListener('click', endTurn);
