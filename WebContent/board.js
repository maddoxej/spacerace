/* the Board object manages the DOM and HTML and UI */
function Board(boardId){
	
	var self=this; // be sure to use the instance self instead of "this" in any callbacks.
	self.boardId = boardId || 'spaceRaceBoard' ;
	this.div = jQuery("#" + self.boardId);
	
	// It is fastest to use an id rather than a class. 
	self.makeSelector = function(x, y){		
		return "#" + self.boardId + "x" + x + "y" + y;
	};	
}

Board.prototype.init = function(planet){
	var row, self, rowHtml, boardHtml = "<div class='scrollbox'><div class='grid'>";
	self = this;
	row = 0;
	rowHtml = "<div class='row'>";
	planet.foreach(function(x, y, land){
		if (row != y){
			boardHtml+= rowHtml +="</div>"; 
			// using an intermediate string (rowHtml) to build each row improves performance on older browsers.
			rowHtml = "<div class='row'>";
			row = y;
		};
				
		rowHtml += "<div class='" +(land ? "": "water ") + "cell' id='" + self.makeSelector(x, y).slice(1) + "'>"+ (land ? "." : "~") + "</div>";
	});
	
	boardHtml+= rowHtml +="</div>";
	
	// close the grid and the scrollbox
	boardHtml+="</div></div>";
	this.div.html(boardHtml);
};

