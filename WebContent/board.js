/* the Board object manages the DOM and HTML and UI */
function Board(boardSelector){
	
	var self=this; // be sure to use the instance self instead of "this" in any callbacks.
	boardSelector = boardSelector || '#spaceRaceBoard' ;
	this.div = $(boardSelector);


	Board.prototype.Update = function(cells){
		var x,y;
		var boardhtml = "<div class='scrollbox'><div class='grid'>";
		for (y=0; y< cells[0].length; y=y+1){
			boardhtml+="<div class='row'>";
			for (x=0;x < cells.length; x=x+1){
				boardhtml += "<div class='" +(cells[x][y].land ? "": "water ") + "cell x"+x+"y"+y+"'>"+ this.CellChar(cells[x][y]) + "</div>";
			}
			boardhtml+="</div>";
		}
		
		boardhtml+="</div></div>";
		self.div.html(boardhtml);
	};
	
	Board.prototype.MakeSelector = function(x,y){
		return ".x"+x+"y"+y;
	};
	
	Board.prototype.CellChar = function(cell){
		//TODO get robot symbol
		return cell.land ? "." : "~"; 
	};
}
