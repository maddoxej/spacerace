//require.define({
//	Board: function(require, exports, module){

/* the Board object manages the DOM and HTML and UI */
exports.Board = function(boardId){
	"use strict";
	var self=this; // be sure to use the instance self instead of "this" in any callbacks.
	this.boardId = boardId || 'spaceRaceBoard' ;
	this.div = jQuery("#" + this.boardId);
	
	// It is fastest to use an id rather than a class. 
	this.makeSelector = function(x, y){		
		return "#" + this.boardId + "x" + x + "y" + y;
	};	

	this.init = function(planet){
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
				
		planet.subscribe('onChange', this.update);
	};
	
	this.update= function(event){
		self.drawCell(event.x, event.y, event.cell, event.planet);
	};
	
	this.drawCell = function(x, y, cell, planet){
		var c = "E"; // default value is Error
		if (cell){
			switch (cell.type){
			case 'Resource':
				c = "*";
				break;		
			}
		} else {
			c = planet.getLand(x, y) ? "." : "~";
		}
		
		// TODO define classes for friendly enemy and neutral. 
		self.div.find(self.makeSelector(x, y)).html(c).css("background-color","grey");
	};

};

//	}
//});