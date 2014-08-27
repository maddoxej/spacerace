	QUnit.module("Planet");
	var Planet = require('../js/Planet').Planet;
	
	test("Constructor", function() {
		var p1, p2;
		p1 = new Planet(3,5);
		p2 = new Planet(4,7);
		notEqual(p1,p2, "should have different planets");
		
		ok(typeof(p1.land) === "undefined", "land should be private");
	});
	
	test("setLand", function(){
		var p1, p2;
		p1 = new Planet(3,5);
		p2 = new Planet(4,7);
		p1.setLand(2,3);
		ok(p1.getLand(2,3),"Planet should remember we set the land.");
		ok(!p2.getLand(2,3),"Second Planet should have different land.");
		
		p1.setLand(2, 3, false);
		ok(!p1.getLand(2,3), "should be water again");
	});
	
	test("iterate", function(){
		var p1 = new Planet(3,5);
		var calls = 0;		
		
		p1.foreach(function(x,y, land){
			calls++;
		});
		
		equal(calls,15,"should be 3*5 calls");
	});
	
	test("adjacent", function(){
		var p1 = new Planet(5,7);
		var calls = 0, sumX= 0, sumY = 0,
		center, edge, corner;
		
		center = p1.adjacent(3,3, function(x,y){
			sumX += x;
			sumY += y;
			calls++;
		});
		equal(calls, 8, "should be 8 adjacent cells to a center");
		equal(center.length, 8, "result should be 8 adjacent cells to a center");
		equal(sumX / calls, 3, " should average out to center");
		equal(sumY / calls, 3, " should average out to center");
		
		calls = 0;
		sumX = 0;
		edge = p1.adjacent(3,0, function (x,y){
			sumX += x;
			calls++;
			ok(y == 0 || y==1, " should be on the board");
		});
		
		equal(calls, 5, "should be 5 adjacent cells to an edge");
		equal(edge.length, 5, "result should be 5 adjacent cells to an edge");
		equal(sumX / calls, 3, " should average out to center");
		
		calls = 0;
		corner = p1.adjacent(0,0, function (x,y){
			calls++;
			ok(x == 0 || x == 1, " should be on the board");
			ok(y == 0 || y == 1, " should be on the board");
		});
		equal(calls, 3, "should be 3 adjacent cells to a corner");	
		equal(corner.length, 3, "result should be 3 adjacent cells to a corner");
	});
	
	test("getsetCell", function(){
		var p1 = new Planet(5,7);
		var cell = {a:'expected'}, otherCell={a:'wrong'};
		
		p1.setCell(3,2,cell);
		
		equal(p1.getCells().length,1,"should have one cell");
		
		ok(p1.getCell(3,2) === cell, "should be in the right spot");
		ok(p1.getCell(3,2) != otherCell, "equals should work");

		// Replace the existing cell with the other one. 
		p1.setCell(3,2,otherCell);
		equal(p1.getCells().length,1,"should have one cell");
		
		ok(p1.getCell(3,2) != cell, "should be in the right spot");
		ok(p1.getCell(3,2) === otherCell, "equals should work");
				
	});
