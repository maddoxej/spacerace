//require.define({
//	HumanPlayer: function(require, exports, module) {
		exports.HumanPlayer = function(){
			this.moveRobots = function(){
				$("#buildDialog").show();
                console.log("moveRobots");
			};
            
            this.active = true;
		};

        
//	}
//});