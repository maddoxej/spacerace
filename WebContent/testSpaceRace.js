	qModule("spaceRace");

	var SpaceRace = require('SpaceRace').SpaceRace;
	test("test constructor", function() {
			var spaceRace = new SpaceRace();
  		    equal(spaceRace.columnCount, 100, "expected default columns" );
	});

	test("world creation", function(){
		var spaceRace = new SpaceRace();
		var landcount=0, cellcount = 0;
		spaceRace.createLand();
		
		spaceRace.planet.foreach(function(x, y, land){
			cellcount++;
			if (land){
				landcount++;
			}
		});
		
		ok(landcount > 0, "there should be some land");
		ok(landcount < cellcount, "there should be some water");
		
		spaceRace.createResources(3);
		equal(spaceRace.planet.getCells().length, 3, "should have 3 resources");
	});
	