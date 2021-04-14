import { startGame } from './game.js';
import { dom } from './dom.js';
dom();

//TODO: on PLAY button click make players
//query for Play Buttons
const playBtn = document.querySelector('#modalClose');
playBtn.addEventListener('click', startGame);
