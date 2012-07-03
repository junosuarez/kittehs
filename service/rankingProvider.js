var mock = require('./mockRankings').mock();
module.exports.getRankings = function () {
	console.dir(mock);
	return mock;
}
