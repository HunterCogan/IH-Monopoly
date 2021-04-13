import defaultExport from './game.js';
import { cards } from './objects/tiles.js';
import { chanceCards } from './objects/chance.js';
import { Character } from './objects/players.js';

// game('dummyData');

const dicky = new Character('dicky');
console.log(dicky);
chanceCards[0].action(dicky);
console.log(dicky);
