import { currPlayer, updateBitcoin } from './../game.js';

let totalHouse = 32;
let totalHotel = 12;

class Property {
	constructor(name, cost, rentPrices, mortgage, housePrice, type) {
		// number for position on the board

		this.name = name;
		// Cost to buy property
		this.cost = cost;
		// Prices for rent in array [base rent, 1server, 2server, ..., supercomputer]
		this.rentPrices = rentPrices;
		// Type of property, type or utility
		this.type = type;
		//Owner of property
		this.owner = null;
		//how many servers are on property, 1 - 5, 1-4 for server, 5 for supercomputer
		this.server = 0;
		// mortage is an arr with price for
		// mortgage and a boolean to check if rent is collectable
		this.mortgage = mortgage;
		this.housePrice = housePrice;
		this.isMortgaged = false;
	}

	mortgageToggle() {
		if (!this.isMortgaged) {
			currPlayer.bitcoin += this.mortgage;
			this.isMortgaged = true;
			updateBitcoin();
		}
		if (this.isMortgaged) {
			currPlayer.bitcoin -= this.mortgage * 1.1;
			this.isMortgaged = false;
			updateBitcoin();
		}
	}

	// how many of one type does owner have and do they have all of of one type
	counter(props) {
		let typeCounter = 0;
		let typeMax = false;
		let serverCount = [];

		// loop for how many of the same card type this owner has
		for (let property in props) {
			if (props[property].type == this.type && props[property].owner == this.owner) {
				serverCount.push(props[property].server);

				typeCounter++;
			}
		}
		// if owner has all of the same group update typeMax
		this.type === 'darkBlue' || (this.type === 'brown' && typeCounter == 2)
			? (typeMax = true)
			: typeCounter === 3
			? (typeMax = true)
			: (typeMax = false);

		return { typeCounter, typeMax, serverCount };
	}
	buy() {
		if (this.checkOwner()) {
			console.log('Someone already owns this property');
			return false;
		} else {
			if (currPlayer.bitcoin <= this.cost) {
				console.log("You don't have enough money to buy this property");
			} else {
				// update owner
				this.owner = currPlayer;
				//take money
				currPlayer.bitcoin -= this.cost;
				// add property to player's list of properties they own
				currPlayer.properties.push(this);
				updateBitcoin();
			}
		}
	}

	//  the cards object will tiles, current player will be player
	calculateRent() {
		if (!this.isMortgaged) {
			let rentDue = 0;
			// desstructure return values
			const { typeCounter, typeMax, serverCount } = this.counter(properties);
			//whats the max amount of server of this property type
			const noServer = Math.max(...serverCount);
			// update the amount of rent due by the typeMax
			this.type === 'isp'
				? (rentDue += this.rentPrices[typeCounter - 1])
				: this.type === 'utility'
				? (rentDue += (this.rentPrices[typeCounter - 1] * currPlayer.rolledNumber) / 10)
				: typeMax === true && noServer === 0
				? (rentDue += this.rentPrices[0] * 2)
				: (rentDue += this.rentPrices[this.server]);

			// subtract rent from player and give it to owner
			return rentDue;
		}
		return 0;
	}

	// true is owned false if not owned
	checkOwner() {
		if (this.owner && this.owner !== currPlayer.name) {
			return true;
		}
		return false;
	}
	// build servers
	build() {
		const { typeMax, serverCount } = this.counter(properties);

		// if utility or isp, cannot use this function;
		if (this.type === 'utility' || this.type == 'isp') return false;

		//if owner owns all of the same type he can build
		if (typeMax) {
			if (this.server === 5) {
				return false;
			}
			// check what he can build
			if (this.server === Math.min(...serverCount)) {
				console.log('both have same number of servers');
				if (
					(this.server < 4 && totalHouse > 0) ||
					(this.server === 4 && totalHotel > 0)
				) {
					console.log("there's enough servers");
					//if player has enough money
					if (this.housePrice > currPlayer.bitcoin) {
						console.log("You don't have enough money to buy a server");
						return false;
					} else if (this.server === 4 && this.housePrice * 5 > currPlayer.bitcoin) {
						console.log("You don't have enough money to buy a server");
						return false;
					} else if (this.server === 4 && this.housePrice * 5 < currPlayer.bitcoin) {
						this.server += 1;
						totalHotel--;
						// take money from player
						currPlayer.bitcoin -= this.housePrice * 5;
						updateBitcoin();
						return true;
					}
					//update server count

					this.server += 1;
					totalHouse--;
					// take money from player
					currPlayer.bitcoin -= this.housePrice;
					updateBitcoin();
					return true;
				}
			} else {
				console.log('Ran out of microtransistors to build servers or super compputers');
				return false;
			}
		}
	}
	sell() {
		// if serer amt is < 0 return false

		// if server= 5 server amt -- then currplayer.bitcoin  += this.housePrice /2
		if (this.server === 5) {
			this.server--;
			currPlayer.bitcoin += (this.housePrice * 5) / 2;
		}
		if (this.server === 0) {
			return false;
		}
		if (this.server < 4) {
			this.server--;
			currPlayer.bitcoin += this.housePrice / 2;
		}
	}
}

let properties = {};

properties[1] = new Property(
	'Microsoft',
	0.6,
	[0.2, 0.1, 0.3, 0.9, 1.6, 2.5],
	0.3,
	0.5,
	'brown'
);

properties[3] = new Property(
	'LinkedIn',
	0.6,
	[0.04, 0.2, 0.6, 1.8, 3.2, 4.5],
	0.3,
	0.5,
	'brown'
);

properties[6] = new Property(
	'FoxNews',
	1,
	[0.06, 0.3, 0.9, 2.7, 4, 5.5],
	0.5,
	0.5,
	'lightBlue'
);

properties[8] = new Property(
	'imdb',
	1,
	[0.06, 0.3, 0.9, 2.7, 4, 5.5],
	0.5,
	0.5,
	'lightBlue'
);
properties[9] = new Property(
	'ESPN',
	1.2,
	[0.08, 0.4, 1, 3, 4.5, 6],
	0.6,
	0.5,
	'lightBlue'
);
properties[11] = new Property(
	'Weather',
	1.4,
	[0.1, 0.5, 1.5, 4.5, 6.25, 7.5],
	0.7,
	1,
	'pink'
);
properties[13] = new Property(
	'Craigslist',
	1.4,
	[0.1, 0.5, 1.5, 4.5, 6.25, 7.5],
	0.7,
	1,
	'pink'
);

properties[14] = new Property('Walmart', 1.6, [0.12, 0.6, 1.8, 5, 7, 9], 0.8, 1, 'pink');
properties[16] = new Property(
	'Zoom',
	1.8,
	[0.14, 0.7, 2, 5.5, 7.5, 9.5],
	0.9,
	1,
	'orange'
);
properties[18] = new Property(
	'Fandom',
	1.8,
	[0.14, 0.7, 2, 5.5, 7.5, 9.5],
	0.9,
	1,
	'orange'
);

properties[19] = new Property('CNN', 2, [0.16, 0.8, 2.2, 6, 8, 10], 1, 1, 'Orange');
properties[21] = new Property(
	'Instagram',
	2.2,
	[0.18, 0.9, 2.5, 7, 8.75, 10.5],
	1.1,
	1.5,
	'red'
);
properties[23] = new Property(
	'eBay',
	2.2,
	[0.18, 0.9, 2.5, 7, 8.75, 10.5],
	1.1,
	1.5,
	'red'
); // Export Property Class
properties[24] = new Property(
	'Twitter',
	2.4,
	[0.2, 1, 3, 7.5, 9.25, 11],
	1.2,
	1.5,
	'red'
);
properties[26] = new Property(
	'Reddit',
	2.6,
	[0.22, 1.1, 3.3, 8, 9.75, 11.5],
	1.3,
	1.5,
	'Yellow'
);
properties[27] = new Property(
	'CornHub',
	2.6,
	[0.22, 1.1, 3.3, 8, 9.75, 11.5],
	1.3,
	1.5,
	'yellow'
);

properties[29] = new Property(
	'Yahoo',
	2.8,
	[0.24, 1.2, 3.6, 8.5, 10.25, 12],
	1.4,
	1.5,
	'yellow'
);

properties[31] = new Property(
	'Wikipedia',
	3,
	[0.26, 1.3, 3.9, 9, 11, 12.75],
	1.5,
	2,
	'green'
);

properties[32] = new Property(
	'Amazon',
	3,
	[0.26, 1.3, 3.9, 9, 11, 12.75],
	1.5,
	2,
	'green'
);

properties[34] = new Property(
	'YouTube',
	3.2,
	[0.28, 1.5, 4.5, 10, 12, 14],
	1.6,
	2,
	'green'
);

properties[37] = new Property(
	'Facebook',
	3.5,
	[0.35, 1.75, 5, 11, 13, 15],
	1.75,
	2,
	'darkBlue'
);

properties[39] = new Property('Google', 4, [0.5, 2, 6, 14, 17, 20], 2, 2, 'darkBlue');

properties[5] = new Property('Charter', 2, [0.25, 0.5, 1, 2], 1, null, 'isp');
properties[15] = new Property('TimeWarner', 2, [0.25, 0.5, 1, 2], 1, null, 'isp');
properties[25] = new Property('ATT', 2, [0.25, 0.5, 1, 2], 1, null, 'isp');
properties[35] = new Property('Comcast', 2, [0.25, 0.5, 1, 2], 1, null, 'isp');

properties[28] = new Property('GoogleFiber', 1.5, [4, 10], 0.75, null, 'utility');
properties[12] = new Property('5G', 1.5, [4, 10], 0.75, null, 'utility');

export { properties, totalHouse, totalHotel };
