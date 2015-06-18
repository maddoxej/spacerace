var $ = require('jquery');
require('jquery-ui')
$('#buildDialog').dialog({
    position: {
        at: "bottom left"
    },
    buttons: {
        Ok: function() {
            $(this).dialog("close"); //closing on Ok click
        }
    }
});
var SpaceRace = require('./SpaceRace').SpaceRace;
var Board = require('./Board').Board;
var spaceRace = new SpaceRace();
spaceRace.createLand();
spaceRace.showBoard(new Board());
var start = spaceRace.createResources();
