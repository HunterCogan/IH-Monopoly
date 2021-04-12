class Property {
	constructor(name, cost, rentPrices, mortagage, housePrice, color, position) {
		// number for position on the board
		this.poistion = position;

		this.name = name;
		// Cost to buy property
		this.cost = cost;
		// Prices for rent in array [base rent, 1server, 2server, ..., supercomputer]
		this.rentPrices = rentPrices;
		// Type of property, color or utility
		this.color = color;
		//Owner of property
		this.owner = null;
		//how many servers are on property, 1 - 5, 1-4 for server, 5 for supercomputer
		this.server = null;
		// mortage is an arr with price for
		// mortgage and a boolean to check if rent is collectable
		this.mortgage = mortagage;
		this.housePrice = housePrice;
	}
}

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

cards.imdb = new Property(
	'imdb.com',
	1,
	[0.06, 0.3, 0.9, 2.7, 4, 5.5],
	0.5,
	0.5,
	'lightBlue',
	8
);
cards.espn = new Property(
	'espn.com',
	1.2,
	[0.08, 0.4, 1, 3, 4.5, 6],
	0.6,
	0.5,
	'lightBlue',
	9
);
cards.weather = new Property(
	'weather.com',
	1.4,
	[0.1, 0.5, 1.5, 4.5, 6.25, 7.5],
	0.7,
	1,
	'pink',
	11
);
cards.craigslist = new Property(
	'craiglist',
	1.4,
	[0.1, 0.5, 1.5, 4.5, 6.25, 7.5],
	0.7,
	1,
	'pink',
	13
);

cards.walmart = new Property(
	'Walmart.com',
	1.6,
	[0.12, 0.6, 1.8, 5, 7, 9],
	0.8,
	1,
	'pink',
	14
);
cards.zoom = new Property(
	'Zoom.',
	1.8,
	[0.14, 0.7, 2, 5.5, 7.5, 9.5],
	0.9,
	1,
	'orange',
	16
);
cards.fandom = new Property(
	'fandom.com',
	1.8,
	[0.14, 0.7, 2, 5.5, 7.5, 9.5],
	0.9,
	1,
	'orange',
	18
);

cards.cnn = new Property('CNN.com', 2, [0.16, 0.8, 2.2, 6, 8, 10], 1, 1, 'Orange', 19);
cards.instagram = new Property(
	'Instagram.com',
	2.2,
	[0.18, 0.9, 2.5, 7, 8.75, 10.5],
	1.1,
	1.5,
	'red',
	21
);
cards.ebay = new Property(
	'Ebay.com',
	2.2,
	[0.18, 0.9, 2.5, 7, 8.75, 10.5],
	1.1,
	1.5,
	'red',
	23
); // Export Property Class
cards.twitter = new Property(
	'Twitter.com',
	2.4,
	[0.2, 1, 3, 7.5, 9.25, 11],
	1.2,
	1.5,
	'red',
	24
);
cards.reddit = new Property(
	'Reddit.com',
	2.6,
	[0.22, 1.1, 3.3, 8, 9.75, 11.5],
	1.3,
	1.5,
	'Yellow',
	26
);
cards.cornhub = new Property(
	'CornHub.com',
	2.6,
	[0.22, 1.1, 3.3, 8, 9.75, 11.5],
	1.3,
	1.5,
	'yellow',
	27
);

cards.yahoo = new Property(
	'Yahoo.com',
	2.8,
	[0.24, 1.2, 3.6, 8.5, 10.25, 12],
	1.4,
	1.5,
	'yellow',
	29
);

cards.wikipedia = new Property(
	'Wikipedia.com',
	3,
	[0.26, 1.3, 3.9, 9, 11, 12.75],
	1.5,
	2,
	'green',
	31
);

cards.amazon = new Property(
	'Amazon.com',
	3,
	[0.26, 1.3, 3.9, 9, 11, 12.75],
	1.5,
	2,
	'green',
	32
);

cards.youtube = new Property(
	'YouTube.com',
	3.2,
	[0.28, 1.5, 4.5, 10, 12, 14],
	1.6,
	2,
	'green',
	34
);

cards.facebook = new Property(
	'Facebook.com',
	3.5,
	[0.35, 1.75, 5, 11, 13, 15],
	1.75,
	2,
	'darkBlue',
	37
);

cards.google = new Property(
	'Google.com',
	4,
	[0.5, 2, 6, 14, 17, 20],
	2,
	2,
	'darkBlue',
	39
);
export { cards };
