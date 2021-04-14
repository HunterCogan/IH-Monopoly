import { startGame, checkJail, rollDice, move, endTurn } from './game.js';
//import {movePiece} from "./dom.js";

//TODO: on PLAY button click make players
//query for Play Buttons
const playBtn = document.querySelector('#modalClose');
playBtn.addEventListener('click', startGame);
const diceBtn = document.querySelector('#roll-dice');
diceBtn.addEventListener('click', rollDice());
const endBtn = document.querySelector('#end-turn');
endBtn.addEventListener('click', endTurn);
