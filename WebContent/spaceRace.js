//require.define({
//	SpaceRace: function(require, exports, module) {
	
	var Planet = require('Planet').Planet,
		HumanPlayer = require('HumanPlayer').HumanPlayer,
		SimpleAI = require('SimpleAI').SimpleAI,
		time= require('gamejs/time'),
		Resource = require('Resource').Resource;
	

/* The main game class handles the data and logic */

exports.SpaceRace = function(options){
	options = options || {};
	this.columnCount = options.columnCount || 100;
	this.rowCount = options.rowCount || 60;
	// TODO dynamically load the AI
	this.players = options.players || [new HumanPlayer(), new SimpleAI()];
		
	this.planet = new Planet(this.columnCount, this.rowCount);
	this.day = 0;
	var self=this;
	
	// Grow 1 island
    // Start at random position.
	// Outer loop up to 10 times.
    // inner loop up to 10 times. Find adjacent piece, change from water to land. then continue from new land piece.
    // Go back to starting position (center of island)
	// islandMaxSize is a number for the maximum distance from the center.   
	this.createIsland = function(islandMaxSize){
		this.planet.randomCell(function(islandX, islandY){
			var shoot = 0, shoots, l = 0, steps, stepX, stepY, nearPoints, p;
			shoots = Math.floor(Math.random() * 10) + 1;	
			
			for (shoot = 0; shoot < shoots; shoot++){
				stepX = islandX;
				stepY = islandY;
				steps= Math.floor(Math.random() * islandMaxSize) + 1;	
				for (l = 0; l < steps; l++){
					nearPoints = self.planet.adjacent(stepX, stepY);
					p = Math.floor(Math.random() * nearPoints.length);	
					stepX = nearPoints[p][0];
					stepY = nearPoints[p][1];
					self.planet.setLand(stepX, stepY);						
				}
			}
		});
	};
	
	// create some islands
	// islandMaxSize influences how big the islands get. 10 is a good value. The default is calculated based on the size of the planet.  
	this.createLand = function(numberOfIslands, islandMaxSize){
		numberOfIslands = numberOfIslands || 20;
		islandMaxSize = islandMaxSize || (self.columnCount * self.rowCount) / 300;
		for (var i=0; i < numberOfIslands; i++){
			this.createIsland(islandMaxSize);
		}		
	};
	
	// Randomly sprinkle resources on the land. 
	this.createResources = function(numberOfResources){
		numberOfResources = numberOfResources || options.numberOfResources || 20 + Math.floor(Math.random() * 10);
		var i, r, foundLand = false;
		for (i = 0; i < numberOfResources; i++){
			foundLand = false;
			while (!foundLand) {
				this.planet.randomCell(function(x,y){
					if (self.planet.getLand(x,y)){
						r = new Resource();
						self.planet.setCell(x, y, r);
						foundLand = true;
					}
				});
			}
		}
	};
	
	
	this.run = function(){
		
		function gameLoop(){
			var p;
			while (!this.isEndOfGame()){
				this.day++;
				this.createRobots();
				for (p=0; p< self.players.length; p++){
					self.players[p].moveRobots();
				}			
			}
		};
		
		time.fpsCallback(gameLoop, this, 20);
		
		//TODO show winner. 
	}; 
	
	this.isEndOfGame = function(){
		return self.players.length > 1;
	};
	
	this.createRobots = function(){
		var i, resources;
		resources = planet.getCells().forEach(function(element, index, array){
			if (element.type == 'Resource' && element.completionDay == this.day) {
				element.createRobot();
			}
		});		
	};
};

// visualize the data for debugging
exports.SpaceRace.prototype.showBoard = function(board){
	board.init(this.planet);
};
	

exports.SpaceRace.prototype.nextDay = function (){
	// TODO function to check for end of game.
};



//	}
//}, ['Planet', 'HumanPlayer', 'SimpleAI', 'gamejs/time']);
