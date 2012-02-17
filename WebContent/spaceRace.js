/* The main game class handles the data and logic */
function SpaceRace(columnCount, rowCount){
	var self=this; // be sure to use the instance self instead of "this" in any callbacks.
	self.ColumnCount = columnCount || 100;
	self.RowCount = rowCount || 60;
	self.board = new Board();
	
	SpaceRace.prototype.CreateCells = function(){
		self.Cells = [self.ColumnCount];
		var x,y, l;
		for (x = 0; x<self.ColumnCount; x++){
			self.Cells[x] = [self.RowCount];
			for (y = 0; y<self.RowCount; y++){
				self.Cells[x][y] = new Cell(x,y);
			}
		}
		
		for (l = 1; l <=25; l++){
			this.RandomCell().land = true;
		}
		
		return self.Cells;
	};
		
	SpaceRace.prototype.RandomCell = function(){
		var x,y;
		x = Math.floor(Math.random()* (self.ColumnCount));
		y= Math.floor(Math.random()* (self.RowCount));
		return self.Cells[x][y];
	};

	
	self.CreateCells();
	self.board.Update(self.Cells);

}

/* an individual square on the map */
function Cell(x,y){
	this.X = x;
	this.Y = y;
	this.Land = false;
	this.Robot = null;
}
