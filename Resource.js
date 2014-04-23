	//require.define({
	//: function(require, exports, module) {
exports.Resource = function (){
	this.owner="Neutral";
	this.robots = [];
	this.production = "None";
	this.completionDay = 0;
	
	this.createRobot = function(){
		var r;
		r = new production;
		robots.push(r);
		completionDay += r.rebuildDays;
	};
};

exports.Resource.prototype.type = "Resource";

