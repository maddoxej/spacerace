/**
 *	The Planet contains a map of all the land or water on the planet plus a list of all the robots on the planet.  
 */

function Planet(columnCount, rowCount){
		var cells, // sparse 2d array of cell objects addressable by [x][y]
		//	cellList, // list of cell objects
		//	self, // use in call backs
			x, // column iterator
			land= []; // 2d array of booleans. If not land then it must be water
			land.length = columnCount;
		
	//	self = this;
		
		/* an individual square on the map */
		function Cell(land){
			this.land = land;
			this.robot = null;
			
			this.clone = function(){
				var result = new Cell();
				result.land = this.land;
				result.robot = this.robot;
				return result; 
			};
		}		
		
		for (x = 0; x < land.length; x++){
			land[x]= [];
			land[x].length = rowCount;
		};
		
		// sparsely populated grid of cells
		cells = [];
		cells.length = columnCount;
		for (x = 0; x < cells.length; x++){
			cells[x]= [];
			cells[x].length = rowCount;
		};
		
		this.randomCell = function(callback){
			var x,y;
			x = Math.floor(Math.random()* (land.length));
			y = Math.floor(Math.random()* (land[0].length));
			return callback(x,y);
		};
		
		this.foreach = function(callback){
			var x, y;
			for (y=0; y < land[0].length; y++){
				for (x=0; x < land.length; x++){
					callback(x, y, land[x][y]);
				}
			}
		};

		// pass (x,y, false) to set water, just x,y to make it land
		// call this before creating any cells;
		this.setLand = function(x,y, isLand){
			// TODO validate that no cells have been created yet and throw exception. 
			if (typeof(isLand) == "undefined"){
				isLand = true;				
			}
			
			land[x][y] = isLand;
		};
		
		this.getLand = function(x,y){			
			return land[x][y] ? true : false;
		};

};


