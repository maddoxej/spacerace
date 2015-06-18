//require.define({
	//Planet: function(require, exports, module) {
/**
 *	The Planet contains a map of all the land or water on the planet plus a list of all the robots on the planet.  
 */

exports.Planet = function(columnCount, rowCount){
		"use strict";
		var cells, // sparse 2d array of cell objects addressable by [x][y]
			cellList = [], // list of cell objects
			events = {onChange:[]},
			self, // use in call backs
			x, // column iterator
			land= []; // 2d array of booleans. If not land then it must be water
			land.length = columnCount;   
		
		self = this;
		
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
		
		for (x =0; x < columnCount; x++){
			land[x]= [];
			land[x].length = rowCount;
		};
// sparsely populated grid of cells
//		for (var property in object) {
//		    if (String(property >>> 0) == property &&
//		            property >>> 0 != 0xffffffff) {
//		        ... do something ...
//		    }
//		}
		cells = [];
		cells.length = columnCount;
		for (x =0; x < columnCount; x++){
			cells[x]= [];
			cells[x].length = rowCount;
		};
		
		this.randomCell = function(callback){
			var x,y;
			x = Math.floor(Math.random()* (land.length));
			y = Math.floor(Math.random()* (land[0].length));
			return callback(x,y);
		};
		
		// calculate all the points on the map that are adjacent to centerX,centerY. 
		// call the callback for each point. 
		// return an array of points. Each point is an array point[0]=x point[2]=y
		// There may be 3,5, or 8 points in the resulting array for a corner, edge or center cell
		this.adjacent = function(centerX, centerY, callback){
			// this code inspired by the pathfinding test code in gamejs
			function insideMap(point) {
	          return point[0] >= 0 && point[0] < land.length &&
	             point[1] >= 0 && point[1] < land[0].length;
			}

	      var directions = [[-1, 0], [1, 0], [0, -1],
	                       [0, 1], [-1, -1], [-1, 1],
	                       [1, 1], [1, -1]];

	      var allPoints = directions.map(function(dir) {
	         return [centerX + dir[0], centerY + dir[1]];
	      });
	      var inside = allPoints.filter(insideMap);
	      var p = 0;
	      
	      if (typeof callback === 'function'){
		      for (p in inside){
		    	  callback(inside[p][0], inside[p][1]);
		      }	      
	      }
	      
	      return inside;
	   };
		
		this.foreach = function(callback){
			var x, y;
			for (y=0; y < land[0].length; y++){
				for (x =0; x < land.length; x++){
					callback(x, y, this.getLand(x,y));
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
		
		this.setCell = function(x,y, cell){
			var cellIndex;
			if (cells[x][y] != undefined){
				cellIndex = cellList.indexOf(cells[x][y]);
				if (cellIndex > -1) {					
					cellList.splice(cellIndex);
				}
			}						
				
			cellList.push(cell);
			cells[x][y] = cell;
			this.notify('onChange', {x:x, y:y, cell: cell, planet: self});
		};
		
		
		this.getCell = function(x,y){
			return cells[x][y];
		};
		
		this.getCells = function(){
			return cellList;
		};
		
		this.subscribe= function(eventType, callback){
			events[eventType].push(callback);
		};
		
		this.unsubscribe= function(eventType, callback){
			var i = events[eventType].indexOf(callback);
			if (i > -1) {
				events[eventType].splice(i);
			}
		};
		
		this.notify= function(eventType, event){
			for (var i in events[eventType]){
				events[eventType][i](event);
			}
		};
};

//	}
//});