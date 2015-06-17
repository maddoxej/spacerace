/* 
M) A miner robot can become a factory if it finds a pile of resources.
A miner robot that has 1 on board computer. If a miner robot encounters an enemy
robot it can try to hack into the enemy's computer to destroy the enemy robot. 
The enemy can also try to hack the miner robot's computer. Whoever hacks the 
opponent's computer first wins.

Miner robots can move one square per day on land, but not on water.
5 days to build.
*/

	//require.define({
	//: function(require, exports, module) {
exports.Miner = function (){
    this.rebuildDays = 5;
    
}