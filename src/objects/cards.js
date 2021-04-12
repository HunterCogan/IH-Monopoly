import { Property } from './tiles.js';
// All the cards will be in here
let cards = {};

cards.microsoft = new Property(
	'Microsoft',
	'0.6',
	[0.2, 0.1, 0.3, 0.9, 1.6, 2.5],
	0.3,
	0.5,
	'brown',
	1
);

cards.linkedIn = new Property(
	'linkedin',
	0.6,
	[0.04, 0.2, 0.6, 1.8, 3.2, 4.5],
	0.3,
	0.5,
	'brown',
	3
);

cards.foxNews = new Property(
	'foxnews.com',
	1,
	[0.06, 0.3, 0.9, 2.7, 4, 5.5],
	0.5,
	0.5,
	'lightBlue',
	6
);

cards.imdb = new Property('imdb.com', 1, [0.06, 0.3, 0.9, 2.7, 4, 5.5], 0.5, 0.5, 'lightBlue', 8);
cards.espn = new Property('espn.com', 1.2, [0.08, 0.4, 1, 3, 4.5, 6], 0.6, 0.5, 'lightBlue', 9);
cards.weather = new Property(
	'weather.com',
	1.4,
	[0.1, 0.5, 1.5, 4.5, 6.25, 7.5],
	0.7,
	1,
	'pink',
	11
);
console.log(cards);
export { cards };
