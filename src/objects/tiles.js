class Property {
	constructor(name, cost, rentPrices, type) {
		this.name = name;
		// Cost to buy property
		this.cost = cost;
		// Prices for rent in array [base rent, 1server, 2server, ..., supercomputer]
		this.rentPrices = rentPrices;
		// Type of property, color or utility
		this.type = type;
		//Owner of property
		this.owner = null;
		//how many servers are on property, 1 - 5, 1-4 for server, 5 for supercomputer
		this.server = null;
	}
}

// Export Property Class
export { Property };
