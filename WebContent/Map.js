/**
 * 
 */

function Map(columnCount, rowCount){
		var cells, // sparse 2d array of cell objects addressable by [x][y]
			cellList, // list of cell objects
			self, // use in call backs
			x, // column iterator
			landCell, // flyWeight for any cell that contains only land
			waterCell, // flyWeight for any cell that does not contain land
			land= [columnCount]; // 2d array of booleans. If not land then it must be water
		
		self = this;
		
		/* an individual square on the map */
		function Cell(land){
			this.land = land;
			this.robot = null;
			
			Cell.prototype.clone = function(){
				var result = new Cell();
				result.land = this.land;
				result.robot = this.robot;
				return result; 
			};
		}		
		
		for (x = 0; x < land.length; x++){
			land[x]= [rowCount];			
		};
		
		landCell = new Cell(true);
		
		waterCell = new Cell(false);

		// sparsely populated grid of cells
		cells = [columnCount];	
		for (x = 0; x < cells.length; x++){
			cells[x]= [rowCount];			
		};
		
		Map.prototype.getCell = function(x,y){
			if (cells[x][y]) {
				return cells[x][y];
			} else {
				return land[x][y] ? landCell: waterCell;
			};			
		};

		Map.prototype.randomCell = function(){
			var x,y;
			x = Math.floor(Math.random()* (land.length));
			y = Math.floor(Math.random()* (land[0].length));
			return getCell(x,y);
		};

		// pass (x,y, false) to set water, just x,y to make it land
		// call this before creating any cells;
		Map.prototype.setLand = function(x,y, isLand){
			// TODO validate that no cells have been created yet and throw exception. 
			if (typeof(isLand) == "undefined"){
				isLand = true;				
			}
			
			land[x][y] = isLand;
		};

};


