/* The main game class handles the data and logic */
function SpaceRace(options){
	options = options || {};
	this.columnCount = options.columnCount || 100;
	this.rowCount = options.rowCount || 60;
		
	this.planet = new Planet(this.columnCount, this.rowCount);
}

// visualize the data for debugging
SpaceRace.prototype.showBoard = function(board){
	board.init(this.planet);
};
	

SpaceRace.prototype.nextDay = function (){
	// TODO function to check for end of game.
};



