class Character {
	constructor(name) {
		this.name = name;
		// starting amount each player gets
		this.bitcoin = 15;
		// jail status, if true, how many turns have they been in jail
		this.jail = [false, 0];
	}
	// Check if player in jail, if so, prompt for options or check turns missed
	checkJail() {
		// is player in jail?
		this.jail[0] === true;
		// if yes, prompt for options
	}

	// on dice roll call this function to move. accepts dice number as steps value
	moveDraw(steps) {}
}

export { Character };
