import { startGame } from './game.js';
//import {movePiece} from "./dom.js";

//TODO: on PLAY button click make players
//query for Play Buttons
const playBtn = document.querySelector('#modalClose');
playBtn.addEventListener('click', startGame);
