module.exports.config = function(kittehStore, baseUrl){

	var getRankings, addPhoto, calcScore;

	addPhoto = function (kitteh) {
		var k = kitteh;
		k.photo = baseUrl + 'images/' + kitteh.id + '.jpg';
		return k;
	}

	/**
	 * score is an integer percentage, 0-100
	 */
	calcScore = function (kitteh) {
		var k = kitteh;

		k.score = k.totalAppearances === 0 ? 0 : k.totalVotes / k.totalAppearances;
		k.score = Math.round(k.score * 100);
		return k;
	};

	getRankings = function () {

		var kittehs = kittehStore.get.kittehs.all();

		kittehs = kittehs.
			map(addPhoto).
			map(calcScore).
			sort(function (a, b) {
				if (a.score === b.score) {
					if (a.totalAppearances === b.totalAppearances) {
						return 0;
					}

					return a.totalAppearances > b.totalAppearances ? -1 : 1;
				}

				return a.score > b.score ? -1 : 1;
			});

		console.dir(kittehs);
		return {
			kittehs: kittehs
		};
	};

	return {
		getRankings: getRankings
	};

}