import { startGame, rollDice, endTurn, payJail, freeJail, rollJail } from './game.js';
//import {movePiece} from "./dom.js";

//TODO: on PLAY button click make players
//query for Play Buttons
const playBtn = document.querySelector('#modalClose');
playBtn.addEventListener('click', startGame);
const diceBtn = document.querySelector('#roll-dice');
diceBtn.addEventListener('click', rollDice);
const payJailBtn = document.querySelector('#pay-jail');
payJailBtn.addEventListener('click', payJail);
const rollJailBtn = document.querySelector('#roll-jail');
rollJailBtn.addEventListener('click', rollJail);
const freeJailBtn = document.querySelector('#free-jail');
freeJailBtn.addEventListener('click', freeJail);
const endBtn = document.querySelector('#end-turn');
endBtn.addEventListener('click', endTurn);
