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

// Export Property Class
export { Property };
