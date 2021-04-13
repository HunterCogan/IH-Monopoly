import { diceRoll } from './game.js';
import { properties } from './objects/tiles.js';
import { chance, landOnChance } from './objects/chance.js';
import { Character } from './objects/players.js';
import { community, landOnCommunity } from './objects/chest.js';

// game('dummyData');

const dicky = new Character('Dicky');
const johnny = new Character('Johnny');
const juan = new Character('Juan');
const hunter = new Character('Hunter');
const players = { dicky, johnny, juan, hunter };
const currPlayer = johnny;

const allGameObjects = { currPlayer, players, properties, chance, community };
